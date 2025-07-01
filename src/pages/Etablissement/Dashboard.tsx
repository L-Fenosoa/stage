// src/pages/Etablissement/Dashboard.tsx
import React, { useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import styles from './Dashboard.module.css';

const mockEtablissement = {
  nomEtablissement: 'Entreprise X',
  nis: '123456789',
  nif: '987654321',
  cnaps: 'CNAPS-321',
  telephone: '+261341112233',
  adresse: 'Lot IV A 45 Antananarivo',
  statutJuridique: 'SARL',
  activitePrincipale: 'Commerce',
  activiteSecondaire: 'Import/Export',
  adresseMaisonMere: 'Paris, France',
  effectifInitial: '15',
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showWelcome, setShowWelcome] = useState(location.pathname === '/etablissement/dashboard');

  const displayAccueil = () => {
    navigate('/etablissement/dashboard');
    setShowWelcome(true);
  };

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <button className={styles.back} onClick={() => navigate('/etablissementhome')}>← Retour</button>

        <button className={styles.titleBtn} onClick={displayAccueil}>
          Espace Établissement<br />(identifié)
        </button>

        <nav className={styles.nav}>
          <button onClick={() => { navigate('renseignementsperiodiquesform'); setShowWelcome(false); }}>
            Renseignements périodiques
          </button>
          <button onClick={() => { navigate('offreemploiform'); setShowWelcome(false); }}>
            Offre d’emploi
          </button>
          <button onClick={() => { navigate('reouvertureform'); setShowWelcome(false); }}>
            Réouverture
          </button>
          <button onClick={() => { navigate('fermetureform'); setShowWelcome(false); }}>
            Fermeture
          </button>
        </nav>
      </aside>

      <main className={styles.content}>
        {showWelcome ? (
          <div className={styles.welcomeCard}>
            <h2>Bienvenue sur le tableau de bord de votre établissement.</h2>
            <ul>
              {Object.entries(mockEtablissement).map(([key, value]) => (
                <li key={key}>
                  <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())} :</strong> {value}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
