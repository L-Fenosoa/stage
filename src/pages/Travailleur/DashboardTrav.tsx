// src/pages/Travailleur/DashboardTrav.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OffreList from './OffreList';

// Simulons un utilisateur connecté (tu remplaceras plus tard par des données d'authentification ou une API)
const USER_DATA = {
  nom: 'Randriamihaja',
  prenom: 'Mickaël',
  email: 'mickael.randria@example.com',
};

const DashboardTrav: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(USER_DATA);

  // (optionnel) ici tu pourrais charger les vraies infos depuis une API
  useEffect(() => {
    // fetch("/api/user") puis setUserData(...)
    setUserData(USER_DATA);
  }, []);

  return (
    <div>
      <h3>Tableau de bord Travailleur</h3>

      <div>
        <h4>Mes informations</h4>
        <ul>
          <li><strong>Nom :</strong> {userData.nom}</li>
          <li><strong>Prénom :</strong> {userData.prenom}</li>
          <li><strong>Email :</strong> {userData.email}</li>
        </ul>
        <button onClick={() => navigate('/travailleur/miseajourinfos')}>
          Mettre à jour mes informations
        </button>
      </div>

      <hr />

      <OffreList />
    </div>
  );
};

export default DashboardTrav;
