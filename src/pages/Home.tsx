// src/pages/Home.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Bienvenue</h1>
      <div>
        <button onClick={() => navigate('/etablissementhome')}>
          Espace Établissement
        </button>
      </div>
      <div>
        <button onClick={() => navigate('/travailleur')}>
          Espace Travailleur
        </button>
      </div>
      <div>
        <button onClick={() => navigate('/admin')}>
          Administration
        </button>
      </div>
    </div>
  );
};

export default Home;
