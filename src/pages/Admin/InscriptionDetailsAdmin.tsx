// src/pages/Admin/InscriptionDetailsAdmin.tsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const InscriptionDetailsAdmin: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div>
      <h4>Détails de l'inscription #{id}</h4>
      <p>(données de l’inscrit…)</p>
      <button onClick={() => navigate('/admin/inscriptions')}>Valider</button>
      <button onClick={() => navigate('/admin/inscriptions')}>Invalider</button>
    </div>
  );
};

export default InscriptionDetailsAdmin;
