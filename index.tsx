import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // تأكد من إضافة .jsx هنا

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
