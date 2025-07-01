// src/pages/Admin/OffreDetailsAdmin.tsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const OffreDetailsAdmin: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div>
      <h4>Détails de l'offre #{id}</h4>
      <p>(description complète…)</p>
      <button onClick={() => navigate('/admin/offrelistadmin')}>Valider</button>
      <button onClick={() => navigate('/admin/offrelistadmin')}>Invalider</button>
    </div>
  );
};

export default OffreDetailsAdmin;
