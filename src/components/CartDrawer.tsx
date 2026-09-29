import React, { useState } from 'react';
import { CartItem } from '../types/pizza';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Bike, Store } from 'lucide-react';
import { PIZZA_SIZES, CRUST_OPTIONS } from '../data/menu';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  orderType: 'delivery' | 'pickup';
  onSetOrderType: (type: 'delivery' | 'pickup') => void;
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onCheckout: () => void;
  appliedPromo: string;
  onApplyPromo: (code: string) => boolean;
  onRemovePromo: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  orderType,
  onSetOrderType,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  appliedPromo,
  onApplyPromo,
  onRemovePromo,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const FREE_DELIVERY_THRESHOLD = 35.0;
  const isFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD || appliedPromo === 'FREESHIP' || orderType === 'pickup';
  const deliveryFee = orderType === 'pickup' ? 0 : isFreeDelivery ? 0 : 3.99;
  
  // Calculate discount
  let discount = 0;
  if (appliedPromo === 'FORNO15') {
    discount = Number((subtotal * 0.15).toFixed(2));
  } else if (appliedPromo === 'BUONAPPETITO') {
    discount = Math.min(5.0, subtotal);
  }

  const tax = Number(((subtotal - discount) * 0.08).toFixed(2));
  const finalTotal = Math.max(0, subtotal - discount + deliveryFee + tax);

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = onApplyPromo(promoInput.trim().toUpperCase());
    if (!success) {
      setPromoError('Invalid promo code. Try FORNO15 or FREESHIP');
    } else {
      setPromoError('');
      setPromoInput('');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
    >
      <div className="w-full max-w-md bg-[#161412] border-l border-[#2B2721] h-full flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#26221D] flex items-center justify-between bg-[#191714]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#E25822]" />
            <h2 id="cart-title" className="font-display font-semibold text-lg text-white">
              Your Order ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#9E968B] hover:text-white rounded-lg hover:bg-[#25211C] transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Mode Switcher (Delivery vs Pickup) */}
        <div className="px-5 py-3 bg-[#11100F] border-b border-[#221F1B] flex items-center justify-between">
          <div className="flex items-center gap-1 p-1 bg-[#1A1815] border border-[#2A251F] rounded-lg w-full">
            <button
              type="button"
              onClick={() => onSetOrderType('delivery')}
              className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap ${
                orderType === 'delivery'
                  ? 'bg-[#E25822] text-white shadow-sm'
                  : 'text-[#9E968B] hover:text-[#EDE8DF]'
              }`}
            >
              <Bike className="w-3.5 h-3.5" />
              <span>Delivery (25–35m)</span>
            </button>
            <button
              type="button"
              onClick={() => onSetOrderType('pickup')}
              className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap ${
                orderType === 'pickup'
                  ? 'bg-[#E25822] text-white shadow-sm'
                  : 'text-[#9E968B] hover:text-[#EDE8DF]'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Pickup (15m)</span>
            </button>
          </div>
        </div>

        {/* Free Delivery Bar (only for delivery mode) */}
        {orderType === 'delivery' && (
          <div className="px-5 py-2.5 bg-[#1B1815] border-b border-[#26221D] text-xs">
            {subtotal >= FREE_DELIVERY_THRESHOLD ? (
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                ✓ You unlocked Free Artisanal Delivery!
              </span>
            ) : (
              <div className="space-y-1.5">
                <div className="flex justify-between text-[#9E968B]">
                  <span>Add ${(FREE_DELIVERY_THRESHOLD - subtotal).toFixed(2)} for Free Delivery</span>
                  <span className="font-mono tabular-nums">{Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100)}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#2A2621] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#E25822] rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#201D1A] flex items-center justify-center text-[#9E968B]">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-[#EDE8DF] text-base">Your cart is empty</h3>
              <p className="text-xs text-[#9E968B] max-w-xs">
                Explore our wood-fired Neapolitan pies or craft your signature pizza with custom toppings.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 bg-[#27231E] hover:bg-[#342F29] text-xs font-medium text-white rounded-lg transition-colors cursor-pointer"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            items.map((item) => {
              const sizeObj = PIZZA_SIZES.find((s) => s.id === item.size);
              const crustObj = CRUST_OPTIONS.find((c) => c.id === item.crust);

              return (
                <div
                  key={item.cartItemId}
                  className="p-3.5 bg-[#1B1916] border border-[#2B2721] rounded-xl flex gap-3 text-xs"
                >
                  {/* Thumbnail */}
                  {item.product.image ? (
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-lg object-cover bg-[#221F1B] shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-[#27231E] flex items-center justify-center text-[#E25822] shrink-0">
                      🍕
                    </div>
                  )}

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium text-[#EDE8DF] truncate">{item.product.name}</h4>
                      <button
                        onClick={() => onRemoveItem(item.cartItemId)}
                        className="text-[#9E968B] hover:text-red-400 p-0.5 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-[#9E968B] mt-0.5">
                      <span>{sizeObj?.name.split(' ')[0]}</span>
                      <span className="mx-1">·</span>
                      <span>{crustObj?.name.split(' ')[0]}</span>
                    </div>

                    {item.customToppings && (
                      <div className="text-[10px] text-[#C67D28] mt-1 line-clamp-1">
                        + {item.customToppings.whole.length} extras
                      </div>
                    )}

                    {item.specialInstructions && (
                      <div className="text-[10px] text-[#7C756B] italic mt-0.5 truncate">
                        "{item.specialInstructions}"
                      </div>
                    )}

                    {/* Stepper & Price */}
                    <div className="flex items-center justify-between mt-2.5 pt-1 border-t border-[#26221D]">
                      <div className="flex items-center border border-[#2F2A23] rounded bg-[#151311]">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                          className="px-2 py-0.5 text-xs text-[#9E968B] hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2 font-mono tabular-nums text-white text-xs">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                          className="px-2 py-0.5 text-xs text-[#9E968B] hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-mono tabular-nums text-xs font-semibold text-[#EDE8DF]">
                        ${item.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Promo Code & Order Summary (only when cart has items) */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#26221D] bg-[#141210] space-y-3 shrink-0">
            {/* Promo Code Form */}
            {appliedPromo ? (
              <div className="flex items-center justify-between p-2 bg-[#1E251E] border border-emerald-900/50 rounded-lg text-xs text-emerald-400">
                <span className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Promo <strong>{appliedPromo}</strong> applied</span>
                </span>
                <button
                  onClick={onRemovePromo}
                  className="text-xs text-[#9E968B] hover:text-white underline cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handlePromoSubmit} className="space-y-1">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code (e.g. FORNO15)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs bg-[#1C1A17] border border-[#2C2721] rounded-lg text-[#EDE8DF] placeholder-[#6A6358] focus:outline-none focus:border-[#E25822] uppercase"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#2B2721] hover:bg-[#38332B] text-xs font-medium text-white rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoError && <div className="text-[11px] text-red-400">{promoError}</div>}
              </form>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#9E968B] pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-[#EDE8DF]">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount ({appliedPromo})</span>
                  <span className="font-mono tabular-nums">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>{orderType === 'delivery' ? 'Artisanal Delivery' : 'Store Pickup'}</span>
                <span className="font-mono tabular-nums text-[#EDE8DF]">
                  {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span className="font-mono tabular-nums text-[#EDE8DF]">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-white pt-2 border-t border-[#29241E]">
                <span>Total Due</span>
                <span className="font-mono tabular-nums text-[#E25822] text-base">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              type="button"
              onClick={onCheckout}
              className="w-full py-3 px-4 bg-[#E25822] hover:bg-[#C94A1A] text-white font-medium text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
