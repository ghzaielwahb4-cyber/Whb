import React from 'react';
import { CrustType, SauceType, CheeseType } from '../types/pizza';
import { SAUCE_OPTIONS, CHEESE_OPTIONS, AVAILABLE_TOPPINGS } from '../data/menu';

interface PizzaCanvasPreviewProps {
  crust: CrustType;
  sauce: SauceType;
  cheese: CheeseType;
  toppingsWhole: string[];
  toppingsLeft: string[];
  toppingsRight: string[];
  sizeInches?: number;
  interactiveHalf?: 'whole' | 'left' | 'right';
  onSelectHalf?: (half: 'whole' | 'left' | 'right') => void;
}

export const PizzaCanvasPreview: React.FC<PizzaCanvasPreviewProps> = ({
  crust,
  sauce,
  cheese,
  toppingsWhole,
  toppingsLeft,
  toppingsRight,
  interactiveHalf,
  onSelectHalf,
}) => {
  const currentSauce = SAUCE_OPTIONS.find((s) => s.id === sauce) || SAUCE_OPTIONS[0];
  const currentCheese = CHEESE_OPTIONS.find((c) => c.id === cheese) || CHEESE_OPTIONS[0];

  // Helper to render topping elements visually
  const renderToppingIcons = (toppingId: string, side: 'whole' | 'left' | 'right') => {
    const topping = AVAILABLE_TOPPINGS.find((t) => t.id === toppingId);
    if (!topping) return null;

    // Fixed realistic positions (percentage based) to avoid random jitter on re-render
    const wholePositions = [
      { x: 30, y: 32, r: 12 },
      { x: 68, y: 28, r: -18 },
      { x: 50, y: 48, r: 4 },
      { x: 32, y: 65, r: 25 },
      { x: 67, y: 64, r: -10 },
      { x: 48, y: 24, r: 35 },
      { x: 22, y: 48, r: -40 },
      { x: 77, y: 46, r: 15 },
      { x: 52, y: 76, r: -22 },
    ];

    const leftPositions = [
      { x: 24, y: 34, r: 15 },
      { x: 36, y: 22, r: -20 },
      { x: 34, y: 52, r: 10 },
      { x: 22, y: 66, r: -35 },
      { x: 38, y: 74, r: 40 },
    ];

    const rightPositions = [
      { x: 65, y: 24, r: -15 },
      { x: 76, y: 38, r: 25 },
      { x: 64, y: 52, r: -10 },
      { x: 75, y: 68, r: 30 },
      { x: 62, y: 75, r: -25 },
    ];

    let positions = wholePositions;
    if (side === 'left') positions = leftPositions;
    if (side === 'right') positions = rightPositions;

    return positions.map((pos, idx) => (
      <div
        key={`${toppingId}-${side}-${idx}`}
        className="absolute pointer-events-none transition-transform duration-300 transform -translate-x-1/2 -translate-y-1/2 select-none"
        style={{
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          transform: `translate(-50%, -50%) rotate(${pos.r}deg)`,
        }}
      >
        {toppingId === 'pepperoni' && (
          <div className="w-8 h-8 rounded-full bg-[#B91C1C] border-2 border-[#7F1D1D] shadow-md flex items-center justify-center opacity-95">
            <div className="w-6 h-6 rounded-full border border-[#991B1B] bg-gradient-to-br from-[#DC2626] to-[#991B1B] opacity-90" />
          </div>
        )}

        {toppingId === 'wild-mushrooms' && (
          <div className="w-7 h-6 rounded-t-full bg-[#695D54] border border-[#443C36] shadow-sm flex flex-col items-center">
            <div className="w-2 h-2.5 bg-[#8C7D73] rounded-b-sm -mt-0.5" />
          </div>
        )}

        {toppingId === 'fresh-basil' && (
          <div className="w-7 h-4 bg-emerald-600 rounded-[50%_0_50%_0] border border-emerald-800 shadow-sm transform -rotate-45" />
        )}

        {toppingId === 'kalamata-olives' && (
          <div className="w-5 h-5 rounded-full bg-[#18181B] border border-zinc-700 shadow flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#3F3F46]" />
          </div>
        )}

        {toppingId === 'roasted-peppers' && (
          <div className="w-7 h-2.5 rounded-full bg-amber-600 border border-amber-800 shadow-sm transform rotate-12" />
        )}

        {toppingId === 'cherry-tomatoes' && (
          <div className="w-6 h-6 rounded-full bg-red-600 border border-red-800 shadow-sm flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400 opacity-60" />
          </div>
        )}

        {toppingId === 'prosciutto' && (
          <div className="w-9 h-4 bg-rose-700/90 rounded-md border border-rose-900 shadow-sm transform rotate-6" />
        )}

        {toppingId === 'hot-honey' && (
          <div className="w-8 h-1.5 rounded-full bg-amber-400/80 shadow-[0_0_8px_rgba(251,191,36,0.8)] filter blur-[0.5px]" />
        )}

        {/* Fallback for other toppings */}
        {!['pepperoni', 'wild-mushrooms', 'fresh-basil', 'kalamata-olives', 'roasted-peppers', 'cherry-tomatoes', 'prosciutto', 'hot-honey'].includes(toppingId) && (
          <div
            className="w-4 h-4 rounded-full border border-black/20 shadow-sm"
            style={{ backgroundColor: topping.color }}
          />
        )}
      </div>
    ));
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Outer wooden peel board shadow */}
      <div className="relative w-72 h-72 sm:w-84 sm:h-84 md:w-96 md:h-96 rounded-full p-3 sm:p-4 bg-gradient-to-br from-[#2A231C] to-[#17130F] shadow-2xl border border-[#3C3228] flex items-center justify-center">
        
        {/* Crust Edge with blistered leopard charring */}
        <div
          className={`relative w-full h-full rounded-full transition-all duration-300 flex items-center justify-center overflow-hidden ${
            crust === 'neapolitan'
              ? 'bg-gradient-to-tr from-[#A66121] via-[#D97706] to-[#92400E] shadow-[inset_0_4px_12px_rgba(0,0,0,0.6)]'
              : crust === 'roman-crispy'
              ? 'bg-gradient-to-tr from-[#B47029] via-[#E28A2B] to-[#965416] p-1.5'
              : crust === 'stuffed-garlic'
              ? 'bg-gradient-to-tr from-[#C57C2B] via-[#FBBF24] to-[#A15712] ring-4 ring-amber-400/20'
              : 'bg-gradient-to-tr from-[#947858] via-[#B89871] to-[#785F42]'
          }`}
        >
          {/* Subtle crust char marks (leopard spotting) */}
          <div className="absolute top-2 left-1/4 w-3 h-2 bg-black/40 rounded-full filter blur-[0.5px]" />
          <div className="absolute bottom-3 right-1/3 w-4 h-2.5 bg-black/50 rounded-full filter blur-[0.5px]" />
          <div className="absolute top-1/3 right-2 w-3.5 h-2 bg-black/45 rounded-full filter blur-[0.5px]" />
          <div className="absolute bottom-1/4 left-2 w-4 h-2 bg-black/40 rounded-full filter blur-[0.5px]" />

          {/* Pizza Inner Basin (Sauce & Cheese base) */}
          <div
            className="relative w-[86%] h-[86%] rounded-full shadow-inner overflow-hidden transition-colors duration-500 flex items-center justify-center"
            style={{
              backgroundColor: currentSauce.color,
            }}
          >
            {/* Sauce texture swirls */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-black/30 pointer-events-none" />

            {/* Melted Cheese Layer */}
            <div
              className="absolute inset-2 rounded-full opacity-90 transition-colors duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${currentCheese.color} 35%, ${currentCheese.color}CC 65%, transparent 92%)`,
              }}
            >
              {/* Golden baked cheese bubbles */}
              <div className="absolute top-6 left-10 w-6 h-5 rounded-full bg-[#E59834]/50 filter blur-[1px]" />
              <div className="absolute bottom-8 right-12 w-8 h-6 rounded-full bg-[#E59834]/60 filter blur-[1px]" />
              <div className="absolute top-12 right-14 w-5 h-4 rounded-full bg-[#E59834]/40 filter blur-[1px]" />
              <div className="absolute bottom-12 left-16 w-7 h-5 rounded-full bg-[#E59834]/50 filter blur-[1px]" />
            </div>

            {/* Interactive Half & Half Division Line */}
            {onSelectHalf && (
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 border-l-2 border-dashed border-white/50 z-20 pointer-events-none" />
            )}

            {/* Render Toppings: Left Side */}
            <div className="absolute inset-0 z-10">
              {toppingsLeft.map((id) => renderToppingIcons(id, 'left'))}
            </div>

            {/* Render Toppings: Right Side */}
            <div className="absolute inset-0 z-10">
              {toppingsRight.map((id) => renderToppingIcons(id, 'right'))}
            </div>

            {/* Render Toppings: Whole Pie */}
            <div className="absolute inset-0 z-10">
              {toppingsWhole.map((id) => renderToppingIcons(id, 'whole'))}
            </div>

            {/* Interactive Half Click Targets */}
            {onSelectHalf && (
              <div className="absolute inset-0 z-30 flex">
                <button
                  type="button"
                  onClick={() => onSelectHalf('left')}
                  className={`w-1/2 h-full cursor-pointer transition-colors duration-200 focus:outline-none ${
                    interactiveHalf === 'left' ? 'bg-amber-500/20 ring-1 ring-inset ring-amber-400' : 'hover:bg-white/10'
                  }`}
                  aria-label="Customize Left Half"
                />
                <button
                  type="button"
                  onClick={() => onSelectHalf('right')}
                  className={`w-1/2 h-full cursor-pointer transition-colors duration-200 focus:outline-none ${
                    interactiveHalf === 'right' ? 'bg-amber-500/20 ring-1 ring-inset ring-amber-400' : 'hover:bg-white/10'
                  }`}
                  aria-label="Customize Right Half"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Half selection buttons when interactive */}
      {onSelectHalf && (
        <div className="mt-4 flex items-center gap-1.5 p-1 bg-[#1A1816] border border-[#2E2A24] rounded-lg">
          <button
            type="button"
            onClick={() => onSelectHalf('whole')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              interactiveHalf === 'whole'
                ? 'bg-[#E25822] text-white shadow-sm'
                : 'text-[#9E968B] hover:text-[#EDE8DF]'
            }`}
          >
            Whole Pie
          </button>
          <button
            type="button"
            onClick={() => onSelectHalf('left')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              interactiveHalf === 'left'
                ? 'bg-[#E25822] text-white shadow-sm'
                : 'text-[#9E968B] hover:text-[#EDE8DF]'
            }`}
          >
            Left Half
          </button>
          <button
            type="button"
            onClick={() => onSelectHalf('right')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              interactiveHalf === 'right'
                ? 'bg-[#E25822] text-white shadow-sm'
                : 'text-[#9E968B] hover:text-[#EDE8DF]'
            }`}
          >
            Right Half
          </button>
        </div>
      )}
    </div>
  );
};
