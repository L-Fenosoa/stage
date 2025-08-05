// src/pages/Travailleur/OffreList.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MOCK_OFFRES = [
  { id: '1', titre: 'Développeur React' },
  { id: '2', titre: 'Designer UI/UX' },
];

const OffreList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h4>Offres d’emploi</h4>
      <ul>
        {MOCK_OFFRES.map(offre => (
          <li key={offre.id}>
            {offre.titre}{' '}
            <button onClick={() => navigate(`/travailleur/offredetails/${offre.id}`)}>
              +Plus
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OffreList;
