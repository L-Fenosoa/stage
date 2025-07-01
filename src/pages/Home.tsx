// src/pages/Home.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Hero section */}
      <header className="hero">
        <h1 className="hero-title">Plateforme d’Intermédiation</h1>
        <p className="hero-subtitle">
          Mise en relation simple et sécurisée entre établissements et travailleurs
        </p>
      </header>

      <br /><br />

      {/* Call‑to‑action cards */}
      <div className="cards">
        <div className="card">
          <button
            className="card-btn"
            onClick={() => navigate('/etablissementhome')}
          >
            🏢<span>Établissement</span>
          </button>
          <p className="card-desc">Gérez vos déclarations et offres</p>
        </div>

        <div className="card">
          <button
            className="card-btn"
            onClick={() => navigate('/travailleurhome')}
          >
            👷‍♂️<span>Travailleur</span>
          </button>
          <p className="card-desc">Consultez et postulez aux offres</p>
        </div>

        <div className="card">
          <button
            className="card-btn"
            onClick={() => navigate('/adminhome')}
          >
            ⚙️<span>Administration</span>
          </button>
          <p className="card-desc">Validez déclarations et rapports</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
