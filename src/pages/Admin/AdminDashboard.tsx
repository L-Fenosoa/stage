// src/pages/Admin/AdminDashboard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate('/adminidentification')}>Retour</button>
      <h3>Administration – Tableau de bord</h3>
      <button onClick={() => navigate('/admin/declarationlist')}>
        Déclarations d’établissement
      </button>
      <button onClick={() => navigate('/admin/renslist')}>
        Renseignements périodiques
      </button>
      <button onClick={() => navigate('/admin/offrelistadmin')}>
        Offres d’emploi
      </button>
      <button onClick={() => navigate('/admin/inscriptionlistadmin')}>
        Inscriptions Travailleur
      </button>
      {/* <button onClick={() => navigate('/admin/rapport')}>Rapport</button> */}
      {/* Statistiques à venir */}
    </div>
  );
};

export default AdminDashboard;
