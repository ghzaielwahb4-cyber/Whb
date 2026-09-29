import React from 'react';
import { Flame, Clock, Award, Sparkles, ArrowRight } from 'lucide-react';
import heroImg from '../assets/images/pizza_hero_woodfired_1790512511305.jpg';

interface HeroProps {
  onOpenCustomBuilder: () => void;
  orderType: 'delivery' | 'pickup';
  onSetOrderType: (type: 'delivery' | 'pickup') => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenCustomBuilder,
  orderType,
  onSetOrderType,
}) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#25211C]">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#E25822]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headline and Value Proposition */}
        <div className="lg:col-span-7 space-y-6">
          {/* Subtle editorial kicker */}
          <div className="flex items-center gap-2 text-xs text-[#E25822] font-semibold uppercase tracking-wider">
            <Flame className="w-4 h-4" />
            <span>Neapolitan Wood-Fired Craft</span>
            <span aria-hidden="true" className="text-[#6D655A]">·</span>
            <span className="text-[#9E968B]">Est. Napoli 1994</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-[1.1] text-balance">
            48-Hour Cold Fermented Crust. <span className="text-[#E25822]">Baked at 900°F</span> in 90 Seconds.
          </h1>

          <p className="text-sm sm:text-base text-[#9E968B] max-w-xl leading-relaxed">
            Hand-stretched sourdough dough, sweet volcanic San Marzano D.O.P. plum tomatoes, and molten buffalo fior di latte. Delivered piping hot to your doorstep.
          </p>

          {/* Delivery vs Pickup Selector Bar */}
          <div className="p-2 bg-[#191714] border border-[#2D2821] rounded-2xl max-w-md flex items-center justify-between gap-2 shadow-inner">
            <div className="flex items-center gap-1 w-full">
              <button
                type="button"
                onClick={() => onSetOrderType('delivery')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  orderType === 'delivery'
                    ? 'bg-[#E25822] text-white shadow-md'
                    : 'text-[#9E968B] hover:text-[#EDE8DF]'
                }`}
              >
                🛵 Delivery (25–35 min)
              </button>
              <button
                type="button"
                onClick={() => onSetOrderType('pickup')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  orderType === 'pickup'
                    ? 'bg-[#E25822] text-white shadow-md'
                    : 'text-[#9E968B] hover:text-[#EDE8DF]'
                }`}
              >
                🏃 Pickup (15 min)
              </button>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#menu"
              className="px-6 py-3.5 bg-[#E25822] hover:bg-[#C94A1A] text-white text-xs font-semibold rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Oven Menu</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={onOpenCustomBuilder}
              className="px-6 py-3.5 bg-[#1C1A17] hover:bg-[#28241F] text-[#EDE8DF] hover:text-white text-xs font-semibold rounded-xl border border-[#322D26] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#E25822]" />
              <span>Build Custom Pizza</span>
            </button>
          </div>

          {/* Adjacency Trust Proof Markers */}
          <div className="pt-6 border-t border-[#231F1A] flex flex-wrap items-center gap-6 text-xs text-[#9E968B]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C67D28]" />
              <span>48h Slow Fermentation</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#C67D28]" />
              <span>San Marzano D.O.P.</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#E25822]" />
              <span>900°F Oak Wood Stone</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Showcase */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden border border-[#302B24] bg-[#161412] shadow-2xl group">
            <img
              src={heroImg}
              alt="Artisan Neapolitan wood-fired pizza with bubbling buffalo mozzarella and blistered crust"
              referrerPolicy="no-referrer"
              className="w-full h-[360px] sm:h-[440px] object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-transparent to-black/20" />

            {/* Floating Tag */}
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#181613]/90 backdrop-blur-md border border-[#2D2821] flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white">Margherita Verace D.O.P.</div>
                <div className="text-[11px] text-[#9E968B]">Buffalo Mozzarella · San Marzano · Fresh Basil</div>
              </div>
              <div className="font-mono tabular-nums text-sm font-bold text-[#E25822]">
                $16.50
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
