// src/pages/Etablissement/Dashboard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

const actions = [
  { label: 'Offre d’emploi', to: '/etablissement/offreemploiform' },
  { label: 'Renseignements périodiques', to: '/etablissement/renseignementsperiodiquesform' },
  { label: 'Réouverture', to: '/etablissement/reouvertureform' },
  { label: 'Fermeture', to: '/etablissement/fermetureform' },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={() => navigate(-1)}>
        ← Retour
      </button>

      <header className={styles.hero}>
        <h3 className={styles.title}>
          Espace Établissement<br/>
          (identifié)
        </h3>
      </header>

      <div className={styles.actions}>
        {actions.map((act, i) => (
          <button
            key={i}
            className={styles.btn}
            onClick={() => navigate(act.to)}
          >
            {act.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
