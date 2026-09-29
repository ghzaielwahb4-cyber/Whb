import React, { useState, useMemo } from 'react';
import {
  CrustType,
  SauceType,
  CheeseType,
  PizzaSize,
  CustomToppingsConfig,
  CartItem,
  PizzaProduct,
} from '../types/pizza';
import {
  PIZZA_SIZES,
  CRUST_OPTIONS,
  SAUCE_OPTIONS,
  CHEESE_OPTIONS,
  AVAILABLE_TOPPINGS,
} from '../data/menu';
import { PizzaCanvasPreview } from './PizzaCanvasPreview';
import { Plus, Check, Sparkles, X } from 'lucide-react';

interface CustomPizzaBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const CustomPizzaBuilder: React.FC<CustomPizzaBuilderProps> = ({
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('regular');
  const [selectedCrust, setSelectedCrust] = useState<CrustType>('neapolitan');
  const [selectedSauce, setSelectedSauce] = useState<SauceType>('san-marzano');
  const [selectedCheese, setSelectedCheese] = useState<CheeseType>('fior-di-latte');
  
  const [activeHalf, setActiveHalf] = useState<'whole' | 'left' | 'right'>('whole');
  const [toppingsConfig, setToppingsConfig] = useState<CustomToppingsConfig>({
    whole: ['pepperoni', 'fresh-basil'],
    leftHalf: [],
    rightHalf: [],
  });
  const [specialNotes, setSpecialNotes] = useState('');
  const [quantity, setQuantity] = useState(1);

  const currentSizeObj = PIZZA_SIZES.find((s) => s.id === selectedSize) || PIZZA_SIZES[1];
  const currentCrustObj = CRUST_OPTIONS.find((c) => c.id === selectedCrust) || CRUST_OPTIONS[0];
  const currentSauceObj = SAUCE_OPTIONS.find((s) => s.id === selectedSauce) || SAUCE_OPTIONS[0];
  const currentCheeseObj = CHEESE_OPTIONS.find((c) => c.id === selectedCheese) || CHEESE_OPTIONS[0];

  // Calculate live price
  const calculatedPrice = useMemo(() => {
    const baseForSize = 14.0 * currentSizeObj.multiplier;
    const crustFee = currentCrustObj.extraPrice;
    const sauceFee = currentSauceObj.extraPrice;
    const cheeseFee = currentCheeseObj.extraPrice;

    // Calculate toppings fee:
    let toppingTotal = 0;
    toppingsConfig.whole.forEach((tId) => {
      const t = AVAILABLE_TOPPINGS.find((item) => item.id === tId);
      if (t) toppingTotal += t.price;
    });
    toppingsConfig.leftHalf.forEach((tId) => {
      const t = AVAILABLE_TOPPINGS.find((item) => item.id === tId);
      if (t) toppingTotal += t.price * 0.55;
    });
    toppingsConfig.rightHalf.forEach((tId) => {
      const t = AVAILABLE_TOPPINGS.find((item) => item.id === tId);
      if (t) toppingTotal += t.price * 0.55;
    });

    const singlePrice = baseForSize + crustFee + sauceFee + cheeseFee + toppingTotal;
    return Number(singlePrice.toFixed(2));
  }, [
    currentSizeObj,
    currentCrustObj,
    currentSauceObj,
    currentCheeseObj,
    toppingsConfig,
  ]);

  if (!isOpen) return null;

  const toggleTopping = (toppingId: string) => {
    setToppingsConfig((prev) => {
      const targetList =
        activeHalf === 'whole'
          ? prev.whole
          : activeHalf === 'left'
          ? prev.leftHalf
          : prev.rightHalf;

      const exists = targetList.includes(toppingId);
      const updatedList = exists
        ? targetList.filter((id) => id !== toppingId)
        : [...targetList, toppingId];

      if (activeHalf === 'whole') {
        return { ...prev, whole: updatedList };
      } else if (activeHalf === 'left') {
        return { ...prev, leftHalf: updatedList };
      } else {
        return { ...prev, rightHalf: updatedList };
      }
    });
  };

  const isToppingSelected = (toppingId: string) => {
    if (activeHalf === 'whole') return toppingsConfig.whole.includes(toppingId);
    if (activeHalf === 'left') return toppingsConfig.leftHalf.includes(toppingId);
    return toppingsConfig.rightHalf.includes(toppingId);
  };

  const handleCompleteOrder = () => {
    const customProduct: PizzaProduct = {
      id: `custom-pie-${Date.now()}`,
      name: 'Custom Artisan Creation',
      italianName: 'Pizza a Modo Tuo',
      description: `${currentCrustObj.name}, ${currentSauceObj.name}, ${currentCheeseObj.name}`,
      basePrice: calculatedPrice,
      image: '',
      category: 'specialty',
      ingredients: [
        currentCrustObj.name,
        currentSauceObj.name,
        currentCheeseObj.name,
        ...toppingsConfig.whole.map(
          (id) => AVAILABLE_TOPPINGS.find((t) => t.id === id)?.name || id
        ),
      ],
      recommendedCrust: selectedCrust,
    };

    const cartItem: CartItem = {
      cartItemId: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      product: customProduct,
      size: selectedSize,
      crust: selectedCrust,
      sauce: selectedSauce,
      cheese: selectedCheese,
      customToppings: toppingsConfig,
      specialInstructions: specialNotes.trim() ? specialNotes.trim() : undefined,
      unitPrice: calculatedPrice,
      quantity,
      totalPrice: Number((calculatedPrice * quantity).toFixed(2)),
    };

    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="builder-title"
    >
      <div className="relative w-full max-w-5xl bg-[#161412] border border-[#2D2823] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-40 p-2 text-[#9E968B] hover:text-white bg-[#221F1B] hover:bg-[#2C2722] rounded-full transition-colors"
          aria-label="Close custom pizza builder"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Interactive Live Preview Visual */}
        <div className="md:w-5/12 bg-[#100F0E] p-6 sm:p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#26221D] relative">
          <div className="text-center mb-4">
            <span className="text-xs uppercase tracking-widest text-[#E25822] font-semibold">
              Live Wood-Fired Canvas
            </span>
            <h2 id="builder-title" className="text-xl sm:text-2xl font-display font-bold text-[#EDE8DF] mt-1">
              Craft Your Signature Pie
            </h2>
            <p className="text-xs text-[#9E968B] mt-1">
              Click left/right half to craft split toppings
            </p>
          </div>

          <div className="my-auto py-2">
            <PizzaCanvasPreview
              crust={selectedCrust}
              sauce={selectedSauce}
              cheese={selectedCheese}
              toppingsWhole={toppingsConfig.whole}
              toppingsLeft={toppingsConfig.leftHalf}
              toppingsRight={toppingsConfig.rightHalf}
              sizeInches={currentSizeObj.inches}
              interactiveHalf={activeHalf}
              onSelectHalf={(half) => setActiveHalf(half)}
            />
          </div>

          {/* Quick Summary of Current Selections */}
          <div className="w-full mt-4 pt-3 border-t border-[#221F1B] text-xs text-[#9E968B] flex items-center justify-between">
            <div>
              <span>{currentSizeObj.name}</span>
              <span className="mx-1.5" aria-hidden="true">·</span>
              <span>{currentCrustObj.name.split(' ')[0]}</span>
            </div>
            <div className="font-mono tabular-nums text-sm text-[#E25822] font-bold">
              ${calculatedPrice.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Right Column: Customization Controls (Scrollable) */}
        <div className="md:w-7/12 p-6 sm:p-8 flex flex-col overflow-y-auto max-h-[85vh]">
          <div className="space-y-6 flex-1 pb-4">
            {/* 1. Size Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#9E968B] mb-2">
                1. Select Size & Feeds
              </label>
              <div className="grid grid-cols-3 gap-2">
                {PIZZA_SIZES.map((size) => (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setSelectedSize(size.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedSize === size.id
                        ? 'border-[#E25822] bg-[#E25822]/10 text-white shadow-sm'
                        : 'border-[#2C2722] bg-[#1C1A17] text-[#EDE8DF] hover:border-[#423C35]'
                    }`}
                  >
                    <div className="text-xs font-semibold">{size.name}</div>
                    <div className="text-[11px] text-[#9E968B] mt-0.5">{size.serves}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Crust Dough */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#9E968B] mb-2">
                2. Artisan Dough & Crust
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {CRUST_OPTIONS.map((crust) => (
                  <button
                    key={crust.id}
                    type="button"
                    onClick={() => setSelectedCrust(crust.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedCrust === crust.id
                        ? 'border-[#E25822] bg-[#E25822]/10 text-white shadow-sm'
                        : 'border-[#2C2722] bg-[#1C1A17] text-[#EDE8DF] hover:border-[#423C35]'
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
                    <p className="text-[11px] text-[#9E968B] mt-1 line-clamp-2">
                      {crust.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Base Sauce */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#9E968B] mb-2">
                3. Artisanal Base Sauce
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SAUCE_OPTIONS.map((sauce) => (
                  <button
                    key={sauce.id}
                    type="button"
                    onClick={() => setSelectedSauce(sauce.id)}
                    className={`p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                      selectedSauce === sauce.id
                        ? 'border-[#E25822] bg-[#E25822]/10 text-white'
                        : 'border-[#2C2722] bg-[#1C1A17] text-[#EDE8DF] hover:border-[#423C35]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/40"
                        style={{ backgroundColor: sauce.color }}
                      />
                      <span className="text-xs font-medium">{sauce.name}</span>
                    </div>
                    {sauce.extraPrice > 0 && (
                      <span className="text-xs font-mono text-[#E25822] tabular-nums">
                        +${sauce.extraPrice.toFixed(2)}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Cheese Base */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#9E968B] mb-2">
                4. Primary Melted Cheese
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {CHEESE_OPTIONS.map((cheese) => (
                  <button
                    key={cheese.id}
                    type="button"
                    onClick={() => setSelectedCheese(cheese.id)}
                    className={`p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                      selectedCheese === cheese.id
                        ? 'border-[#E25822] bg-[#E25822]/10 text-white'
                        : 'border-[#2C2722] bg-[#1C1A17] text-[#EDE8DF] hover:border-[#423C35]'
                    }`}
                  >
                    <span className="text-xs font-medium">{cheese.name}</span>
                    {cheese.extraPrice > 0 && (
                      <span className="text-xs font-mono text-[#E25822] tabular-nums">
                        +${cheese.extraPrice.toFixed(2)}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Toppings Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#9E968B]">
                  5. Toppings (Applying to: <span className="text-[#E25822] uppercase">{activeHalf}</span>)
                </label>
                <span className="text-[11px] text-[#9E968B]">
                  Half pricing is 55% of whole
                </span>
              </div>

              {/* Meats */}
              <div className="mb-3">
                <div className="text-[11px] font-medium text-[#EDE8DF]/70 mb-1.5">Meats & Charcuterie</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {AVAILABLE_TOPPINGS.filter((t) => t.category === 'meat').map((topping) => {
                    const selected = isToppingSelected(topping.id);
                    return (
                      <button
                        key={topping.id}
                        type="button"
                        onClick={() => toggleTopping(topping.id)}
                        className={`p-2 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                          selected
                            ? 'border-[#E25822] bg-[#E25822]/20 text-white font-medium'
                            : 'border-[#27231E] bg-[#181614] text-[#EDE8DF] hover:border-[#3E3730]'
                        }`}
                      >
                        <span className="truncate pr-1">{topping.name.split(' ')[0]}</span>
                        <span className="font-mono text-[10px] text-[#9E968B] tabular-nums shrink-0">
                          +${topping.price.toFixed(2)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Vegetables */}
              <div className="mb-3">
                <div className="text-[11px] font-medium text-[#EDE8DF]/70 mb-1.5">Garden & Wild Vegetables</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {AVAILABLE_TOPPINGS.filter((t) => t.category === 'veg').map((topping) => {
                    const selected = isToppingSelected(topping.id);
                    return (
                      <button
                        key={topping.id}
                        type="button"
                        onClick={() => toggleTopping(topping.id)}
                        className={`p-2 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                          selected
                            ? 'border-[#E25822] bg-[#E25822]/20 text-white font-medium'
                            : 'border-[#27231E] bg-[#181614] text-[#EDE8DF] hover:border-[#3E3730]'
                        }`}
                      >
                        <span className="truncate pr-1">{topping.name.split(' ')[0]}</span>
                        <span className="font-mono text-[10px] text-[#9E968B] tabular-nums shrink-0">
                          +${topping.price.toFixed(2)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Finishes */}
              <div>
                <div className="text-[11px] font-medium text-[#EDE8DF]/70 mb-1.5">Finishing Drizzles & Herbs</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {AVAILABLE_TOPPINGS.filter((t) => t.category === 'finish').map((topping) => {
                    const selected = isToppingSelected(topping.id);
                    return (
                      <button
                        key={topping.id}
                        type="button"
                        onClick={() => toggleTopping(topping.id)}
                        className={`p-2 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                          selected
                            ? 'border-[#E25822] bg-[#E25822]/20 text-white font-medium'
                            : 'border-[#27231E] bg-[#181614] text-[#EDE8DF] hover:border-[#3E3730]'
                        }`}
                      >
                        <span className="truncate pr-1">{topping.name.split(' ')[0]}</span>
                        <span className="font-mono text-[10px] text-[#9E968B] tabular-nums shrink-0">
                          +${topping.price.toFixed(2)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#9E968B] mb-1.5">
                Special Kitchen Instructions (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Well done crust, cut in 8 slices, light sauce..."
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#1A1815] border border-[#2D2721] rounded-lg text-[#EDE8DF] placeholder-[#766E63] focus:outline-none focus:border-[#E25822]"
              />
            </div>
          </div>

          {/* Bottom Bar: Quantity & Add to Cart */}
          <div className="pt-4 border-t border-[#26221D] flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 bg-[#161412]">
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#9E968B]">Quantity:</span>
              <div className="flex items-center border border-[#2F2923] rounded-lg bg-[#191714]">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-xs text-[#9E968B] hover:text-white transition-colors"
                >
                  -
                </button>
                <span className="px-2 text-xs font-mono tabular-nums font-semibold text-[#EDE8DF]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1.5 text-xs text-[#9E968B] hover:text-white transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCompleteOrder}
              className="w-full sm:w-auto px-6 py-3 bg-[#E25822] hover:bg-[#C94A1A] text-white font-medium text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Add Custom Creation to Order</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums font-bold">
                ${(calculatedPrice * quantity).toFixed(2)}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
