// src/pages/Etablissement/Identification.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Identification: React.FC = () => {
  const navigate = useNavigate();
  const [identifiant, setIdentifiant] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  return (
    <div>
      <h3>Identification Établissement</h3>
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
        <button
          onClick={() => {
            // TODO : ajouter ici une vraie vérification/authentification
            navigate('/etablissement/dashboard');
          }}
        >
          Suivant
        </button>
        <button onClick={() => navigate(-1)}>
          Retour
        </button>
      </div>
    </div>
  );
};

export default Identification;
