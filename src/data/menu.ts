import {
  CrustOption,
  SizeOption,
  SauceOption,
  CheeseOption,
  ToppingItem,
  PizzaProduct,
} from '../types/pizza';

// Static image imports for bundling
import margheritaImg from '../assets/images/pizza_margherita_artisan_1790512523345.jpg';
import diavolaImg from '../assets/images/pizza_diavola_pepperoni_1790512535044.jpg';
import truffleImg from '../assets/images/pizza_truffle_mushroom_1790512545845.jpg';
import quattroImg from '../assets/images/pizza_quattro_formaggi_1790512559582.jpg';
import heroImg from '../assets/images/pizza_hero_woodfired_1790512511305.jpg';

export { heroImg };

export const PIZZA_SIZES: SizeOption[] = [
  {
    id: 'personal',
    name: 'Personal (10")',
    inches: 10,
    slices: 6,
    multiplier: 1.0,
    serves: '1 person',
  },
  {
    id: 'regular',
    name: 'Classic (12")',
    inches: 12,
    slices: 8,
    multiplier: 1.35,
    serves: '2 people',
  },
  {
    id: 'family',
    name: 'Grandioso (16")',
    inches: 16,
    slices: 12,
    multiplier: 1.85,
    serves: '3–4 people',
  },
];

export const CRUST_OPTIONS: CrustOption[] = [
  {
    id: 'neapolitan',
    name: 'Artisan Neapolitan Sourdough',
    description: '48-hour cold fermented, blistered airy cornicione, charred leopard spots.',
    extraPrice: 0,
  },
  {
    id: 'roman-crispy',
    name: 'Roman Tonda Crisp',
    description: 'Ultra-thin, golden and crisp with stone-milled semolina.',
    extraPrice: 1.0,
  },
  {
    id: 'stuffed-garlic',
    name: 'Garlic Butter Stuffed Crust',
    description: 'Folded edge stuffed with molten mozzarella & roasted garlic herb butter.',
    extraPrice: 3.5,
  },
  {
    id: 'gluten-free',
    name: 'Heritage Cauliflower & Rice (GF)',
    description: 'Certified gluten-safe recipe, crisp base with roasted nutty undertones.',
    extraPrice: 3.0,
  },
];

export const SAUCE_OPTIONS: SauceOption[] = [
  {
    id: 'san-marzano',
    name: 'San Marzano D.O.P. Crushed Sauce',
    color: '#B91C1C',
    extraPrice: 0,
  },
  {
    id: 'bianca-garlic',
    name: 'Whipped Ricotta & Confit Garlic Crema',
    color: '#FEF3C7',
    extraPrice: 0.5,
  },
  {
    id: 'truffle-crema',
    name: 'Black Truffle & Porcini Velouté',
    color: '#78716C',
    extraPrice: 2.0,
  },
  {
    id: 'spicy-diavola',
    name: 'Diavola Arrabbiata & Calabrian Chili',
    color: '#991B1B',
    extraPrice: 0.5,
  },
  {
    id: 'basil-pesto',
    name: 'Genovese Pine Nut Basil Pesto',
    color: '#15803D',
    extraPrice: 1.5,
  },
];

export const CHEESE_OPTIONS: CheeseOption[] = [
  {
    id: 'fior-di-latte',
    name: 'Fresh Fior di Latte Mozzarella',
    color: '#FFFBEB',
    extraPrice: 0,
  },
  {
    id: 'buffalo-mozzarella',
    name: 'Campania Buffalo Mozzarella D.O.P.',
    color: '#FEF9C3',
    extraPrice: 2.5,
  },
  {
    id: 'gorgonzola',
    name: 'Creamy Gorgonzola Dolce',
    color: '#D1D5DB',
    extraPrice: 2.0,
  },
  {
    id: 'smoked-provolone',
    name: 'Wood-Smoked Scamorza',
    color: '#FDE68A',
    extraPrice: 1.5,
  },
  {
    id: 'vegan-mozzarella',
    name: 'Artisan Cashew Milk Mozzarella',
    color: '#F3F4F6',
    extraPrice: 2.0,
  },
];

