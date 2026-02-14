
import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Product, Category, Stats, Order, ProductAnalytics } from '../types';
import { 
  getProducts, 
  saveProducts, 
  getStats, 
  getOrders, 
  getFullAnalytics, 
  getStoredWhatsAppNumber, 
  saveWhatsAppNumber, 
  saveAdminCredentials
} from '../services/storage';
import { ADMIN_USERNAME_KEY, ADMIN_PASSWORD_KEY } from '../constants';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<Stats>({ totalSales: 0, totalOrders: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [newWhatsApp, setNewWhatsApp] = useState(getStoredWhatsAppNumber());
  const [adminUsername, setAdminUsername] = useState(localStorage.getItem(ADMIN_USERNAME_KEY) || '');
  const [adminPassword, setAdminPassword] = useState(localStorage.getItem(ADMIN_PASSWORD_KEY) || '');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setProducts(getProducts());
    setStats(getStats());
    setOrders(getOrders().reverse()); // عرض الأحدث أولاً
  }, [location.pathname]);

  const handleSaveProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const productData: Product = {
      id: editingProduct?.id || Math.random().toString(36).substr(2, 9),
      name: formData.get('name') as string,
      price: Number(formData.get('price')),
      image: imagePreview || editingProduct?.image || '',
      category: formData.get('category') as Category,
    };
    
    const all = getProducts();
    const updated = editingProduct 
      ? all.map(p => p.id === editingProduct.id ? productData : p) 
      : [...all, productData];
      
    saveProducts(updated);
    setProducts(updated);
    setIsModalOpen(false);
    setEditingProduct(null);
    setImagePreview(null);
  };

  const handleDelete = () => {
    if (productToDelete) {
      const all = getProducts();
      const updated = all.filter(p => p.id !== productToDelete);
      saveProducts(updated);
      setProducts(updated);
      setIsDeleteConfirmOpen(false);
      setProductToDelete(null);
    }
  };

  const confirmLogout = () => {
    setIsLogoutConfirmOpen(false);
    navigate('/', { replace: true });
    setTimeout(() => {
      onLogout();
    }, 150);
  };

  const navItems = [
    { label: 'الإحصائيات', path: '/admin', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { label: 'قائمة الطلبات', path: '/admin/orders', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
    { label: 'إدارة المنتجات', path: '/admin/products', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { label: 'الإعدادات', path: '/admin/settings', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
  ];

  return (
    <div className="min-h-screen bg-[#1a0505] flex flex-col md:flex-row rtl text-white font-['Cairo'] relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#2D0000] to-[#1a0505]"></div>
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#c5a059] opacity-5 blur-[120px] rounded-full"></div>
      </div>

      {/* Overlay to close sidebar on mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[65] md:hidden" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      <aside className={`fixed inset-y-0 right-0 w-72 bg-[#2d0e0e]/95 backdrop-blur-2xl border-l border-[#c5a059]/10 flex flex-col z-[70] transition-transform duration-500 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} md:static md:translate-x-0 shadow-2xl`}>
        <div className="p-10 text-center border-b border-white/5">
          <div className="w-20 h-20 bg-gradient-to-br from-[#800020] to-[#b3002d] rounded-[2rem] flex items-center justify-center mx-auto mb-4 shadow-2xl border border-[#c5a059]/20">
            <span className="text-3xl font-black text-[#c5a059]">M</span>
          </div>
          <h2 className="text-xl font-black text-white">إدارة باب المندب</h2>
        </div>
        
        <nav className="flex-1 p-6 space-y-3">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all duration-300 ${
                location.pathname === item.path 
                  ? 'bg-[#c5a059] text-[#2d0e0e] shadow-xl' 
                  : 'text-white/40 hover:bg-white/5 hover:text-[#c5a059]'
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={item.icon} /></svg>
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-8 border-t border-white/5">
          <button 
            onClick={() => setIsLogoutConfirmOpen(true)} 
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-[#800020]/20 text-[#ff4d4d] font-black text-sm border border-[#800020]/30 hover:bg-rose-600 hover:text-white transition-all shadow-lg"
          >
            خروج للمتجر
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-0 relative z-10 p-6 md:p-12 overflow-y-auto no-scrollbar">
        <header className="md:hidden flex items-center justify-between mb-8 bg-white/5 p-5 rounded-3xl border border-white/10 backdrop-blur-md">
           <span className="text-xl font-black text-[#c5a059]">إدارة المتجر</span>
           <button onClick={() => setIsSidebarOpen(true)} className="p-3 bg-white/5 rounded-xl border border-white/10 text-[#c5a059]"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg></button>
        </header>

        <Routes>
          <Route path="/" element={
            <div className="space-y-12 animate-fade-in">
              <div className="bg-gradient-to-br from-[#c5a059]/10 to-transparent p-12 rounded-[3.5rem] border border-[#c5a059]/10 backdrop-blur-3xl shadow-2xl text-center md:text-right">
                <h1 className="text-4xl font-black mb-3 text-white">إحصائيات الأداء 📈</h1>
                <p className="text-[#c5a059]/70 font-bold text-lg">تحليل سريع لمبيعات وحركة متجر باب المندب.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { label: "إجمالي المبيعات", val: `${stats.totalSales.toLocaleString()} ريال`, icon: "💰", color: "from-emerald-500/20" },
                  { label: "عدد الطلبات الكلي", val: stats.totalOrders, icon: "📦", color: "from-blue-500/20" },
                  { label: "الأصناف المتوفرة", val: products.length, icon: "🏷️", color: "from-amber-500/20" }
                ].map((s, i) => (
                  <div key={i} className={`bg-gradient-to-br ${s.color} to-transparent backdrop-blur-xl p-10 rounded-[3rem] border border-white/5 shadow-xl`}>
                    <div className="text-3xl mb-4">{s.icon}</div>
                    <span className="text-white/40 text-[10px] uppercase font-black block mb-2">{s.label}</span>
                    <h3 className="text-4xl font-black text-white">{s.val}</h3>
                  </div>
                ))}
              </div>

              {/* تحليلات إضافية */}
              <div className="bg-[#2d0e0e]/40 p-10 rounded-[3rem] border border-white/5">
                <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#c5a059] rounded-full"></span>
                  الأصناف الأكثر رواجاً
                </h3>
                <div className="space-y-4">
                  {getFullAnalytics().slice(0, 5).map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                      <span className="font-bold text-slate-300">{item.name}</span>
                      <div className="flex gap-6">
                        <span className="text-xs font-black text-blue-400">{item.views} مشاهدة</span>
                        <span className="text-xs font-black text-emerald-400">{item.additions} إضافة للسلة</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          } />

          <Route path="/orders" element={
            <div className="space-y-10 animate-fade-in">
              <div className="bg-[#2d0e0e]/60 p-8 rounded-[3rem] border border-white/5 backdrop-blur-xl">
                <h1 className="text-2xl font-black flex items-center gap-3">📋 قائمة الطلبات الأخيرة</h1>
              </div>
              <div className="space-y-6">
                {orders.length === 0 ? (
                  <div className="text-center py-32 opacity-20">
                    <span className="text-6xl block mb-4">📭</span>
                    <p className="text-xl font-black">لا توجد طلبات بعد</p>
                  </div>
                ) : (
                  orders.map(order => (
                    <div key={order.id} className="bg-white/5 backdrop-blur-3xl p-8 rounded-[3rem] border border-white/5 hover:border-[#c5a059]/20 transition-all shadow-xl">
                      <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
                        <div>
                          <h4 className="text-xl font-black text-white mb-1">{order.customerName}</h4>
                          <p className="text-slate-400 text-sm font-bold flex items-center gap-2">
                             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                             {order.location}
                          </p>
                        </div>
                        <div className="text-left md:text-right">
                          <span className="text-xs font-black text-[#c5a059] block mb-1">{new Date(order.date).toLocaleString('ar-YE')}</span>
                          <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-black uppercase border border-emerald-500/20">{order.paymentMethod}</span>
                        </div>
                      </div>
                      <div className="border-t border-white/5 pt-6 space-y-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-sm font-bold text-slate-300">
                             <span>{item.name} <span className="text-[#c5a059] mx-2">×{item.quantity}</span></span>
                             <span>{(item.price * item.quantity).toLocaleString()} ريال</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center">
                        <span className="font-black text-white uppercase text-xs">الإجمالي</span>
                        <span className="text-2xl font-black text-[#c5a059]">{order.total.toLocaleString()} ريال</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          } />

          <Route path="/products" element={
            <div className="space-y-10 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-center bg-[#2d0e0e]/60 p-8 rounded-[3rem] border border-white/5 backdrop-blur-xl gap-6">
                <h1 className="text-2xl font-black flex items-center gap-3">إدارة المخزون</h1>
                <button onClick={() => { setEditingProduct(null); setIsModalOpen(true); setImagePreview(null); }} className="bg-[#c5a059] text-[#2d0e0e] px-10 py-5 rounded-2xl font-black text-sm shadow-2xl hover:scale-105 transition-all">إضافة صنف جديد</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map(p => (
                  <div key={p.id} className="bg-white/5 backdrop-blur-3xl p-6 rounded-[2.5rem] border border-white/5 group hover:border-[#c5a059]/20 transition-all">
                    <div className="relative aspect-square mb-6 overflow-hidden rounded-[2rem]">
                      <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <h4 className="font-black text-white truncate px-1">{p.name}</h4>
                    <div className="flex justify-between items-center mt-6 pt-6 border-t border-white/5">
                      <span className="text-[#c5a059] font-black">{p.price.toLocaleString()} ريال</span>
                      <div className="flex gap-2">
                         <button onClick={() => {setEditingProduct(p); setImagePreview(p.image); setIsModalOpen(true);}} className="p-3 bg-white/5 rounded-xl hover:bg-[#c5a059] hover:text-[#2d0e0e] transition-all"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                         <button onClick={() => {setProductToDelete(p.id); setIsDeleteConfirmOpen(true);}} className="p-3 bg-rose-500/10 text-rose-500 rounded-xl hover:bg-rose-600 hover:text-white transition-all"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          } />

          <Route path="/settings" element={
            <div className="max-w-3xl mx-auto py-10 animate-fade-in">
              <div className="bg-[#2d0e0e]/60 backdrop-blur-3xl p-12 rounded-[4rem] border border-[#c5a059]/20 shadow-2xl">
                <h2 className="text-3xl font-black mb-12 text-[#c5a059]">⚙️ الإعدادات</h2>
                <div className="space-y-12">
                  <div className="space-y-6">
                     <label className="text-[10px] font-black text-[#c5a059]/50 uppercase tracking-[0.3em] block mb-2 px-1">بيانات المدير</label>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input value={adminUsername} onChange={(e) => setAdminUsername(e.target.value)} placeholder="اسم المستخدم" className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 font-bold outline-none focus:border-[#c5a059]" />
                        <input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} placeholder="كلمة المرور" className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 font-bold outline-none focus:border-[#c5a059]" />
                     </div>
                     <button onClick={() => {saveAdminCredentials(adminUsername, adminPassword); alert('تم الحفظ');}} className="w-full bg-[#800020] text-white py-6 rounded-2xl font-black shadow-xl hover:bg-rose-800 transition-all border border-white/5">حفظ التغييرات</button>
                  </div>
                  <div className="pt-12 border-t border-white/10">
                     <label className="text-[10px] font-black text-[#c5a059]/50 uppercase tracking-[0.3em] block mb-6 px-1">رقم الواتساب</label>
                     <div className="flex gap-4">
                        <input value={newWhatsApp} onChange={(e) => setNewWhatsApp(e.target.value)} placeholder="مثال: 967770000000" className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 font-bold outline-none focus:border-[#c5a059]" />
                        <button onClick={() => {saveWhatsAppNumber(newWhatsApp); alert('تم التحديث');}} className="px-12 bg-[#c5a059] text-[#2d0e0e] rounded-2xl font-black hover:bg-amber-400 transition-all shadow-xl">تحديث</button>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          } />
        </Routes>
      </div>

      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setIsDeleteConfirmOpen(false)}></div>
           <div className="relative bg-[#2d0e0e] border border-[#c5a059]/30 w-full max-w-sm rounded-[3rem] p-12 text-center animate-pop-in">
              <h3 className="text-2xl font-black mb-4">حذف المنتج؟</h3>
              <p className="text-white/40 font-bold mb-10 text-sm">سيتم إزالة المنتج فوراً.</p>
              <div className="space-y-3">
                 <button onClick={handleDelete} className="w-full bg-rose-600 text-white py-4 rounded-2xl font-black shadow-xl">نعم، احذف المنتج</button>
                 <button onClick={() => setIsDeleteConfirmOpen(false)} className="w-full bg-white/5 text-white/40 py-4 rounded-2xl font-black">إلغاء</button>
              </div>
           </div>
        </div>
      )}

      {isLogoutConfirmOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsLogoutConfirmOpen(false)}></div>
           <div className="relative bg-[#1a0505] border border-[#c5a059]/20 w-full max-w-sm rounded-[3.5rem] p-12 text-center animate-pop-in shadow-2xl">
              <h3 className="text-2xl font-black mb-4 text-[#c5a059]">الخروج للمتجر؟</h3>
              <p className="text-white/40 font-bold mb-10 text-sm">سيتم العودة للمتجر وإغلاق لوحة الإدارة.</p>
              <div className="space-y-4">
                 <button onClick={confirmLogout} className="w-full bg-[#c5a059] text-[#2d0e0e] py-5 rounded-2xl font-black shadow-2xl">تأكيد الخروج</button>
                 <button onClick={() => setIsLogoutConfirmOpen(false)} className="w-full bg-white/5 text-white/40 py-4 rounded-2xl font-black">إلغاء</button>
              </div>
           </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-y-auto no-scrollbar">
           <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={() => setIsModalOpen(false)}></div>
           <div className="relative bg-[#2d0e0e] border border-[#c5a059]/20 w-full max-w-xl rounded-[4rem] p-12 animate-pop-in my-10 shadow-2xl">
              <h3 className="text-3xl font-black mb-10 text-white">{editingProduct ? 'تعديل الصنف' : 'صنف جديد'}</h3>
              <form onSubmit={handleSaveProduct} className="space-y-8">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-[#c5a059] uppercase tracking-[0.3em] opacity-60">اسم المنتج</label>
                    <input name="name" defaultValue={editingProduct?.name} required className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] p-6 font-bold outline-none focus:border-[#c5a059]" />
                 </div>
                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-[#c5a059] uppercase tracking-[0.3em] opacity-60">السعر</label>
                       <input name="price" type="number" defaultValue={editingProduct?.price} required className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] p-6 font-bold outline-none focus:border-[#c5a059]" />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-[#c5a059] uppercase tracking-[0.3em] opacity-60">القسم</label>
                       <select name="category" defaultValue={editingProduct?.category} className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] p-6 font-bold outline-none appearance-none">
                          {Object.values(Category).map(c => <option key={c} value={c} className="bg-[#1a0505]">{c}</option>)}
                       </select>
                    </div>
                 </div>
                 <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-[#c5a059]/20 rounded-[3rem] p-16 text-center cursor-pointer hover:bg-white/5 transition-all group relative overflow-hidden bg-[#c5a059]/5">
                    {imagePreview ? <img src={imagePreview} className="max-h-52 mx-auto rounded-3xl shadow-2xl relative z-10" /> : <div className="space-y-4"><span className="text-5xl block">📸</span><span className="text-[#c5a059] font-black text-xs block uppercase tracking-widest opacity-60">رفع صورة المنتج</span></div>}
                    <input type="file" ref={fileInputRef} onChange={(e) => {
                      const f = e.target.files?.[0];
                      if(f) {
                        const r = new FileReader();
                        r.onload = () => setImagePreview(r.result as string);
                        r.readAsDataURL(f);
                      }
                    }} className="hidden" accept="image/*" />
                 </div>
                 <div className="flex flex-col sm:flex-row gap-6 pt-6">
                    <button type="submit" className="flex-1 bg-[#800020] text-white py-6 rounded-[2rem] font-black text-xl shadow-2xl active:scale-95">حفظ البيانات</button>
                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-12 bg-white/5 text-white/40 rounded-[2rem] font-black text-xl border border-white/5">إلغاء</button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
