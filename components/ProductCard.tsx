
import React, { useState } from 'react';
import { Product, Category } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const isVeg = product.category === Category.VEGETABLES;
  
  const handleAddClick = () => {
    setIsAnimating(true);
    onAddToCart(product);
    // Reset animation state after it completes
    setTimeout(() => setIsAnimating(false), 800);
  };
  
  return (
    <div className="product-card bg-white rounded-[2rem] shadow-2xl border border-white/10 overflow-hidden group relative">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {isVeg && product.freshness && (
          <span className="absolute top-4 right-4 bg-[#253900] text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/20">
            {product.freshness}
          </span>
        )}
        {!isVeg && (
          <span className="absolute top-4 right-4 bg-[#452829] text-[#F5EED7] text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/10">
            مواد مختارة
          </span>
        )}
      </div>
      
      <div className="p-6 bg-white">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-[9px] px-2.5 py-1 rounded-lg font-black uppercase tracking-widest ${
            isVeg 
              ? 'bg-[#253900]/10 text-[#253900]' 
              : 'bg-[#F5EED7] text-[#452829]'
          }`}>
            {product.category}
          </span>
        </div>
        
        <h3 className="font-bold text-slate-800 text-lg mb-4 line-clamp-1">{product.name}</h3>
        
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 relative">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-bold">السعر</span>
            <span className={`font-black text-xl ${isVeg ? 'text-[#253900]' : 'text-[#452829]'}`}>
              {product.price.toLocaleString()} <span className="text-xs font-normal">ريال</span>
            </span>
          </div>
          
          <div className="relative">
            {/* Flying Feedback Icon */}
            {isAnimating && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none z-20 animate-fly-cart">
                <div className={`p-2 rounded-full shadow-xl ${isVeg ? 'bg-[#253900]' : 'bg-[#452829]'} text-white`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </div>
            )}

            <button 
              onClick={handleAddClick}
              className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 shadow-lg active:scale-75 ${
                isAnimating 
                  ? 'bg-emerald-500 text-white scale-110' 
                  : isVeg 
                    ? 'bg-[#253900] text-white hover:bg-[#3d5a00] shadow-[#253900]/20 hover:shadow-[#253900]/40' 
                    : 'bg-[#452829] text-[#F5EED7] hover:bg-[#5d3a3b] shadow-[#452829]/20 hover:shadow-[#452829]/40'
              }`}
              title="إضافة للسلة"
            >
              {isAnimating ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
