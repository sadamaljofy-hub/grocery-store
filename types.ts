
export enum Category {
  GROCERY = 'مواد غذائية',
  VEGETABLES = 'خضروات',
  SNACKS = 'مقرمشات وحلويات',
  CANNED_DRINKS = 'معلبات ومشروبات'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: Category;
  freshness?: string; // Only for vegetables
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  location: string;
  items: CartItem[];
  total: number;
  date: string;
  paymentMethod: string;
}

export interface Stats {
  totalSales: number;
  totalOrders: number;
}

export interface ProductAnalytics {
  productId: string;
  name: string;
  views: number;
  additions: number;
}
