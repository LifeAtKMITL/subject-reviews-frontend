import AuthProvider from 'contexts/auth/AuthProvider';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { LiffProvider } from 'react-liff';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <LiffProvider liffId='1657631189-l5rxazPg'>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </LiffProvider>,
);
