
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Storefront from './pages/Storefront';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import UserGuide from './pages/UserGuide';
import CategoryView from './pages/CategoryView';
import { initializeAdmin } from './services/storage';
import { Category } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    sessionStorage.getItem('is_admin_logged_in') === 'true'
  );

  useEffect(() => {
    initializeAdmin();
  }, []);

  const handleLogin = (status: boolean) => {
    setIsAuthenticated(status);
    if (status) sessionStorage.setItem('is_admin_logged_in', 'true');
    else sessionStorage.removeItem('is_admin_logged_in');
  };

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Storefront />} />
        <Route path="/guide" element={<UserGuide />} />
        
        {/* صفحات الأقسام المستقلة */}
        <Route path="/shop/vegetables" element={<CategoryView category={Category.VEGETABLES} />} />
        <Route path="/shop/grocery" element={<CategoryView category={Category.GROCERY} />} />
        <Route path="/shop/snacks" element={<CategoryView category={Category.SNACKS} />} />
        <Route path="/shop/canned" element={<CategoryView category={Category.CANNED_DRINKS} />} />

        <Route 
          path="/admin/login" 
          element={isAuthenticated ? <Navigate to="/admin" /> : <Login onLogin={() => handleLogin(true)} />} 
        />
        <Route 
          path="/admin/*" 
          element={isAuthenticated ? <AdminDashboard onLogout={() => handleLogin(false)} /> : <Navigate to="/admin/login" />} 
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
