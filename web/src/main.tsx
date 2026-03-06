import React from 'react';
import ReactDOM from 'react-dom/client';
import { setAccent, ToastProvider } from '@theonefamily/ui';
import { App } from './App';
import './index.css';

setAccent('#f97316');
document.documentElement.classList.add('dark');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </React.StrictMode>,
);
