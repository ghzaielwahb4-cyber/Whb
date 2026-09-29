import React from 'react';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0D0C0B] border-t border-[#231F1A] text-[#9E968B] py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Brand Column */}
        <div className="space-y-3">
          <div className="font-display font-bold text-xl text-white">Forno & Fuoco</div>
          <p className="text-xs leading-relaxed max-w-xs">
            Artisanal Neapolitan sourdough pizzeria. Fermented 48 hours, stone-baked at 900°F over seasoned oak logs.
          </p>
          <div className="text-[11px] text-[#C67D28]">
            Associazione Verace Pizza Napoletana certified standard.
          </div>
        </div>

        {/* Location & Hours */}
        <div className="space-y-3 text-xs">
          <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
            Hearth & Hearth Hours
          </div>
          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-[#E25822] mt-0.5 shrink-0" />
            <div>
              <p className="text-[#EDE8DF]">Mon – Thu: 11:30 AM – 10:00 PM</p>
              <p className="text-[#EDE8DF]">Fri – Sat: 11:30 AM – 11:00 PM</p>
              <p className="text-[#EDE8DF]">Sun: 12:00 PM – 9:30 PM</p>
            </div>
          </div>
        </div>

        {/* Pizzeria Contact */}
        <div className="space-y-3 text-xs">
          <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
            Flagship Kitchen
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-[#E25822] mt-0.5 shrink-0" />
            <div>
              <p className="text-[#EDE8DF]">12 Via Forno, Artisan Quarter</p>
              <p className="text-[#9E968B]">Napoli & New York District</p>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <Phone className="w-4 h-4 text-[#E25822] shrink-0" />
            <span className="text-[#EDE8DF] font-mono tabular-nums">+1 (555) 367-6694</span>
          </div>
        </div>

        {/* Dietary Transparency */}
        <div className="space-y-3 text-xs">
          <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
            Dietary Transparency
          </div>
          <p className="leading-relaxed">
            We offer certified gluten-free cauliflower crusts baked on dedicated stone sheets, dairy-free artisan cashew mozzarella, and Halal-certified poultry options.
          </p>
          <div className="text-[11px] text-[#7A7266]">
            Questions regarding allergens? Inquire directly with Chef Marco at the oven counter.
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-[#1C1916] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div>
          © {new Date().getFullYear()} Forno & Fuoco Artisanal Pizzeria. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <a href="#menu" className="hover:text-white transition-colors">Menu</a>
          <a href="#combos" className="hover:text-white transition-colors">Combos</a>
          <a href="#craft" className="hover:text-white transition-colors">Our Craft</a>
          <a href="#" className="hover:text-white transition-colors">Privacy & Terms</a>
        </div>
      </div>
    </footer>
  );
};
