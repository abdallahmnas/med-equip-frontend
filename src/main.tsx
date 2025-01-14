import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './contexts/AuthContext';
import './index.css'; // Include styles
import { EquipmentProvider } from './contexts/EquipmentContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <EquipmentProvider>
          <AppRoutes />
        </EquipmentProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
