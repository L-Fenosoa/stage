import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './StatRapport.module.css';
// on importe AdminSidebar depuis son dossier
import AdminSidebar from '../../../components/AdminSidebar/AdminSidebar';

const StatRapport: React.FC = () => {
  const location = useLocation();

  return (
    <div className={styles.layout}>
      <AdminSidebar currentPath={location.pathname} />
      <main className={styles.container}>
        <h1 className={styles.title}>Statistique et rapport</h1>
        <p className={styles.info}>Disponible prochainement...</p>
      </main>
    </div>
  );
};

export default StatRapport;
