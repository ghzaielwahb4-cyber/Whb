import React from 'react';
import { ShoppingBag, Sparkles, Bike, Store, Compass } from 'lucide-react';
import { CartItem } from '../types/pizza';

interface NavbarProps {
  cartItems: CartItem[];
  orderType: 'delivery' | 'pickup';
  onToggleOrderType: () => void;
  onOpenCart: () => void;
  onOpenCustomBuilder: () => void;
  onOpenOrderTracker: () => void;
  hasActiveOrder: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  orderType,
  onToggleOrderType,
  onOpenCart,
  onOpenCustomBuilder,
  onOpenOrderTracker,
  hasActiveOrder,
}) => {
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#121110]/95 backdrop-blur-md border-b border-[#28241F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-xl sm:text-2xl font-display font-bold tracking-tight text-white hover:text-[#EDE8DF] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span>Forno & Fuoco</span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-medium text-[#9E968B]">
          <a
            href="#menu"
            className="hover:text-white transition-colors whitespace-nowrap"
          >
            Menu
          </a>
          <button
            type="button"
            onClick={onOpenCustomBuilder}
            className="hover:text-white transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E25822]" />
            <span>Custom Builder</span>
          </button>
          <a
            href="#combos"
            className="hover:text-white transition-colors whitespace-nowrap"
          >
            Deals & Combos
          </a>
          <a
            href="#craft"
            className="hover:text-white transition-colors whitespace-nowrap"
          >
            Our Craft
          </a>
          {hasActiveOrder && (
            <button
              type="button"
              onClick={onOpenOrderTracker}
              className="text-[#E25822] hover:text-[#FF773D] transition-colors whitespace-nowrap flex items-center gap-1 font-semibold cursor-pointer animate-pulse"
            >
              <span>Track Live Order</span>
            </button>
          )}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Order Mode Toggle */}
          <button
            type="button"
            onClick={onToggleOrderType}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#EDE8DF] bg-[#1C1A17] hover:bg-[#28241F] border border-[#2E2822] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            title="Switch Delivery / Pickup"
          >
            {orderType === 'delivery' ? (
              <>
                <Bike className="w-3.5 h-3.5 text-[#E25822]" />
                <span>Delivery (25–35m)</span>
              </>
            ) : (
              <>
                <Store className="w-3.5 h-3.5 text-[#E25822]" />
                <span>Pickup (15m)</span>
              </>
            )}
          </button>

          {/* Cart Trigger */}
          <button
            type="button"
            onClick={onOpenCart}
            className="flex items-center gap-2 px-3.5 py-2 bg-[#E25822] hover:bg-[#C94A1A] text-white text-xs font-semibold rounded-xl shadow-md transition-all whitespace-nowrap cursor-pointer"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Bag</span>
            {totalItemCount > 0 && (
              <>
                <span className="w-1 h-1 rounded-full bg-white/50" />
                <span className="font-mono tabular-nums bg-white/20 px-1.5 py-0.5 rounded text-[11px]">
                  {totalItemCount}
                </span>
                <span className="hidden sm:inline font-mono tabular-nums text-[11px]">
                  ${cartSubtotal.toFixed(2)}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
