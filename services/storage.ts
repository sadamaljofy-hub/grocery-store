
import { Product, Order, Stats, Category, ProductAnalytics } from '../types';
import { INITIAL_PRODUCTS, ADMIN_USERNAME_KEY, ADMIN_PASSWORD_KEY, WHATSAPP_NUMBER } from '../constants';

const PRODUCTS_KEY = 'bab_almandab_products';
const ORDERS_KEY = 'bab_almandab_orders';
const ANALYTICS_KEY = 'bab_almandab_analytics';
const WHATSAPP_KEY = 'bab_almandab_whatsapp';

export const getProducts = (): Product[] => {
  const stored = localStorage.getItem(PRODUCTS_KEY);
  if (!stored) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
  return JSON.parse(stored);
};

export const saveProducts = (products: Product[]) => {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

export const getOrders = (): Order[] => {
  const stored = localStorage.getItem(ORDERS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addOrder = (order: Order) => {
  const orders = getOrders();
  localStorage.setItem(ORDERS_KEY, JSON.stringify([...orders, order]));
};

export const getStats = (): Stats => {
  const orders = getOrders();
  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  return {
    totalSales,
    totalOrders: orders.length
  };
};

// WhatsApp Management
export const getStoredWhatsAppNumber = (): string => {
  return localStorage.getItem(WHATSAPP_KEY) || WHATSAPP_NUMBER;
};

export const saveWhatsAppNumber = (number: string) => {
  localStorage.setItem(WHATSAPP_KEY, number);
};

export const resetWhatsAppToDefault = () => {
  localStorage.removeItem(WHATSAPP_KEY);
  return WHATSAPP_NUMBER;
};

// Admin Credentials Management
export const saveAdminCredentials = (username: string, password: string) => {
  localStorage.setItem(ADMIN_USERNAME_KEY, username);
  localStorage.setItem(ADMIN_PASSWORD_KEY, password);
};

// Analytics Functions
const getAnalyticsData = (): Record<string, { views: number; additions: number }> => {
  const stored = localStorage.getItem(ANALYTICS_KEY);
  return stored ? JSON.parse(stored) : {};
};

export const trackProductView = (productId: string) => {
  const data = getAnalyticsData();
  if (!data[productId]) data[productId] = { views: 0, additions: 0 };
  data[productId].views += 1;
  localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
};

export const trackAddToCart = (productId: string) => {
  const data = getAnalyticsData();
  if (!data[productId]) data[productId] = { views: 0, additions: 0 };
  data[productId].additions += 1;
  localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
};

export const getFullAnalytics = (): ProductAnalytics[] => {
  const products = getProducts();
  const data = getAnalyticsData();
  return products.map(p => ({
    productId: p.id,
    name: p.name,
    views: data[p.id]?.views || 0,
    additions: data[p.id]?.additions || 0
  })).sort((a, b) => b.views - a.views);
};

export const initializeAdmin = () => {
  if (!localStorage.getItem(ADMIN_USERNAME_KEY)) {
    localStorage.setItem(ADMIN_USERNAME_KEY, 'admin');
  }
  const currentPass = localStorage.getItem(ADMIN_PASSWORD_KEY);
  if (!currentPass || currentPass === '123' || currentPass === '1234') {
    localStorage.setItem(ADMIN_PASSWORD_KEY, '2003');
  }
};

// وظائف النسخ الاحتياطي
export const exportDatabase = () => {
  const data = {
    products: getProducts(),
    orders: getOrders(),
    analytics: getAnalyticsData(),
    whatsapp: getStoredWhatsAppNumber(),
    username: localStorage.getItem(ADMIN_USERNAME_KEY),
    password: localStorage.getItem(ADMIN_PASSWORD_KEY),
    exportDate: new Date().toISOString()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `bab_almandab_backup_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export const importDatabase = (jsonString: string): boolean => {
  try {
    const data = JSON.parse(jsonString);
    if (data.products) localStorage.setItem(PRODUCTS_KEY, JSON.stringify(data.products));
    if (data.orders) localStorage.setItem(ORDERS_KEY, JSON.stringify(data.orders));
    if (data.analytics) localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data.analytics));
    if (data.whatsapp) localStorage.setItem(WHATSAPP_KEY, data.whatsapp);
    if (data.username) localStorage.setItem(ADMIN_USERNAME_KEY, data.username);
    if (data.password) localStorage.setItem(ADMIN_PASSWORD_KEY, data.password);
    return true;
  } catch (e) {
    console.error("Failed to import database", e);
    return false;
  }
};
