import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminSidebar.module.css';

interface Props {
  currentPath: string;
}

const AdminSidebar: React.FC<Props> = ({ currentPath }) => {
  const navigate = useNavigate();

  const items = [
    { label: 'Espace admin', path: '/admin/admindashboard' },
    { label: 'Statistique et rapport', path: '/admin/statrapport' },
    { label: 'Déclarations', path: '/admin/declarationlist' },
    { label: 'Renseignements', path: '/admin/renslist' },
    { label: 'Offres', path: '/admin/offrelistadmin' },
    { label: 'Inscriptions', path: '/admin/inscriptionlistadmin' },
  ];

  return (
    <nav className={styles.sidebar}>
      {items.map(item => (
        <button
          key={item.path}
          type="button"
          className={`${styles.link} ${currentPath === item.path ? styles.active : ''}`}
          onClick={() => navigate(item.path)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default AdminSidebar;
