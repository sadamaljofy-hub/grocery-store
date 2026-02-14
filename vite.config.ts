import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      // السطر القادم هو الأهم لحل مشكلة الصفحة الفارغة (404 لعناصر الصفحة)
      base: './', 
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          // تم استبدال __dirname لضمان التوافق مع بيئة Vercel
          '@': path.resolve(process.cwd(), '.'),
        }
      }
    };
});
