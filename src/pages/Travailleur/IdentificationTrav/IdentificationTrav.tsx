// src/pages/Travailleur/IdentificationTrav.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './IdentificationTrav.module.css';

const IdentificationTrav: React.FC = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    // TODO : authentification réelle
    navigate('/travailleur/dashboardtrav');
  };

  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={() => navigate(-1)}>Retour</button>
      <div className={styles.card}>
        <h3 className={styles.title}>Identification Travailleur</h3>
        <div className={styles.field}>
          <label>
            Identifiant :
            <input
              type="text"
              value={login}
              onChange={e => setLogin(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.field}>
          <label>
            Mot de passe :
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.actions}>
          <button className={styles.submit} onClick={handleSubmit}>Suivant</button>
        </div>
      </div>
    </div>
  );
};

export default IdentificationTrav;