export const AVAILABLE_TOPPINGS: ToppingItem[] = [
  // Meats
  { id: 'pepperoni', name: 'Cupping Spicy Pepperoni', category: 'meat', price: 2.5, isSpicy: true, color: '#B91C1C' },
  { id: 'prosciutto', name: 'Prosciutto di Parma 24-Month', category: 'meat', price: 3.5, color: '#DC2626' },
  { id: 'nduja', name: 'Spicy Calabrian Nduja', category: 'meat', price: 3.0, isSpicy: true, color: '#991B1B' },
  { id: 'pancetta', name: 'Wood-Smoked Italian Pancetta', category: 'meat', price: 2.5, color: '#EA580C' },
  { id: 'sausage', name: 'Fennel & Rosemary Tuscan Sausage', category: 'meat', price: 2.5, color: '#C2410C' },
  { id: 'chicken', name: 'Charred Herb Roasted Chicken', category: 'meat', price: 2.5, color: '#D97706' },

  // Vegetables
  { id: 'wild-mushrooms', name: 'Sautéed Porcini & Chanterelles', category: 'veg', price: 2.5, isVegetarian: true, color: '#78716C' },
  { id: 'roasted-peppers', name: 'Fire-Roasted Sweet Peppers', category: 'veg', price: 1.5, isVegetarian: true, color: '#EA580C' },
  { id: 'caramelized-onions', name: 'Balsamic Caramelized Onions', category: 'veg', price: 1.5, isVegetarian: true, color: '#9A3412' },
  { id: 'kalamata-olives', name: 'Sicilian Kalamata Olives', category: 'veg', price: 1.5, isVegetarian: true, color: '#1C1917' },
  { id: 'artichokes', name: 'Marinated Roman Artichokes', category: 'veg', price: 2.0, isVegetarian: true, color: '#65A30D' },
  { id: 'cherry-tomatoes', name: 'Vesuvio Sun-Blushed Tomatoes', category: 'veg', price: 1.5, isVegetarian: true, color: '#EF4444' },
  { id: 'fresh-arugula', name: 'Organic Baby Wild Arugula', category: 'veg', price: 1.5, isVegetarian: true, color: '#16A34A' },
  { id: 'fresh-basil', name: 'Hand-Torn Neapolitan Basil', category: 'veg', price: 1.0, isVegetarian: true, color: '#15803D' },

  // Finishes
  { id: 'hot-honey', name: 'Calabrian Chili Infused Hot Honey', category: 'finish', price: 1.5, isSpicy: true, isVegetarian: true, color: '#F59E0B' },
  { id: 'truffle-oil', name: 'White Alba Truffle Infused EVOO', category: 'finish', price: 2.5, isVegetarian: true, color: '#D97706' },
  { id: 'parmigiano', name: 'Aged 36-Month Parmigiano Reggiano', category: 'finish', price: 2.0, isVegetarian: true, color: '#FEF08A' },
  { id: 'balsamic-glaze', name: 'Modena Aged Balsamic Glaze', category: 'finish', price: 1.5, isVegetarian: true, color: '#451A03' },
];

