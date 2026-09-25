import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { PlatformProvider } from './context/PlatformContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <PlatformProvider>
          <App />
        </PlatformProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
