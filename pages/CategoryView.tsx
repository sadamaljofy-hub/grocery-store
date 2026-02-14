
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import { Product, Category, CartItem } from '../types';
import { getProducts, trackProductView, trackAddToCart } from '../services/storage';

interface CategoryViewProps {
  category: Category;
}

const CategoryView: React.FC<CategoryViewProps> = ({ category }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const themes: Record<string, { bg: string, accent: string, text: string, gradient: string }> = {
    [Category.VEGETABLES]: {
      bg: "bg-[#0a1f0a]", 
      accent: "bg-green-600",
      text: "text-green-400",
      gradient: "from-green-500 to-emerald-900"
    },
    [Category.GROCERY]: {
      bg: "bg-[#1f1a0a]", 
      accent: "bg-amber-600",
      text: "text-amber-400",
      gradient: "from-amber-500 to-yellow-900"
    },
    [Category.SNACKS]: {
      bg: "bg-[#150a1f]", 
      accent: "bg-purple-600",
      text: "text-purple-400",
      gradient: "from-purple-500 to-indigo-900"
    },
    [Category.CANNED_DRINKS]: {
      bg: "bg-[#0a1e1f]", 
      accent: "bg-cyan-600",
      text: "text-cyan-400",
      gradient: "from-cyan-500 to-blue-900"
    }
  };

  const currentTheme = themes[category];

  useEffect(() => {
    const all = getProducts();
    setProducts(all.filter(p => p.category === category));
  }, [category]);

  const handleAddToCart = (product: Product) => {
    trackAddToCart(product.id);
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  return (
    <div className={`min-h-screen ${currentTheme.bg} text-white selection:bg-white/20 overflow-x-hidden`}>
      <Navbar cartCount={cartItems.reduce((a, b) => a + b.quantity, 0)} onCartToggle={() => setIsCartOpen(!isCartOpen)} />
      
      <header className={`relative py-16 md:py-24 text-center overflow-hidden px-4`}>
        <div className={`absolute inset-0 bg-gradient-to-b ${currentTheme.gradient} opacity-10`}></div>
        <div className="relative z-10">
          <Link to="/" className="inline-block mb-6 md:mb-8 text-[10px] md:text-xs font-black uppercase tracking-widest bg-white/5 px-6 py-2 rounded-full border border-white/10 hover:bg-white/10 transition-all">← العودة للرئيسية</Link>
          <h1 className="text-3xl md:text-6xl font-black mb-3 md:mb-4">{category}</h1>
          <p className={`font-bold ${currentTheme.text} opacity-80 uppercase tracking-widest text-[10px] md:text-sm`}>تصفح أجود المنتجات المختارة لك</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-32 md:py-40 opacity-20">
            <span className="text-6xl md:text-8xl block mb-6">🏜️</span>
            <p className="text-xl md:text-2xl font-black uppercase">قريباً في هذا القسم</p>
          </div>
        )}
      </main>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onUpdateQuantity={(id, delta) => setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item).filter(i => i.quantity > 0))}
        onClear={() => setCartItems([])}
      />
    </div>
  );
};

export default CategoryView;
