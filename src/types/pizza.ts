export type PizzaSize = 'personal' | 'regular' | 'family';

export interface SizeOption {
  id: PizzaSize;
  name: string;
  inches: number;
  slices: number;
  multiplier: number;
  serves: string;
}

export type CrustType = 'neapolitan' | 'roman-crispy' | 'stuffed-garlic' | 'gluten-free';

export interface CrustOption {
  id: CrustType;
  name: string;
  description: string;
  extraPrice: number;
}

export type SauceType = 'san-marzano' | 'bianca-garlic' | 'truffle-crema' | 'spicy-diavola' | 'basil-pesto';

export interface SauceOption {
  id: SauceType;
  name: string;
  color: string;
  extraPrice: number;
}

export type CheeseType = 'fior-di-latte' | 'buffalo-mozzarella' | 'gorgonzola' | 'smoked-provolone' | 'vegan-mozzarella';

export interface CheeseOption {
  id: CheeseType;
  name: string;
  color: string;
  extraPrice: number;
}

export interface ToppingItem {
  id: string;
  name: string;
  category: 'meat' | 'veg' | 'finish';
  price: number;
  isSpicy?: boolean;
  isVegetarian?: boolean;
  color: string;
}

export type MenuCategory = 'all' | 'classics' | 'bianche' | 'specialty' | 'calzones' | 'drinks-sweets';

export interface PizzaProduct {
  id: string;
  name: string;
  italianName: string;
  description: string;
  basePrice: number;
  image: string;
  category: 'classics' | 'bianche' | 'specialty' | 'calzones' | 'drinks-sweets';
  ingredients: string[];
  recommendedCrust: CrustType;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  tag?: string; // single quiet text tag e.g. "Chef's Signature"
  calories?: number;
}

export interface CustomToppingsConfig {
  whole: string[];
  leftHalf: string[];
  rightHalf: string[];
}

export interface CartItem {
  cartItemId: string;
  product: PizzaProduct;
  size: PizzaSize;
  crust: CrustType;
  sauce?: SauceType;
  cheese?: CheeseType;
  customToppings?: CustomToppingsConfig;
  specialInstructions?: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export type OrderStatus = 'received' | 'kneading' | 'wood-fired' | 'boxed' | 'en-route' | 'delivered';

export interface OrderCustomerInfo {
  name: string;
  phone: string;
  address: string;
  apartment?: string;
  notes?: string;
  paymentMethod: 'card' | 'apple-pay' | 'cash';
}

export interface OrderRecord {
  orderId: string;
  createdAt: number;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  appliedCoupon?: string;
  tip: number;
  total: number;
  orderType: 'delivery' | 'pickup';
  estimatedMinutes: number;
  status: OrderStatus;
  statusUpdatedAt: number;
  customer: OrderCustomerInfo;
}
