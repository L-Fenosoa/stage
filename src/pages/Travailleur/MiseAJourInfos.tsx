// src/pages/Travailleur/MiseAJourInfos.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const INITIAL_INFOS = {
  nom: 'Dupont',
  prenom: 'Jean',
  email: 'jean.dupont@example.com',
};

const MiseAJourInfos: React.FC = () => {
  const [infos, setInfos] = useState(INITIAL_INFOS);
  const [savedInfos, setSavedInfos] = useState(INITIAL_INFOS); // état de référence initial
  const navigate = useNavigate();

  // Simuler une récupération depuis un backend si nécessaire
  useEffect(() => {
    // Ici tu pourrais charger depuis une API réelle
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
    setInfos(savedInfos); // réinitialise à l'état sauvegardé
  };

  return (
    <div>
      <h3>Mes informations</h3>
      <ul>
        {(['nom', 'prenom', 'email'] as (keyof typeof INITIAL_INFOS)[]).map(f => (
          <li key={f}>
            <strong>{f} :</strong> {infos[f]}{' '}
            <button onClick={() => handleEdit(f)}>Modifier</button>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => navigate(-1)}>Retour</button>
        <button onClick={handleCancel}>Annuler</button>
      </div>
    </div>
  );
};

export default MiseAJourInfos;
