
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types';
import { getStoredWhatsAppNumber, addOrder } from '../services/storage';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onClear: () => void;
  onReset?: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onUpdateQuantity, onClear, onReset }) => {
  const [customerName, setCustomerName] = useState('');
  const [location, setLocation] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'onecash'>('cod');
  const [isOrdering, setIsOrdering] = useState(false);
  
  const navigate = useNavigate();

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !location || items.length === 0) return;

    setIsOrdering(true);

    const paymentLabel = paymentMethod === 'cod' ? 'الدفع عند الاستلام' : 'ون كاش';
    const currentWhatsApp = getStoredWhatsAppNumber();

    const productList = items.map(item => `- ${item.name} (${item.quantity} × ${item.price})`).join('%0A');
    const message = `طلب جديد من باب المندب:%0A%0A*العميل:* ${customerName}%0A*الموقع:* ${location}%0A*طريقة الدفع:* ${paymentLabel}%0A%0A*المنتجات:*%0A${productList}%0A%0A*الإجمالي:* ${total.toLocaleString()} ريال`;
    
    addOrder({
      id: Math.random().toString(36).substr(2, 9),
      customerName,
      location,
      items,
      total,
      date: new Date().toISOString(),
      paymentMethod: paymentLabel
    });

    window.open(`https://wa.me/${currentWhatsApp}?text=${message}`, '_blank');
    
    setTimeout(() => {
      setIsOrdering(false);
      onClear();
      onClose();
    }, 1000);
  };

  const handleUndoOrder = () => {
    if (confirm('هل أنت متأكد من التراجع عن الطلب؟ سيتم إفراغ السلة والعودة للمتجر.')) {
      onClear();
      setCustomerName('');
      setLocation('');
      onClose(); 
      if (onReset) onReset();
      navigate('/');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full sm:max-w-md bg-white h-full flex flex-col animate-slide-left shadow-2xl">
        <div className="p-6 md:p-8 border-b border-slate-50 flex items-center justify-between bg-white sticky top-0 z-10">
          <h2 className="text-xl md:text-2xl font-black text-slate-800">حقيبة التسوق</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-800 p-2 bg-slate-50 rounded-xl">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-300 space-y-6">
              <div className="bg-slate-50 p-8 md:p-10 rounded-full">
                <svg className="h-16 w-16 md:h-20 md:w-20 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              </div>
              <p className="font-bold text-base md:text-lg text-slate-400">سلتك فارغة حالياً</p>
            </div>
          ) : (
            <div className="space-y-6 md:space-y-8">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 md:gap-5 group">
                  <div className="relative h-16 w-16 md:h-20 md:w-20 flex-shrink-0 overflow-hidden rounded-xl md:rounded-2xl border border-slate-100">
                    <img src={item.image} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-black text-slate-800 text-xs md:text-sm leading-tight mb-1 truncate">{item.name}</h4>
                    <p className="text-slate-400 text-[10px] md:text-xs font-bold mb-3">{item.price.toLocaleString()} ريال</p>
                    <div className="flex items-center bg-slate-50 w-fit rounded-lg p-1 px-2 gap-3 border border-slate-100">
                      <button onClick={() => onUpdateQuantity(item.id, -1)} className="w-6 h-6 flex items-center justify-center rounded-md bg-white shadow-sm text-slate-600 font-bold">-</button>
                      <span className="font-black text-slate-800 text-xs md:text-sm">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, 1)} className="w-6 h-6 flex items-center justify-center rounded-md bg-white shadow-sm text-slate-600 font-bold">+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 md:p-8 border-t border-slate-50 bg-slate-50/80 backdrop-blur-md">
            <div className="flex items-center justify-between mb-6">
              <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">الإجمالي</span>
              <span className="text-2xl md:text-3xl font-black text-[#452829] tabular-nums">{total.toLocaleString()} <span className="text-xs font-normal">ريال</span></span>
            </div>

            <form onSubmit={handleCheckout} className="space-y-5">
              <div className="space-y-4">
                <div className="relative">
                  <input 
                    type="text" 
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-slate-100 outline-none font-black text-sm text-black placeholder:text-slate-300 transition-all"
                    placeholder="الاسم الكامل للمستلم"
                  />
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-slate-100 outline-none font-black text-sm text-black placeholder:text-slate-300 transition-all"
                    placeholder="عنوان التوصيل بالتفصيل"
                  />
                </div>

                <div className="pt-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">طريقة الدفع المتاحة</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => setPaymentMethod('cod')} className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${paymentMethod === 'cod' ? 'border-[#452829] bg-[#452829]/5 text-[#452829]' : 'border-slate-100 bg-white text-slate-400'}`}>
                      <span className="text-lg mb-1">💵</span>
                      <span className="text-[10px] font-black uppercase">عند الاستلام</span>
                    </button>
                    <button type="button" onClick={() => setPaymentMethod('onecash')} className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${paymentMethod === 'onecash' ? 'border-[#452829] bg-[#452829]/5 text-[#452829]' : 'border-slate-100 bg-white text-slate-400'}`}>
                      <span className="text-lg mb-1">📱</span>
                      <span className="text-[10px] font-black uppercase">ون كاش</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <button 
                  type="submit"
                  disabled={isOrdering}
                  className="w-full bg-[#452829] text-[#F5EED7] py-4.5 rounded-2xl font-black text-base hover:bg-[#5d3a3b] transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                >
                  {isOrdering ? 'جاري التحويل...' : 'تأكيد الطلب (واتساب)'}
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 001.333 4.993L2 22l5.233-1.237a9.994 9.994 0 004.773 1.217h.004c5.505 0 9.988-4.478 9.989-9.984 0-2.669-1.037-5.176-2.927-7.067A7.061 7.061 0 0012.012 2z" /></svg>
                </button>

                <button 
                  type="button"
                  onClick={handleUndoOrder}
                  className="w-full bg-rose-50 text-rose-500 py-3 rounded-xl font-black text-[10px] md:text-xs hover:bg-rose-100 transition-all active:scale-95"
                >
                  إلغاء الطلب والعودة
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
