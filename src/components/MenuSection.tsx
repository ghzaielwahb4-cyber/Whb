import React, { useState, useMemo } from 'react';
import { PizzaProduct, MenuCategory, CartItem } from '../types/pizza';
import { PIZZA_CATALOG } from '../data/menu';
import { Search, Flame, Leaf, Plus, Sparkles, SlidersHorizontal } from 'lucide-react';

interface MenuSectionProps {
  onSelectProduct: (product: PizzaProduct) => void;
  onQuickAdd: (product: PizzaProduct) => void;
  onOpenCustomBuilder: () => void;
}

const CATEGORIES: { id: MenuCategory; label: string }[] = [
  { id: 'all', label: 'All Creations' },
  { id: 'classics', label: 'Classics & Rosso' },
  { id: 'bianche', label: 'Bianche (White)' },
  { id: 'specialty', label: 'Chef Reserve' },
  { id: 'calzones', label: 'Folded Calzones' },
  { id: 'drinks-sweets', label: 'Starters & Dolci' },
];

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectProduct,
  onQuickAdd,
  onOpenCustomBuilder,
}) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyVegetarian, setOnlyVegetarian] = useState(false);
  const [onlySpicy, setOnlySpicy] = useState(false);

  // Filtered menu list
  const filteredProducts = useMemo(() => {
    return PIZZA_CATALOG.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Dietary filter
      if (onlyVegetarian && !item.isVegetarian) return false;
      if (onlySpicy && !item.isSpicy) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchItalian = item.italianName.toLowerCase().includes(q);
        const matchIng = item.ingredients.some((ing) => ing.toLowerCase().includes(q));
        if (!matchName && !matchItalian && !matchIng) return false;
      }

      return true;
    });
  }, [activeCategory, searchQuery, onlyVegetarian, onlySpicy]);

  return (
    <section id="menu" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#E25822] font-semibold">
            Handmade To Order
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-1">
            Wood-Fired Pizza Menu
          </h2>
          <p className="text-xs sm:text-sm text-[#9E968B] mt-1.5">
            Every pie is stretched by hand, topped with fresh Italian ingredients, and stone-baked.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#9E968B] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search toppings, pizzas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#191714] border border-[#2B2721] rounded-xl text-[#EDE8DF] placeholder-[#6B6358] focus:outline-none focus:border-[#E25822]"
          />
        </div>
      </div>

      {/* Filter Tabs & Dietary Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#25211C]">
        {/* Categories (Functional Segmented Buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#E25822] text-white shadow-sm'
                  : 'bg-[#181614] text-[#9E968B] hover:text-[#EDE8DF] border border-[#27231E]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dietary Filters */}
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setOnlyVegetarian((v) => !v)}
            className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-colors cursor-pointer ${
              onlyVegetarian
                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                : 'border-[#27231E] bg-[#181614] text-[#9E968B] hover:text-[#EDE8DF]'
            }`}
          >
            <Leaf className="w-3.5 h-3.5" />
            <span>Vegetarian</span>
          </button>

          <button
            type="button"
            onClick={() => setOnlySpicy((s) => !s)}
            className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-colors cursor-pointer ${
              onlySpicy
                ? 'border-red-500/50 bg-red-500/10 text-red-400'
                : 'border-[#27231E] bg-[#181614] text-[#9E968B] hover:text-[#EDE8DF]'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Spicy</span>
          </button>
        </div>
      </div>

      {/* Product Grid (3-column desktop baseline) */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center space-y-3 bg-[#161412] rounded-2xl border border-[#27231E]">
          <h3 className="font-display font-semibold text-lg text-white">No pizzas match your filters</h3>
          <p className="text-xs text-[#9E968B] max-w-sm mx-auto">
            Try resetting your dietary search or design your own custom pie with any ingredients you desire.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
              setOnlyVegetarian(false);
              setOnlySpicy(false);
            }}
            className="px-4 py-2 bg-[#26221D] hover:bg-[#342E27] text-xs font-medium text-white rounded-lg transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-[#181613] rounded-2xl border border-[#29241E] overflow-hidden flex flex-col justify-between hover:border-[#3D362D] hover:-translate-y-0.5 transition-all duration-300 shadow-lg"
            >
              {/* Product Visual Container (takes 65-70% visual focus) */}
              <div
                onClick={() => onSelectProduct(product)}
                className="relative h-56 overflow-hidden bg-[#121110] cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181613] via-transparent to-black/20" />

                {/* Subtle Single Tag */}
                {product.tag && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#121110]/85 backdrop-blur-md rounded text-[11px] font-medium text-[#C67D28] border border-[#2C2720]">
                    {product.tag}
                  </div>
                )}

                {/* Dietary icons in top right */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  {product.isVegetarian && (
                    <span
                      title="Vegetarian"
                      className="p-1 bg-[#121110]/80 rounded text-emerald-400 border border-[#2C2720]"
                    >
                      <Leaf className="w-3.5 h-3.5" />
                    </span>
                  )}
                  {product.isSpicy && (
                    <span
                      title="Spicy"
                      className="p-1 bg-[#121110]/80 rounded text-red-400 border border-[#2C2720]"
                    >
                      <Flame className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#9E968B] font-semibold mb-1">
                    {product.italianName}
                  </div>
                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="font-display font-semibold text-lg text-white group-hover:text-[#E25822] transition-colors cursor-pointer"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#9E968B] mt-1.5 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Ingredients snippet */}
                <div className="text-[11px] text-[#7A7266] truncate">
                  {product.ingredients.slice(0, 3).join(' · ')}
                </div>

                {/* Price Baseline & Action Controls */}
                <div className="pt-3 border-t border-[#26221D] flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-[#9E968B] block">From (10")</span>
                    <span className="font-mono tabular-nums text-base font-bold text-white">
                      ${product.basePrice.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="px-3 py-1.5 text-xs text-[#EDE8DF] hover:text-white bg-[#221F1B] hover:bg-[#2C2722] border border-[#2F2922] rounded-lg transition-colors cursor-pointer"
                    >
                      Customize
                    </button>
                    <button
                      type="button"
                      onClick={() => onQuickAdd(product)}
                      className="p-2 bg-[#E25822] hover:bg-[#C94A1A] text-white rounded-lg transition-colors shadow cursor-pointer"
                      title="Quick add classic 12 inch"
                      aria-label={`Add ${product.name} to order`}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Custom Pizza Builder Banner inside Menu */}
      <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#201B16] via-[#1A1714] to-[#161412] border border-[#352D24] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs font-semibold text-[#E25822] uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Oven Studio</span>
          </div>
          <h3 className="text-2xl font-display font-bold text-white">
            Want to Design Your Own Masterpiece?
          </h3>
          <p className="text-xs text-[#9E968B] max-w-lg">
            Choose your artisan dough, specialty base sauces, four distinct cheeses, and split half-and-half toppings on our live visual pizza canvas.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenCustomBuilder}
          className="px-6 py-3 bg-[#E25822] hover:bg-[#C94A1A] text-white text-xs font-semibold rounded-xl shadow-lg transition-all whitespace-nowrap cursor-pointer shrink-0"
        >
          Launch Pizza Crafter
        </button>
      </div>
    </section>
  );
};