export const PIZZA_CATALOG: PizzaProduct[] = [
  {
    id: 'pizza-margherita',
    name: 'Margherita Verace D.O.P.',
    italianName: 'La Vera Napoletana',
    description: 'Crushed volcanic San Marzano tomatoes, fresh Campania buffalo mozzarella, fragrant Genovese basil, sea salt, and cold-pressed extra virgin olive oil.',
    basePrice: 16.5,
    image: margheritaImg,
    category: 'classics',
    ingredients: ['San Marzano D.O.P.', 'Buffalo Mozzarella', 'Fresh Basil', 'Cold-Pressed EVOO', 'Sea Salt'],
    recommendedCrust: 'neapolitan',
    isVegetarian: true,
    tag: 'Gold Standard',
    calories: 780,
  },
  {
    id: 'pizza-diavola',
    name: 'Diavola & Miele Piccante',
    italianName: 'Spicy Artisanal Salami',
    description: 'Crispy cupping pepperoni, spicy Calabrian nduja, golden fior di latte mozzarella, crushed red chili flakes, and a rich organic hot chili honey drizzle.',
    basePrice: 19.5,
    image: diavolaImg,
    category: 'classics',
    ingredients: ['San Marzano Sauce', 'Cupping Pepperoni', 'Calabrian Nduja', 'Fior di Latte', 'Hot Honey Drizzle'],
    recommendedCrust: 'neapolitan',
    isSpicy: true,
    tag: 'Most Loved',
    calories: 940,
  },
  {
    id: 'pizza-tartufo',
    name: 'Tartufo & Funghi Selvatici',
    italianName: 'Wild Mushroom Bianca',
    description: 'Whipped confit garlic ricotta, pan-roasted porcini and chanterelles, black truffle velouté, fresh thyme sprigs, and shaved 36-month Parmigiano-Reggiano.',
    basePrice: 22.0,
    image: truffleImg,
    category: 'bianche',
    ingredients: ['Whipped Garlic Ricotta', 'Wild Porcini & Chanterelles', 'Black Truffle Crema', 'Fresh Thyme', 'Aged Parmigiano'],
    recommendedCrust: 'roman-crispy',
    isVegetarian: true,
    tag: 'Chef Signature',
    calories: 860,
  },
  {
    id: 'pizza-quattro-formaggi',
    name: 'Quattro Formaggi Al Forno',
    italianName: 'Four Artisanal Cheeses',
    description: 'Bubbling golden fior di latte, aged Gorgonzola Dolce, smoked provolone scamorza, and delicate Parmigiano-Reggiano with cracked black peppercorn.',
    basePrice: 19.0,
    image: quattroImg,
    category: 'bianche',
    ingredients: ['Fior di Latte', 'Gorgonzola Dolce', 'Smoked Scamorza', 'Parmigiano-Reggiano', 'Rosemary Oil'],
    recommendedCrust: 'neapolitan',
    isVegetarian: true,
    tag: 'Rich & Creamy',
    calories: 920,
  },
  {
    id: 'pizza-prosciutto-burrata',
    name: 'Burrata Pugliese & Prosciutto',
    italianName: 'Parma & Wild Arugula',
    description: 'Slow-simmered tomato base finished after oven with 24-month Prosciutto di Parma, whole molten burrata pouch, wild baby arugula, and aged balsamic droplets.',
    basePrice: 23.5,
    image: margheritaImg, // fallback high fidelity
    category: 'specialty',
    ingredients: ['San Marzano Sauce', '24-Mo Prosciutto di Parma', 'Whole Burrata Ball', 'Wild Arugula', 'Modena Balsamic'],
    recommendedCrust: 'neapolitan',
    tag: 'Gourmet Reserve',
    calories: 890,
  },
  {
    id: 'pizza-capricciosa',
    name: 'Capricciosa del Fornaio',
    italianName: 'Artisan Four Seasons',
    description: 'San Marzano tomatoes, tender artichoke hearts, roasted field mushrooms, smoked Italian prosciutto cotto, kalamata olives, and fresh mozzarella.',
    basePrice: 20.5,
    image: diavolaImg,
    category: 'classics',
    ingredients: ['San Marzano Sauce', 'Roasted Mushrooms', 'Artichoke Hearts', 'Prosciutto Cotto', 'Kalamata Olives'],
    recommendedCrust: 'neapolitan',
    calories: 880,
  },
  {
    id: 'pizza-pesto-genovese',
    name: 'Pesto Rustico & Stracciatella',
    italianName: 'Green Basil & Heirloom',
    description: 'Genovese pine nut basil pesto base, fresh stracciatella cheese, slow-roasted cherry tomatoes, toasted pine nuts, and freshly cracked black pepper.',
    basePrice: 20.0,
    image: truffleImg,
    category: 'bianche',
    ingredients: ['Basil Pesto Genovese', 'Fresh Stracciatella', 'Roasted Cherry Tomatoes', 'Toasted Pine Nuts'],
    recommendedCrust: 'roman-crispy',
    isVegetarian: true,
    calories: 840,
  },
  {
    id: 'calzone-vesuvio',
    name: 'Calzone Vesuviano Ripieno',
    italianName: 'Folded Stone Oven Pouch',
    description: 'Folded wood-fired sourdough crust stuffed with Napoli salami, creamy buffalo ricotta, melted fior di latte, and topped with San Marzano sauce kiss.',
    basePrice: 18.5,
    image: quattroImg,
    category: 'calzones',
    ingredients: ['Sourdough Pocket', 'Napoli Salami', 'Buffalo Ricotta', 'Fior di Latte', 'San Marzano Glaze'],
    recommendedCrust: 'neapolitan',
    tag: 'Stone Oven Stuffed',
    calories: 990,
  },
  {
    id: 'starter-garlic-knots',
    name: 'Wood-Fired Garlic & Herb Knots',
    italianName: 'Nodi all Aglio',
    description: 'Six hand-tied sourdough knots bathed in confit garlic herb butter, grated Pecorino Romano, served with warm San Marzano marinara dipping cup.',
    basePrice: 9.0,
    image: margheritaImg,
    category: 'drinks-sweets',
    ingredients: ['Fermented Dough', 'Confit Garlic Butter', 'Pecorino Romano', 'Fresh Parsley', 'Warm Marinara'],
    recommendedCrust: 'neapolitan',
    isVegetarian: true,
    tag: 'Must-Order Starter',
    calories: 450,
  },
  {
    id: 'sweet-tiramisu',
    name: 'Tiramisù Tradizionale al Mascarpone',
    italianName: 'Dolce Della Casa',
    description: 'Airy espresso-soaked Savoiardi ladyfingers, velvety whipped mascarpone crema, dusted with bittersweet Valrhona cocoa powder.',
    basePrice: 8.5,
    image: heroImg,
    category: 'drinks-sweets',
    ingredients: ['Savoiardi Biscuits', 'Italian Espresso', 'Mascarpone Cream', 'Valrhona Cocoa'],
    recommendedCrust: 'neapolitan',
    isVegetarian: true,
    tag: 'Artisan Dessert',
    calories: 410,
  },
];

