// src/pages/Etablissement/Identification.tsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Identification.module.css';

const Identification: React.FC = () => {
  const navigate = useNavigate();
  const { context } = useParams(); // 'reouverture', 'fermeture', etc.
  const [identifiant, setIdentifiant] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  const handleSubmit = () => {
    // TODO : vérification réelle
    if (context === 'reouverture') {
      navigate('/etablissement/reouvertureform');
    } else if (context === 'fermeture') {
      navigate('/etablissement/fermetureform');
    } else {
      navigate('/etablissement/dashboard');
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={() => navigate(-1)}>
        ← Retour
      </button>

      <div className={styles.formWrapper}>
        <h3 className={styles.title}>
          Identification {context ? `(${context})` : ''}
        </h3>

        <label className={styles.label}>
          Identifiant
          <input
            className={styles.input}
            type="text"
            value={identifiant}
            onChange={e => setIdentifiant(e.target.value)}
          />
        </label>

        <label className={styles.label}>
          Mot de passe
          <input
            className={styles.input}
            type="password"
            value={motDePasse}
            onChange={e => setMotDePasse(e.target.value)}
          />
        </label>

        <button className={styles.submit} onClick={handleSubmit}>
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Identification;
