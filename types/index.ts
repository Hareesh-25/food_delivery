export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  isPopular?: boolean;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  allergens?: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  options?: MenuItemOption[];
}

export interface MenuItemOption {
  id: string;
  name: string;
  choices: {
    id: string;
    name: string;
    price: number;
  }[];
  required: boolean;
  multiSelect: boolean;
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  selectedOptions: {
    optionId: string;
    choiceIds: string[];
  }[];
  specialInstructions?: string;
  totalPrice: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'in-delivery' | 'delivered' | 'cancelled';
  orderType: 'delivery' | 'pickup';
  deliveryAddress?: DeliveryAddress;
  deliveryTime?: string;
  paymentMethod: string;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  tip: number;
  total: number;
  createdAt: string;
  estimatedDeliveryTime?: string;
}

export interface DeliveryAddress {
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  instructions?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  savedAddresses: DeliveryAddress[];
  favoriteItems: string[];
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  code: string;
  validUntil: string;
}