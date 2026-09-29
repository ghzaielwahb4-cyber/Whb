import React from 'react';
import { Flame, Clock, Award, Star, HeartHandshake } from 'lucide-react';
import heroImg from '../assets/images/pizza_hero_woodfired_1790512511305.jpg';

export const ArtisanStory: React.FC = () => {
  return (
    <section id="craft" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[#26221D] bg-[#100F0E]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-[#E25822] font-semibold">
            Our Pure Italian Heritage
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-2">
            The Alchemy of Wood, Flour & Fire
          </h2>
          <p className="text-sm text-[#9E968B] mt-3 leading-relaxed">
            We follow the strict disciplinary code of the Associazione Verace Pizza Napoletana. No short-cuts, no electric ovens, no compromises.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 rounded-2xl bg-[#161412] border border-[#27231E] relative flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#E25822]/15 border border-[#E25822]/30 flex items-center justify-center text-[#E25822] mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-semibold text-white mb-2">
                48-Hour Cold Fermentation
              </h3>
              <p className="text-xs text-[#9E968B] leading-relaxed">
                Our sourdough culture has been fed continuously since 1994. A slow, two-day maturation produces an impossibly light, easily digestible dough with deep complex aromas and an airy honeycomb rim.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#221F1B] text-[11px] text-[#C67D28] font-medium">
              Zero Artificial Leavening · 68% Hydration
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#161412] border border-[#27231E] relative flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#E25822]/15 border border-[#E25822]/30 flex items-center justify-center text-[#E25822] mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-semibold text-white mb-2">
                San Marzano D.O.P. & Fior di Latte
              </h3>
              <p className="text-xs text-[#9E968B] leading-relaxed">
                Directly imported from Campania farms rooted in mineral-rich volcanic ash from Mount Vesuvius. Hand-crushed to preserve natural sweetness and balanced acidity.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#221F1B] text-[11px] text-[#C67D28] font-medium">
              Protected Designation of Origin · Pure Buffalo Curd
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#161412] border border-[#27231E] relative flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#E25822]/15 border border-[#E25822]/30 flex items-center justify-center text-[#E25822] mb-6">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-semibold text-white mb-2">
                900°F Oak Wood-Fired Oven
              </h3>
              <p className="text-xs text-[#9E968B] leading-relaxed">
                Custom hand-built stone oven fueled exclusively by seasoned oak logs. Each pie bakes in precisely 90 seconds, flash-sealing bubbling cheeses and charring signature leopard spots.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#221F1B] text-[11px] text-[#C67D28] font-medium">
              90-Second Flash Bake · Hand-Turned Peels
            </div>
          </div>
        </div>

        {/* Feature Split Banner */}
        <div className="rounded-2xl overflow-hidden border border-[#2B2721] bg-[#161412] grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[320px] lg:min-h-[420px]">
            <img
              src={heroImg}
              alt="Artisan oven master baking Neapolitan pizza"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#161412]/80 hidden lg:block" />
          </div>

          <div className="p-8 sm:p-12 flex flex-col justify-center">
            <span className="text-xs uppercase tracking-widest text-[#E25822] font-semibold">
              The Pizzaiolo Promise
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-2">
              Hot Crust Guarantee
            </h3>
            <p className="text-xs sm:text-sm text-[#9E968B] mt-3 leading-relaxed">
              Every pizza leaves our stone ovens in custom micro-vented corrugated cartons designed to vent steam while retaining blistering 160°F core heat. If your pizza does not arrive sizzling hot, we replace it instantly.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-[#25211C]">
              <div>
                <div className="font-mono text-2xl font-bold text-white tabular-nums">48h</div>
                <div className="text-xs text-[#9E968B] mt-0.5">Sourdough Cold Rise</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-bold text-[#E25822] tabular-nums">900°</div>
                <div className="text-xs text-[#9E968B] mt-0.5">Stone Hearth Temperature</div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-[#E25822] font-semibold">
              Verified Patron Praise
            </span>
            <h3 className="text-2xl font-display font-bold text-white mt-1">
              Loved by Foodies & True Neapolitans
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  'The Diavola with the spicy hot honey drizzle is perfection. You can taste the 48-hour slow fermented dough—light as air with gorgeous leopard char.',
                author: 'Elena Moretti',
                role: 'Culinary Editor, Roma Gastronomica',
                rating: 5,
              },
              {
                quote:
                  'The Custom Pizza Builder let me do half Truffle Crema with Porcini and half spicy Pepperoni. Arrived steaming hot in 28 minutes flat.',
                author: 'Julian Vance',
                role: 'Neighborhood Regular',
                rating: 5,
              },
              {
                quote:
                  'Real San Marzano tomatoes make all the difference. No sugary tomato paste slop—just pure, bright, savory volcanic bliss.',
                author: 'Chef Alessandro Rossi',
                role: 'Certified Pizzaiolo Verace',
                rating: 5,
              },
            ].map((t, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-[#161412] border border-[#27231E] flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 text-amber-400 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-[#EDE8DF] leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#221F1B]">
                  <div className="text-xs font-semibold text-white">{t.author}</div>
                  <div className="text-[11px] text-[#9E968B]">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
