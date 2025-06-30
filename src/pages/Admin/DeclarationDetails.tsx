// src/pages/Admin/DeclarationDetails.tsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DeclarationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div>
      <h4>Détails de la déclaration #{id}</h4>
      <p>(infos de la déclaration…)</p>
      <button onClick={() => navigate('/admin/declarations')}>Valider</button>
      <button onClick={() => navigate('/admin/declarations')}>Invalider</button>
    </div>
  );
};

export default DeclarationDetails;
