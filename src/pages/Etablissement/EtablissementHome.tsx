// src/pages/Etablissement/EtablissementHome.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './EtablissementHome.module.css';

const actions = [
  { label: 'Identification', to: '/etablissement/identification' },
  { label: 'Ouverture', to: '/etablissement/ouvertureform' },
  { label: 'Réouverture', to: '/etablissement/reouvertureform' },
  { label: 'Fermeture', to: '/etablissement/fermetureform' },
];

const EtablissementHome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={() => navigate(-1)}>
        ← Retour
      </button>

      <header className={styles.hero}>
        <h2 className={styles.title}>
          Espace Établissement<br />
          Gérez vos déclarations et formulaires en toute simplicité
        </h2>
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

export default EtablissementHome;
