
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const UserGuide: React.FC = () => {
  const steps = [
    {
      title: "تصفح المنتجات",
      description: "استعرض قائمتنا المختارة من المواد الغذائية والخضروات الطازجة. استخدم الفلاتر للوصول السريع لما تحتاجه.",
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      title: "أضف للسلة",
      description: "بضغطة واحدة يمكنك إضافة منتجاتك المفضلة. حقيبتك الذكية تتبع طلباتك بدقة وتحسب الإجمالي تلقائياً.",
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    {
      title: "أكد طلبك عبر واتساب",
      description: "بعد ملء بيانات التوصيل، سيقوم النظام بتجهيز رسالة مفصلة وإرسالها مباشرة إلى خدمة عملاء باب المندب عبر واتساب.",
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 001.333 4.993L2 22l5.233-1.237a9.994 9.994 0 004.773 1.217h.004c5.505 0 9.988-4.478 9.989-9.984 0-2.669-1.037-5.176-2.927-7.067A7.061 7.061 0 0012.012 2z" />
        </svg>
      )
    }
  ];

  const features = [
    { name: "خضروات قطف اليوم", detail: "نضمن لك وصول الخضروات من المزرعة إلى منزلك طازجة تماماً." },
    { name: "الدفع بـ ون كاش", detail: "نوفر خيارات دفع إلكترونية حديثة لتسهيل المعاملات المالية." },
    { name: "توصيل آمن وسريع", detail: "فريقنا يهتم بأدق تفاصيل التغليف والنظافة لضمان سلامة طلبك." }
  ];

  return (
    <div className="min-h-screen bg-[#0a192f] text-white overflow-hidden pb-20">
      <Navbar cartCount={0} onCartToggle={() => {}} />
      
      <header className="relative py-24 text-center">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="flex flex-wrap gap-12 p-10 rotate-12 scale-150">
             {Array.from({ length: 15 }).map((_, i) => (
               <div key={i} className="w-24 h-24 border-2 border-blue-400/20 rounded-full"></div>
             ))}
          </div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-black mb-8 animate-fade-in bg-clip-text text-transparent bg-gradient-to-b from-white to-blue-200">
            دليل تجربة باب المندب
          </h1>
          <p className="text-xl md:text-2xl text-blue-200/60 font-medium max-w-2xl mx-auto">
            تعرف على كيفية الحصول على أفضل المنتجات بأسهل الطرق والتقنيات الحديثة.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 space-y-32">
        {/* خطوات الطلب */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 group hover:bg-white/10 transition-all duration-500 animate-fade-in" style={{ animationDelay: `${i * 0.2}s` }}>
              <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-blue-900/40 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                {step.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 text-white">{step.title}</h3>
              <p className="text-blue-100/60 font-bold leading-relaxed">{step.description}</p>
            </div>
          ))}
        </section>

        {/* الميزات الخاصة */}
        <section className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 rounded-[4rem] p-12 md:p-20 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-10 leading-tight">لماذا تختار باب المندب؟</h2>
              <div className="space-y-8">
                {features.map((f, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-white mb-2">{f.name}</h4>
                      <p className="text-blue-200/50 font-medium">{f.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-blue-600/10 rounded-[4rem] border border-white/10 flex items-center justify-center p-10 overflow-hidden">
                 <div className="relative z-10 text-center">
                    <div className="text-9xl mb-6 opacity-30 select-none">💎</div>
                    <p className="text-2xl font-black text-blue-200">باب المندب.. طزاجة دائمة وثقة لا تنتهي</p>
                 </div>
                 <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center py-20">
          <h2 className="text-3xl font-black mb-8">هل أنت مستعد للتسوق؟</h2>
          <Link to="/" className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-12 py-6 rounded-[2.5rem] font-black text-xl shadow-2xl shadow-blue-900/40 transition-all active:scale-95">
             ابدأ التسوق الآن
          </Link>
        </section>
      </main>
    </div>
  );
};

export default UserGuide;
