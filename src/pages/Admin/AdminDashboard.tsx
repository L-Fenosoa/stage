// src/pages/Admin/AdminDashboard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h3>Administration – Tableau de bord</h3>
      <button onClick={() => navigate('/admin/declarations')}>
        Déclarations d’établissement
      </button>
      <button onClick={() => navigate('/admin/renseignements')}>
        Renseignements périodiques
      </button>
      <button onClick={() => navigate('/admin/offres')}>
        Offres d’emploi
      </button>
      <button onClick={() => navigate('/admin/inscriptions')}>
        Inscriptions Travailleur
      </button>
      {/* <button onClick={() => navigate('/admin/rapport')}>Rapport</button> */}
      {/* Statistiques à venir */}
    </div>
  );
};

export default AdminDashboard;
