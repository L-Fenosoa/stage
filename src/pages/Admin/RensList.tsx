// src/pages/Admin/RensList.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface RensItem {
  id: string;
  nomEtablissement: string;
  date: string; // format YYYY-MM-DD
}

const MOCK_RENS: RensItem[] = [
  { id: 'A', nomEtablissement: 'Société XYZ', date: '2025-06-01' },
  { id: 'B', nomEtablissement: 'Entreprise ABC', date: '2025-03-15' },
];

const RensList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Bouton Retour vers admin dashboard */}
      <button onClick={() => navigate('/admin/admindashboard')}>Retour</button>

      <h4>Liste des renseignements périodiques</h4>
      <ul>
        {MOCK_RENS.map(r => (
          <li key={r.id}>
            {r.nomEtablissement} — {r.date.slice(0, 4)}{' '}
            <button onClick={() => navigate(`/admin/rensdetails/${r.id}`)}>
              Détails
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RensList;
