// src/pages/Travailleur/TravailleurHome.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TravailleurHome.module.css';

const TravailleurHome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={() => navigate(-1)}>Retour</button>
      <header className={styles.hero}>
        <h2 className={styles.title}>Espace Travailleur</h2>
      </header>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => navigate('/travailleur/identificationtrav')}>
          Identification
        </button>
        <button className={styles.button} onClick={() => navigate('/travailleur/inscriptiontrav')}>
          Inscription
        </button>
      </div>
    </div>
  );
};

export default TravailleurHome;
