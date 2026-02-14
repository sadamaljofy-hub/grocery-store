
import React, { useState } from 'react';
import { ADMIN_USERNAME_KEY, ADMIN_PASSWORD_KEY } from '../constants';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedUser = localStorage.getItem(ADMIN_USERNAME_KEY);
    const storedPass = localStorage.getItem(ADMIN_PASSWORD_KEY);

    if (username === storedUser && password === storedPass) {
      onLogin();
    } else {
      setError('خطأ في اسم المستخدم أو كلمة المرور');
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-[3rem] shadow-2xl w-full max-w-md border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-[#800020]" />
        
        <div className="text-center mb-10">
          <div className="bg-[#800020] w-20 h-20 rounded-3xl mx-auto flex items-center justify-center mb-6 shadow-xl shadow-red-100 transform rotate-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-slate-800">بوابة الإدارة</h1>
          <p className="text-slate-400 mt-2 font-bold">تسجيل الدخول للمتابعة</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm text-center font-black animate-fade-in">{error}</div>}
          
          <div className="input-group">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">اسم المستخدم</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-[#800020]/10 outline-none transition-all font-black text-black"
              placeholder="اسم المدير..."
            />
            <div className="input-underline admin-underline"></div>
          </div>

          <div className="input-group">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">كلمة المرور</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-[#800020]/10 outline-none transition-all font-black text-black"
              placeholder="••••••••"
            />
            <div className="input-underline admin-underline"></div>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#800020] text-white py-5 rounded-[2rem] font-black hover:bg-[#600018] transition-all shadow-xl shadow-red-100 active:scale-95"
          >
            تأكيد الدخول
          </button>
        </form>

        <div className="mt-10 text-center border-t border-slate-50 pt-8">
          <a href="#/" className="text-slate-400 text-sm font-bold hover:text-[#800020] transition-colors">← العودة للمتجر العام</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
