// src/pages/Travailleur/IdentificationTrav.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IdentificationTrav: React.FC = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    // TODO : authentification réelle
    navigate('/travailleur/dashboardtrav');
  };

  return (
    <div>
      <button onClick={() => navigate(-1)}>Retour</button>
      <h3>Identification Travailleur</h3>
      <div>
        <label>
          Identifiant :
          <input
            type="text"
            value={login}
            onChange={e => setLogin(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Mot de passe :
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div>
          <button onClick={handleSubmit}>Suivant</button>
      </div>
    </div>
  );
};

export default IdentificationTrav;
