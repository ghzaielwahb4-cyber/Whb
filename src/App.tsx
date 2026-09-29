/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  CartItem,
  PizzaProduct,
  OrderRecord,
  OrderStatus,
  PizzaSize,
  CrustType,
} from './types/pizza';
import { PIZZA_CATALOG, COMBO_DEALS, PIZZA_SIZES, CRUST_OPTIONS } from './data/menu';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { DealsSection } from './components/DealsSection';
import { ArtisanStory } from './components/ArtisanStory';
import { Footer } from './components/Footer';
import { PizzaModal } from './components/PizzaModal';
import { CustomPizzaBuilder } from './components/CustomPizzaBuilder';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { Check, Flame, ShoppingBag } from 'lucide-react';

const CART_STORAGE_KEY = 'forno_cart_items_v1';
const ORDER_STORAGE_KEY = 'forno_active_order_v1';

export default function App() {
  // Cart state with persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Active Order state with persistence
  const [activeOrder, setActiveOrder] = useState<OrderRecord | null>(() => {
    try {
      const stored = localStorage.getItem(ORDER_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Modals & Drawers state
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [selectedProduct, setSelectedProduct] = useState<PizzaProduct | null>(null);
  const [isCustomBuilderOpen, setIsCustomBuilderOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<string>('');

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  // Sync active order to localStorage
  useEffect(() => {
    try {
      if (activeOrder) {
        localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(activeOrder));
      } else {
        localStorage.removeItem(ORDER_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to save order to localStorage', e);
    }
  }, [activeOrder]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Add item to cart
  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      // Check if exact same item configuration already exists
      const existingIdx = prev.findIndex(
        (i) =>
          i.product.id === newItem.product.id &&
          i.size === newItem.size &&
          i.crust === newItem.crust &&
          JSON.stringify(i.customToppings) === JSON.stringify(newItem.customToppings) &&
          i.specialInstructions === newItem.specialInstructions
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        const current = updated[existingIdx];
        const newQty = current.quantity + newItem.quantity;
        updated[existingIdx] = {
          ...current,
          quantity: newQty,
          totalPrice: Number((current.unitPrice * newQty).toFixed(2)),
        };
        return updated;
      }

      return [...prev, newItem];
    });

    showToast(`Added "${newItem.product.name}" to your order`);
  };

  // Quick 1-click add of a 12" classic pizza
  const handleQuickAdd = (product: PizzaProduct) => {
    const regularSize = PIZZA_SIZES[1];
    const unitPrice = Number((product.basePrice * regularSize.multiplier).toFixed(2));

    const cartItem: CartItem = {
      cartItemId: `quick-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      product,
      size: 'regular',
      crust: product.recommendedCrust || 'neapolitan',
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice,
    };

    handleAddToCart(cartItem);
  };

  // Add Combo deal to cart
  const handleAddComboToCart = (combo: (typeof COMBO_DEALS)[0]) => {
    const comboProduct: PizzaProduct = {
      id: combo.id,
      name: combo.name,
      italianName: combo.tagline,
      description: combo.description,
      basePrice: combo.dealPrice,
      image: '',
      category: 'specialty',
      ingredients: combo.includedItems,
      recommendedCrust: 'neapolitan',
    };

    const cartItem: CartItem = {
      cartItemId: `combo-${Date.now()}`,
      product: comboProduct,
      size: 'regular',
      crust: 'neapolitan',
      unitPrice: combo.dealPrice,
      quantity: 1,
      totalPrice: combo.dealPrice,
    };

    handleAddToCart(cartItem);
    setIsCartOpen(true);
  };

  // Cart actions
  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              totalPrice: Number((item.unitPrice * newQty).toFixed(2)),
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  // Promo handling
  const handleApplyPromo = (code: string) => {
    if (code === 'FORNO15' || code === 'FREESHIP' || code === 'BUONAPPETITO') {
      setAppliedPromo(code);
      showToast(`Promo ${code} applied successfully!`);
      return true;
    }
    return false;
  };

  const handleRemovePromo = () => {
    setAppliedPromo('');
    showToast('Promo code removed');
  };

  // Order Placement
  const handleOrderPlaced = (newOrder: OrderRecord) => {
    setActiveOrder(newOrder);
    setCartItems([]);
    setAppliedPromo('');
    setIsCartOpen(false);
    setIsTrackerOpen(true);
    showToast(`Order #${newOrder.orderId} received by stone oven!`);
  };

  // Update order status step
  const handleUpdateOrderStatus = (orderId: string, nextStatus: OrderStatus) => {
    setActiveOrder((prev) => {
      if (!prev || prev.orderId !== orderId) return prev;
      return {
        ...prev,
        status: nextStatus,
        statusUpdatedAt: Date.now(),
      };
    });
  };

  return (
    <div className="min-h-screen bg-[#121110] text-[#EDE8DF] flex flex-col font-sans selection:bg-[#E25822] selection:text-white">
      {/* 3-Zone Top Bar */}
      <Navbar
        cartItems={cartItems}
        orderType={orderType}
        onToggleOrderType={() =>
          setOrderType((t) => (t === 'delivery' ? 'pickup' : 'delivery'))
        }
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCustomBuilder={() => setIsCustomBuilderOpen(true)}
        onOpenOrderTracker={() => setIsTrackerOpen(true)}
        hasActiveOrder={!!activeOrder}
      />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* Hero Banner with campaign focal point */}
        <Hero
          onOpenCustomBuilder={() => setIsCustomBuilderOpen(true)}
          orderType={orderType}
          onSetOrderType={setOrderType}
        />

        {/* Menu Catalog & Dietary Filters */}
        <MenuSection
          onSelectProduct={(p) => setSelectedProduct(p)}
          onQuickAdd={handleQuickAdd}
          onOpenCustomBuilder={() => setIsCustomBuilderOpen(true)}
        />

        {/* Special Deals & Combos */}
        <DealsSection onAddComboToCart={handleAddComboToCart} />

        {/* Artisan Heritage & Proof Claims */}
        <ArtisanStory />
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Detail & Customizer Modal */}
      <PizzaModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Custom Pizza Crafter Modal */}
      <CustomPizzaBuilder
        isOpen={isCustomBuilderOpen}
        onClose={() => setIsCustomBuilderOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        orderType={orderType}
        onSetOrderType={setOrderType}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedPromo={appliedPromo}
        onApplyPromo={handleApplyPromo}
        onRemovePromo={handleRemovePromo}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        orderType={orderType}
        appliedPromo={appliedPromo}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Live Pizza Radar & Order Tracker */}
      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        order={activeOrder}
        onUpdateOrderStatus={handleUpdateOrderStatus}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1D1A16] border border-[#3A3329] text-[#EDE8DF] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
