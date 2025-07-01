// src/pages/Home.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

const cardsData = [
  {
    icon: '🏢',
    label: 'Établissement',
    desc: 'Gérez vos déclarations et offres',
    to: '/etablissementhome',
    color: '#FF7E5F',
  },
  {
    icon: '👷‍♂️',
    label: 'Travailleur',
    desc: 'Consultez et postulez aux offres',
    to: '/travailleurhome',
    color: '#4ECDC4',
  },
  {
    icon: '⚙️',
    label: 'Administration',
    desc: 'Validez déclarations et rapports',
    to: '/adminidentification',
    color: '#556270',
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.homePage}>
      <header className={styles.hero}>
        <h1 className={styles.heroTitle}>Plateforme d’Intermédiation</h1>
        <p className={styles.heroSubtitle}>
          Mise en relation simple et sécurisée entre établissements et travailleurs
        </p>
      </header>

      <div className={styles.cards}>
        {cardsData.map((c, i) => (
          <div key={i} className={styles.card}>
            <button
              className={styles.cardBtn}
              style={{ borderColor: c.color }}
              onClick={() => navigate(c.to)}
            >
              <span className={styles.icon}>{c.icon}</span>
              <span className={styles.label}>{c.label}</span>
            </button>
            <p className={styles.cardDesc}>{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
