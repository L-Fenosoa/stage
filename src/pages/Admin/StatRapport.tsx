import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './StatRapport.module.css';
import AdminSidebar from '../../components/AdminSidebar';

const StatRapport: React.FC = () => {
  const location = useLocation();

  return (
    <div className={styles.layout}>
      <AdminSidebar currentPath={location.pathname} />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Statistique et rapport</h1>
          <p className={styles.info}>Disponible prochainement...</p>
        </div>
      </div>
    </div>
  );
};

export default StatRapport;
