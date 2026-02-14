
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Storefront: React.FC = () => {
  const sections = [
    { title: "الخضروات الطازجة", desc: "من المزرعة إلى مائدتك مباشرة", path: "/shop/vegetables", icon: "🥦", color: "from-emerald-600 to-green-900" },
    { title: "التموين الغذائي", desc: "أجود أنواع الأرز والزيوت والبقوليات", path: "/shop/grocery", icon: "🌾", color: "from-amber-600 to-yellow-900" },
    { title: "المقرمشات والتسالي", desc: "طرزان وبفك وكل ما تحبه لقضاء وقت ممتع", path: "/shop/snacks", icon: "🥨", color: "from-purple-600 to-indigo-900" },
    { title: "المشروبات والمعلبات", desc: "عصائر راني وإندومي وتشكيلة واسعة", path: "/shop/canned", icon: "🥤", color: "from-cyan-600 to-blue-900" },
  ];

  const highlights = [
    { title: "جودة تلامس التوقعات", text: "نختار منتجاتنا بعناية فائقة لنضمن لك الأفضل دائماً.", icon: "💎" },
    { title: "طزاجة تصلك إلى بابك", text: "خضرواتنا تُقطف وتصلك في نفس اليوم لضمان أعلى قيمة غذائية.", icon: "🌿" },
    { title: "تجربة تسوق ذكية", text: "صممنا متجرنا ليكون الأسهل والأسرع في تلبية احتياجات منزلك.", icon: "⚡" }
  ];

  return (
    <div className="min-h-screen bg-[#020c1b] text-white font-['Cairo'] selection:bg-blue-500/30 overflow-x-hidden">
      <Navbar cartCount={0} onCartToggle={() => {}} />
      
      {/* Hero Section */}
      <header className="relative py-24 md:py-48 text-center overflow-hidden px-4">
        {/* Glow Effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[80%] md:w-[50%] h-[50%] bg-blue-600/10 blur-[100px] md:blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[80%] md:w-[50%] h-[50%] bg-cyan-600/10 blur-[100px] md:blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-block mb-6 px-6 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] md:text-xs font-black tracking-widest uppercase animate-fade-in">
            مرحباً بكم في صرح الجودة والنظافة
          </div>
          <h1 className="text-5xl md:text-9xl font-black mb-8 leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-blue-400 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
            باب المندب
          </h1>
          <p className="text-lg md:text-3xl font-bold text-slate-400 mb-14 max-w-3xl mx-auto leading-relaxed animate-fade-in opacity-0 [animation-delay:0.3s] [animation-fill-mode:forwards]">
            "ثقتكم هي رصيدنا الأكبر. نقدم لكم تجربة تسوق تجمع بين الأصالة والتقنية الحديثة، حيث الجودة لا تقبل المساومة."
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 animate-fade-in opacity-0 [animation-delay:0.6s] [animation-fill-mode:forwards]">
             <a href="#sections" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-10 md:px-12 py-4 md:py-5 rounded-2xl font-black text-base md:text-lg shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] transition-all active:scale-95 text-center">تصفح الأقسام</a>
             <Link to="/guide" className="w-full sm:w-auto bg-white/5 border border-white/10 hover:bg-white/10 px-10 md:px-12 py-4 md:py-5 rounded-2xl font-black text-base md:text-lg backdrop-blur-md transition-all text-center">كيف تطلب؟</Link>
          </div>
        </div>
      </header>

      {/* Highlights Section - العبارات المضافة */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mb-24 md:mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {highlights.map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl group hover:bg-white/10 transition-all duration-500 hover:border-blue-500/30">
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="text-xl font-black mb-3 text-white">{item.title}</h3>
              <p className="text-slate-400 font-bold text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Sections Grid */}
      <main id="sections" className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 relative">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-6xl font-black mb-4 md:mb-6">تسوّق حسب القسم</h2>
          <div className="h-1 w-16 md:w-24 bg-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs">كل ما تحتاجه عائلتك في مكان واحد</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {sections.map((sec, i) => (
            <Link 
              key={i} 
              to={sec.path}
              className={`group relative overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] aspect-[4/5] sm:aspect-[3/4] bg-gradient-to-br ${sec.color} border border-white/10 shadow-2xl transition-all hover:-translate-y-3 md:hover:-translate-y-5 duration-700 shadow-black/50`}
            >
              <div className="absolute inset-0 bg-[#020c1b]/40 group-hover:bg-transparent transition-colors duration-700"></div>
              <div className="relative h-full p-8 md:p-12 flex flex-col justify-end">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 rounded-2xl md:rounded-3xl flex items-center justify-center text-4xl md:text-5xl mb-6 md:mb-8 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-700 backdrop-blur-md">
                  {sec.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-black mb-2 md:mb-3 text-white">{sec.title}</h3>
                <p className="text-white/60 font-bold text-xs md:text-sm mb-6 md:mb-10 leading-relaxed line-clamp-2">{sec.desc}</p>
                <div className="flex items-center gap-4 text-white font-black text-[10px] md:text-xs group-hover:gap-6 transition-all">
                  <span>تسوّق الآن</span>
                  <svg className="w-4 h-4 md:w-5 md:h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="pt-20 md:pt-32 pb-12 md:pb-16 text-center border-t border-white/5 relative bg-[#020c1b] px-4">
          <div className="max-w-5xl mx-auto">
              <div className="bg-[#0a192f]/40 p-10 md:p-16 rounded-[3rem] md:rounded-[4rem] border border-white/5 backdrop-blur-3xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 opacity-5 blur-3xl"></div>
                  
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-2 md:mb-4">بقالة باب المندب</h2>
                  <p className="text-blue-400/40 text-[10px] md:text-sm font-bold mb-10 md:mb-12 italic uppercase tracking-widest">Premium Grocery Experience | منبع الطزاجة والجودة</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-12 mb-12 md:mb-16 text-center sm:text-right">
                      <div className="p-6 md:p-8 bg-white/5 rounded-2xl md:rounded-3xl border border-white/5">
                          <span className="text-blue-400 text-[9px] md:text-[10px] uppercase font-black tracking-widest block mb-3 md:mb-4">إدارة المتجر</span>
                          <span className="text-lg md:text-xl font-black text-white block">فارس الصمدي</span>
                          <span className="text-[10px] md:text-xs text-slate-500 font-bold">المدير العام</span>
                      </div>
                      <div className="p-6 md:p-8 bg-white/5 rounded-2xl md:rounded-3xl border border-white/5">
                          <span className="text-blue-400 text-[9px] md:text-[10px] uppercase font-black tracking-widest block mb-3 md:mb-4">التطوير والتقنية</span>
                          <span className="text-lg md:text-xl font-black text-white block">م. صدام الجوفي</span>
                          <span className="text-[10px] md:text-xs text-slate-500 font-bold">كبير المهندسين</span>
                      </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-10 border-t border-white/5">
                    <p className="text-slate-500 text-[10px] md:text-xs font-bold order-2 md:order-1">© {new Date().getFullYear()} جميع الحقوق محفوظة لبقالة باب المندب - نسعى دائماً لنكون الأقرب إليكم.</p>
                    <Link 
                      to="/admin/login" 
                      className="group flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-white/5 hover:bg-white/10 rounded-xl md:rounded-2xl border border-white/10 transition-all order-1 md:order-2"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-[10px] md:text-xs font-black text-slate-300 group-hover:text-blue-400 transition-colors">دخول الإدارة</span>
                    </Link>
                  </div>
              </div>
          </div>
      </footer>
    </div>
  );
};

export default Storefront;
