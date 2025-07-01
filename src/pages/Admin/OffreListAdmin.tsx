// src/pages/Admin/OffreListAdmin.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './OffreListAdmin.module.css';

const MOCK_OFFRES = [
  { id: 'X', titre: 'Dev Backend' },
  { id: 'Y', titre: 'Chef de projet' },
];

const OffreListAdmin: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={() => navigate(-1)}>
        ← Retour
      </button>

      <div className={styles.card}>
        <h4 className={styles.title}>Liste des offres d’emploi</h4>
        <ul className={styles.offreList}>
          {MOCK_OFFRES.map(o => (
            <li key={o.id} className={styles.offreItem}>
              <span className={styles.text}>{o.titre}</span>
              <button
                className={styles.detail}
                onClick={() => navigate(`/admin/offredetailsadmin/${o.id}`)}
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

export default OffreListAdmin;
