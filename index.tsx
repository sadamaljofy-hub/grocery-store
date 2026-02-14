import React from 'react';
import ReactDOM from 'react-dom/client';

// مكون واجهة المتجر
const StoreApp = () => {
  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center">
      <header className="text-center mb-8 animate-fade-in">
        <h1 className="text-5xl font-bold text-yellow-500 mb-2">بقالة باب المندب</h1>
        <p className="text-xl text-gray-300">جودة ونظافة وسعر مناسب</p>
      </header>
      
      <main className="bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700 max-w-md w-full text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-semibold mb-4">الموقع يعمل بنجاح!</h2>
        <p className="text-gray-400 mb-6">
          أهلاً بك في نظام إدارة البقالة. يمكنك الآن البدء بإضافة المنتجات والطلبات.
        </p>
        <button className="bg-yellow-600 hover:bg-yellow-500 text-white px-6 py-2 rounded-full transition-all">
          دخول لوحة التحكم
        </button>
      </main>
      
      <footer className="mt-8 text-gray-500">
        &copy; 2026 جميع الحقوق محفوظة
      </footer>
    </div>
  );
};

// تشغيل الموقع في صفحة الـ HTML
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <StoreApp />
    </React.StrictMode>
  );
}
