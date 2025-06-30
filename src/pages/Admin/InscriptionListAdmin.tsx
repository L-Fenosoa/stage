// src/pages/Admin/InscriptionListAdmin.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MOCK_INSCRITS = [
  { id: 'U1', nom: 'Alice' },
  { id: 'U2', nom: 'Bob' },
];

const InscriptionListAdmin: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h4>Liste des inscriptions</h4>
      <ul>
        {MOCK_INSCRITS.map(u => (
          <li key={u.id}>
            {u.nom}{' '}
            <button onClick={() => navigate(`/admin/inscriptions/${u.id}`)}>
              Détails
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InscriptionListAdmin;
