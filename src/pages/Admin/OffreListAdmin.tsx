// src/pages/Admin/OffreListAdmin.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MOCK_OFFRES = [
  { id: 'X', titre: 'Dev Backend' },
  { id: 'Y', titre: 'Chef de projet' },
];

const OffreListAdmin: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h4>Liste des offres d’emploi</h4>
      <ul>
        {MOCK_OFFRES.map(o => (
          <li key={o.id}>
            {o.titre}{' '}
            <button onClick={() => navigate(`/admin/offredetailsadmin/${o.id}`)}>
              Détails
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OffreListAdmin;
