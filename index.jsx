import React from 'react';
import ReactDOM from 'react-dom/client';

// مكون واجهة المتجر مباشرة هنا لضمان العمل
const StoreApp = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#0a192f',
      color: 'white',
      textAlign: 'center' 
    }}>
      <h1 style={{ color: '#fbbf24', fontSize: '3.5rem', fontWeight: 'bold' }}>بقالة باب المندب</h1>
      <p style={{ fontSize: '1.5rem', color: '#94a3b8' }}>جودة ونظافة وسعر مناسب</p>
      <div style={{ 
        marginTop: '30px', 
        padding: '25px', 
        backgroundColor: '#112240', 
        borderRadius: '15px', 
        border: '1px solid #1e293b',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
      }}>
        <p style={{ color: '#64ffda' }}>✅ تم الاتصال بنجاح بالخادم</p>
      </div>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <StoreApp />
    </React.StrictMode>
  );
  }
  
