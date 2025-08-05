// src/index.tsx

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';  // ← on importe le provider

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    {/* AuthProvider englobe toute l’appli pour fournir le contexte */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
