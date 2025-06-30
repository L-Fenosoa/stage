// src/pages/Etablissement/Identification.tsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
    <div>
      <h3>Identification {context ? `(${context})` : ''}</h3>
      <div>
        <label>
          Identifiant:
          <input
            type="text"
            value={identifiant}
            onChange={e => setIdentifiant(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Mot de passe:
          <input
            type="password"
            value={motDePasse}
            onChange={e => setMotDePasse(e.target.value)}
          />
        </label>
      </div>
      <div>
        <button onClick={() => navigate(-1)}>Retour</button>
        <button onClick={handleSubmit}>Suivant</button>
      </div>
    </div>
  );
};

export default Identification;
