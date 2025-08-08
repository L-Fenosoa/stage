import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminSidebar.module.css';

interface Props {
  currentPath: string;
}

const AdminSidebar: React.FC<Props> = ({ currentPath }) => {
  const navigate = useNavigate();

  const items = [
    { label: 'Accueil',                   path: '/',                                 icon: '←' },
    { label: 'Statistique & Rapports',    path: '/admin/statrapport' },
    { label: 'Établissement',              path: '/admin/adminetablissementdashboard' },
    { label: 'Travailleur (Inscriptions)',path: '/admin/travailleur/inscriptionlistadmin' },
  ];

  return (
    <nav className={styles.sidebar}>
      {items.map(item => (
        <button
          key={item.path}
          type="button"
          className={`${styles.link} ${
            currentPath === item.path || currentPath.startsWith(item.path + '/')
              ? styles.active
              : ''
          }`}
          onClick={() => navigate(item.path)}
        >
          {item.icon && <span className={styles.icon}>{item.icon}</span>}
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default AdminSidebar;
