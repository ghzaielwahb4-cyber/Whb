import React from 'react';
import { COMBO_DEALS } from '../data/menu';
import { Tag, Sparkles, Plus, Check } from 'lucide-react';
import { CartItem, PizzaProduct } from '../types/pizza';

interface DealsSectionProps {
  onAddComboToCart: (combo: (typeof COMBO_DEALS)[0]) => void;
}

export const DealsSection: React.FC<DealsSectionProps> = ({ onAddComboToCart }) => {
  return (
    <section id="combos" className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#25211C] bg-[#141210]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12">
          <span className="text-xs uppercase tracking-widest text-[#E25822] font-semibold">
            Chef Curated Bundles
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-1">
            Artisan Combos & Savings
          </h2>
          <p className="text-xs sm:text-sm text-[#9E968B] mt-1.5">
            Hand-crafted multi-pie collections paired with wood-fired starters and Italian craft sodas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {COMBO_DEALS.map((deal) => (
            <div
              key={deal.id}
              className="p-6 rounded-2xl bg-[#191714] border border-[#2D2821] flex flex-col justify-between hover:border-[#3F372C] transition-all relative overflow-hidden group shadow-lg"
            >
              {/* Savings Ribbon */}
              <div className="absolute top-0 right-0 bg-[#E25822] text-white text-[11px] font-bold px-3 py-1 rounded-bl-xl shadow-md">
                {deal.saving}
              </div>

              <div>
                <div className="text-[11px] uppercase tracking-wider text-[#C67D28] font-semibold mb-1">
                  {deal.tagline}
                </div>
                <h3 className="font-display font-bold text-xl text-white">
                  {deal.name}
                </h3>
                <p className="text-xs text-[#9E968B] mt-2 leading-relaxed">
                  {deal.description}
                </p>

                {/* Inclusions list */}
                <div className="mt-5 space-y-2 pt-4 border-t border-[#26221D]">
                  <div className="text-[11px] font-semibold text-[#EDE8DF] uppercase tracking-wider">
                    Bundle Includes:
                  </div>
                  {deal.includedItems.map((inc, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#9E968B]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E25822]" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Action */}
              <div className="mt-6 pt-5 border-t border-[#26221D] flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] text-[#7C756A] line-through font-mono tabular-nums">
                    ${deal.originalPrice.toFixed(2)}
                  </div>
                  <div className="font-mono tabular-nums text-xl font-bold text-white">
                    ${deal.dealPrice.toFixed(2)}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onAddComboToCart(deal)}
                  className="px-4 py-2.5 bg-[#E25822] hover:bg-[#C94A1A] text-white text-xs font-semibold rounded-xl shadow transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Bundle</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
