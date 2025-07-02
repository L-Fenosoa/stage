import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminSidebar.module.css';

interface Props {
  currentPath: string;
}

const AdminSidebar: React.FC<Props> = ({ currentPath }) => {
  const navigate = useNavigate();

  const items = [
    { label: 'Statistique et rapport', path: '/admin/statrapport' },
    { label: 'Déclarations', path: '/admin/declarationlist' },
    { label: 'Renseignements', path: '/admin/renslist' },
    { label: 'Offres', path: '/admin/offrelistadmin' },
    { label: 'Inscriptions', path: '/admin/inscriptionlistadmin' },
  ];

  return (
    <nav className={styles.sidebar}>
      <button
        type="button"
        className={`${styles.link} ${currentPath === '/admin/admindashboard' ? styles.active : ''}`}
        onClick={() => navigate('/admin/admindashboard')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="18"
          height="18"
          aria-hidden="true"
          focusable="false"
          style={{ marginRight: '8px', verticalAlign: 'middle' }}
        >
          <path d="M3 9l9-7 9 7" />
          <path d="M9 22V12h6v10" />
        </svg>
        Espace admin
      </button>

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
