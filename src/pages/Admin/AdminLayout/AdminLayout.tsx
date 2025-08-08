// src/pages/Admin/AdminLayout.tsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from '../../../components/AdminSidebar/AdminSidebar';
import styles from './AdminLayout.module.css';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  return (
    <div className={styles.layout}>
      <AdminSidebar currentPath={location.pathname} />
      <main className={styles.container}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
