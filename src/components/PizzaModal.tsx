import React, { useState } from 'react';
import { PizzaProduct, PizzaSize, CrustType, CartItem } from '../types/pizza';
import { PIZZA_SIZES, CRUST_OPTIONS, AVAILABLE_TOPPINGS } from '../data/menu';
import { X, Flame, Leaf, Check } from 'lucide-react';

interface PizzaModalProps {
  product: PizzaProduct | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const PizzaModal: React.FC<PizzaModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('regular');
  const [selectedCrust, setSelectedCrust] = useState<CrustType>(product.recommendedCrust || 'neapolitan');
  const [extraToppings, setExtraToppings] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const sizeOption = PIZZA_SIZES.find((s) => s.id === selectedSize) || PIZZA_SIZES[1];
  const crustOption = CRUST_OPTIONS.find((c) => c.id === selectedCrust) || CRUST_OPTIONS[0];

  // Calculate live item price
  const baseCalculated = product.basePrice * sizeOption.multiplier;
  const crustFee = crustOption.extraPrice;
  const extraToppingFee = extraToppings.reduce((total, id) => {
    const topping = AVAILABLE_TOPPINGS.find((t) => t.id === id);
    return total + (topping ? topping.price : 0);
  }, 0);

  const unitPrice = Number((baseCalculated + crustFee + extraToppingFee).toFixed(2));
  const totalPrice = Number((unitPrice * quantity).toFixed(2));

  const toggleExtraTopping = (toppingId: string) => {
    setExtraToppings((prev) =>
      prev.includes(toppingId)
        ? prev.filter((id) => id !== toppingId)
        : [...prev, toppingId]
    );
  };

  const handleAdd = () => {
    const cartItem: CartItem = {
      cartItemId: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      product,
      size: selectedSize,
      crust: selectedCrust,
      customToppings: extraToppings.length > 0 ? { whole: extraToppings, leftHalf: [], rightHalf: [] } : undefined,
      specialInstructions: specialInstructions.trim() ? specialInstructions.trim() : undefined,
      unitPrice,
      quantity,
      totalPrice,
    };

    setAddedAnimation(true);
    setTimeout(() => {
      onAddToCart(cartItem);
      onClose();
    }, 300);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pizza-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-[#181614] border border-[#2D2822] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#9E968B] hover:text-white bg-[#100F0E]/80 backdrop-blur rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Image with Scrim */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-[#100F0E] shrink-0">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181614] via-[#181614]/40 to-transparent" />

          {/* Product badges & category */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 text-xs text-[#E25822] uppercase tracking-wider font-semibold mb-1">
              <span>{product.italianName}</span>
              {product.isVegetarian && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Leaf className="w-3 h-3" /> Vegetarian
                  </span>
                </>
              )}
              {product.isSpicy && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 text-red-400">
                    <Flame className="w-3 h-3" /> Spicy
                  </span>
                </>
              )}
            </div>
            <h2 id="pizza-modal-title" className="text-2xl font-display font-bold text-white">
              {product.name}
            </h2>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* Description */}
          <p className="text-[#9E968B] text-xs sm:text-sm leading-relaxed">
            {product.description}
          </p>

          {/* Ingredients Breakdown */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#9E968B] mb-2">
              Fresh Ingredients
            </div>
            <div className="flex flex-wrap gap-1.5 text-xs text-[#EDE8DF]">
              {product.ingredients.map((ing, idx) => (
                <span key={idx} className="bg-[#24211D] px-2.5 py-1 rounded-md border border-[#322E28]">
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* 1. Size Selection */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#9E968B] mb-2.5">
              Select Size
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {PIZZA_SIZES.map((size) => {
                const sPrice = (product.basePrice * size.multiplier).toFixed(2);
                const isSelected = selectedSize === size.id;
                return (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setSelectedSize(size.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#E25822] bg-[#E25822]/10 text-white shadow-sm'
                        : 'border-[#2C2721] bg-[#1F1C19] text-[#EDE8DF] hover:border-[#3E3830]'
                    }`}
                  >
                    <div className="text-xs font-semibold">{size.name}</div>
                    <div className="text-[11px] text-[#9E968B] mt-0.5">{size.serves}</div>
                    <div className="text-xs font-mono font-medium text-[#E25822] mt-1 tabular-nums">
                      ${sPrice}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Crust Type */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#9E968B] mb-2.5">
              Crust Selection
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CRUST_OPTIONS.map((crust) => {
                const isSelected = selectedCrust === crust.id;
                return (
                  <button
                    key={crust.id}
                    type="button"
                    onClick={() => setSelectedCrust(crust.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#E25822] bg-[#E25822]/10 text-white'
                        : 'border-[#2C2721] bg-[#1F1C19] text-[#EDE8DF] hover:border-[#3E3830]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span>{crust.name}</span>
                      {crust.extraPrice > 0 && (
                        <span className="font-mono text-[#E25822] tabular-nums">
                          +${crust.extraPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#9E968B] mt-1 line-clamp-1">
                      {crust.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Extra Artisanal Finishes & Add-ons */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#9E968B] mb-2.5">
              Customize with Extras (Optional)
            </div>
            <div className="grid grid-cols-2 gap-2">
              {AVAILABLE_TOPPINGS.slice(0, 8).map((topping) => {
                const isChecked = extraToppings.includes(topping.id);
                return (
                  <button
                    key={topping.id}
                    type="button"
                    onClick={() => toggleExtraTopping(topping.id)}
                    className={`p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                      isChecked
                        ? 'border-[#E25822] bg-[#E25822]/20 text-white font-medium'
                        : 'border-[#2A2621] bg-[#1B1916] text-[#EDE8DF] hover:border-[#3A342D]'
                    }`}
                  >
                    <span className="truncate pr-1">{topping.name}</span>
                    <span className="font-mono text-xs text-[#9E968B] tabular-nums shrink-0">
                      +${topping.price.toFixed(2)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Special Kitchen Notes */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#9E968B] mb-1.5">
              Kitchen Instructions
            </label>
            <input
              type="text"
              placeholder="e.g. Extra crispy, slice in 8 pieces, sauce on side..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#1C1A17] border border-[#2D2822] rounded-lg text-[#EDE8DF] placeholder-[#6D655A] focus:outline-none focus:border-[#E25822]"
            />
          </div>
        </div>

        {/* Footer Bar: Quantity & Total CTA */}
        <div className="p-4 sm:p-6 border-t border-[#292520] bg-[#141311] flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#9E968B]">Quantity:</span>
            <div className="flex items-center border border-[#322D27] rounded-lg bg-[#1D1B18]">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1.5 text-xs text-[#9E968B] hover:text-white"
              >
                -
              </button>
              <span className="px-2.5 text-xs font-mono tabular-nums font-semibold text-[#EDE8DF]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1.5 text-xs text-[#9E968B] hover:text-white"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`w-full sm:w-auto px-6 py-3 bg-[#E25822] hover:bg-[#C94A1A] text-white font-medium text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
              addedAnimation ? 'scale-95 bg-emerald-600' : ''
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4" /> Added to Order!
              </>
            ) : (
              <>
                <span>Add to Order</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums font-bold">${totalPrice.toFixed(2)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
