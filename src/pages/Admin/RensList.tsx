// src/pages/Admin/RensList.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MOCK_RENS = [
  { id: 'A', date: '2025-06-01' },
  { id: 'B', date: '2025-03-15' },
];

const RensList: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h4>Liste des renseignements périodiques</h4>
      <ul>
        {MOCK_RENS.map(r => (
          <li key={r.id}>
            {r.date} #{r.id}{' '}
            <button onClick={() => navigate(`/admin/renseignements/${r.id}`)}>
              Détails
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RensList;
