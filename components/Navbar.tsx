
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  cartCount: number;
  onCartToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartToggle }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 border-b border-white/5 ${isHome ? 'bg-[#0a192f]/80' : 'bg-black/40'} backdrop-blur-2xl px-6 py-4 md:px-12`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 group">
          <div className="bg-blue-600 p-2.5 rounded-2xl shadow-xl shadow-blue-900/40 group-hover:rotate-12 transition-transform">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="flex flex-col">
             <span className="text-xl md:text-2xl font-black text-white tracking-tighter leading-none">باب المندب</span>
             <span className="text-[8px] font-bold text-blue-400 uppercase tracking-widest">للجودة عنوان</span>
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden lg:flex items-center gap-6">
            <Link to="/shop/vegetables" className="text-xs font-black text-slate-400 hover:text-green-400 transition-colors">الخضروات</Link>
            <Link to="/shop/grocery" className="text-xs font-black text-slate-400 hover:text-amber-400 transition-colors">التموين</Link>
            <Link to="/shop/snacks" className="text-xs font-black text-slate-400 hover:text-purple-400 transition-colors">المقرمشات</Link>
            <Link to="/shop/canned" className="text-xs font-black text-slate-400 hover:text-cyan-400 transition-colors">المعلبات</Link>
          </div>

          <div className="h-6 w-px bg-white/10 hidden md:block"></div>

          <Link to="/guide" className="text-[10px] font-black text-blue-400 hover:text-white transition-all uppercase tracking-widest bg-blue-500/10 px-4 py-2 rounded-xl border border-blue-500/20">
            كيفية الطلب
          </Link>
          
          <button 
            onClick={onCartToggle}
            className="relative p-3 text-white bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/5"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full shadow-xl border-2 border-[#0a192f] animate-pop-in">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
