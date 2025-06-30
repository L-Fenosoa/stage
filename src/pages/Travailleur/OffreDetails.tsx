// src/pages/Travailleur/OffreDetails.tsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const OffreDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div>
      <h3>Détails de l'offre #{id}</h3>
      <p>Ici la description complète de l'offre...</p>
      <button onClick={() => navigate(-1)}>Retour</button>
      <button onClick={() => alert('Candidature envoyée !')}>Postuler</button>
    </div>
  );
};

export default OffreDetails;
