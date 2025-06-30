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
      <button onClick={() => navigate('/etablissement/ouverture')}>
        Ouverture
      </button>
      <button onClick={() => navigate('/etablissement/reouverture')}>
        Réouverture
      </button>
      <button onClick={() => navigate('/etablissement/fermeture')}>
        Fermeture
      </button>
    </div>
  );
};

export default EtablissementHome;
