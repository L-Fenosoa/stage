// src/pages/Admin/RensDetails.tsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const RensDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div>
      <h4>Détails du renseignement #{id}</h4>
      <p>(infos du renseignement…)</p>
      <button onClick={() => navigate('/admin/renseignements')}>Valider</button>
      <button onClick={() => navigate('/admin/renseignements')}>Invalider</button>
    </div>
  );
};

export default RensDetails;
