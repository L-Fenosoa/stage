// src/pages/Travailleur/TravailleurHome.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const TravailleurHome: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate(-1)}>Retour</button>
      <h2>Espace Travailleur</h2>
      <button onClick={() => navigate('/travailleur/identificationtrav')}>
        Identification
      </button>
      <button onClick={() => navigate('/travailleur/inscriptiontrav')}>
        Inscription
      </button>
    </div>
  );
};

export default TravailleurHome;
