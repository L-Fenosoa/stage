// src/pages/Admin/InscriptionListAdmin.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './InscriptionListAdmin.module.css';

const MOCK_INSCRITS = [
  { id: 'U1', nom: 'Alice' },
  { id: 'U2', nom: 'Bob' },
];

const InscriptionListAdmin: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={() => navigate('/admin/admindashboard')}>
        ← Retour
      </button>

      <div className={styles.card}>
        <h4 className={styles.title}>Liste des inscriptions</h4>
        <ul className={styles.inscriptionList}>
          {MOCK_INSCRITS.map((u) => (
            <li key={u.id} className={styles.inscriptionItem}>
              <span className={styles.text}>{u.nom}</span>
              <button
                className={styles.detail}
                onClick={() => navigate(`/admin/inscriptiondetailsadmin/${u.id}`)}
              >
                Détails
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InscriptionListAdmin;