export const COMBO_DEALS = [
  {
    id: 'combo-neapolitan-feast',
    name: 'The Neapolitan Feast',
    tagline: 'Best for 3–4 friends or family dinner',
    description: 'Any 2 Classic (12") or Specialty Pizzas + Wood-Fired Garlic Knots + 2 Artisan Italian Sodas.',
    originalPrice: 56.0,
    dealPrice: 44.0,
    saving: '$12 Saved',
    includedItems: ['2x 12" Handcrafted Pizzas', '1x Order of Garlic Herb Knots', '2x San Pellegrino Sodas'],
  },
  {
    id: 'combo-date-night',
    name: 'Date Night Forno & Vino',
    tagline: 'Gourmet romantic pairing',
    description: '1x Gourmet Tartufo Truffle Pizza + 1x Margherita D.O.P. + 2x Tiramisù Tradizionale.',
    originalPrice: 49.0,
    dealPrice: 39.5,
    saving: '$9.50 Saved',
    includedItems: ['1x Tartufo Truffle Pizza', '1x Margherita D.O.P.', '2x House Tiramisù'],
  },
  {
    id: 'combo-match-day',
    name: 'The Big Match Box',
    tagline: 'Game day crowd pleaser',
    description: '2x Grandioso (16") Pizzas (Diavola + Quattro Formaggi) + Double Garlic Knots + 4 Drinks.',
    originalPrice: 78.0,
    dealPrice: 62.0,
    saving: '$16 Saved',
    includedItems: ['2x 16" Grandioso Pies', '2x Garlic Herb Knots', '4x Italian Craft Beverages'],
  },
];
