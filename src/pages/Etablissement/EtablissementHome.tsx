// src/pages/Etablissement/EtablissementHome.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const EtablissementHome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Espace Établissement</h2>
      <button onClick={() => navigate('/etablissement/identification')}>
        Identification
      </button>
      <button onClick={() => navigate('/etablissement/ouvertureform')}>
        Ouverture
      </button>
      <button onClick={() => navigate('/etablissement/identification/reouverture')}>
        Réouverture
      </button>
      <button onClick={() => navigate('/etablissement/identification/fermeture')}>
        Fermeture
      </button>
    </div>
  );
};

export default EtablissementHome;
