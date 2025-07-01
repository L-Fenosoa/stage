// src/pages/Etablissement/Dashboard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate(-1)}>Retour</button>
      <h3>Espace Établissement (identifié)</h3>
      <button onClick={() => navigate('/etablissement/offreemploiform')}>
        Offre d’emploi
      </button>
      <button onClick={() => navigate('/etablissement/renseignementsperiodiquesform')}>
        Renseignements périodiques
      </button>
      <button onClick={() => navigate('/etablissement/reouvertureform')}>
        Réouverture
      </button>
      <button onClick={() => navigate('/etablissement/fermetureform')}>
        Fermeture
      </button>
    </div>
  );
};

export default Dashboard;
