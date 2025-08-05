// src/pages/Travailleur/MiseAJourInfos.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MiseAJourInfos.module.css';

const INITIAL_INFOS = {
  nom: 'Dupont',
  prenom: 'Jean',
  email: 'jean.dupont@example.com',
};

const MiseAJourInfos: React.FC = () => {
  const [infos, setInfos] = useState(INITIAL_INFOS);
  const [savedInfos, setSavedInfos] = useState(INITIAL_INFOS);
  const navigate = useNavigate();

  useEffect(() => {
    setInfos(INITIAL_INFOS);
    setSavedInfos(INITIAL_INFOS);
  }, []);

  const handleEdit = (field: keyof typeof INITIAL_INFOS) => {
    const newValue = prompt(`Modifier ${field}`, infos[field]);
    if (newValue !== null) {
      setInfos(prev => ({ ...prev, [field]: newValue }));
    }
  };

  const handleCancel = () => {
    setInfos(savedInfos);
  };

  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={() => navigate(-1)}>Retour</button>
      <div className={styles.card}>
        <h3 className={styles.title}>Mes informations</h3>
        <ul className={styles.infoList}>
          {(['nom', 'prenom', 'email'] as (keyof typeof INITIAL_INFOS)[]).map(f => (
            <li key={f}>
              <strong>{f} :</strong> {infos[f]}{' '}
              <button className={styles.edit} onClick={() => handleEdit(f)}>Modifier</button>
            </li>
          ))}
        </ul>
        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={handleCancel}>Annuler</button>
        </div>
      </div>
    </div>
  );
};

export default MiseAJourInfos;
