// src/pages/Admin/DeclarationList.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MOCK_DECLARATIONS = [
  { id: '1', type: 'Ouverture' },
  { id: '2', type: 'Réouverture' },
  { id: '3', type: 'Fermeture' },
];

const DeclarationList: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h4>Liste des déclarations</h4>
      <ul>
        {MOCK_DECLARATIONS.map(d => (
          <li key={d.id}>
            {d.type} #{d.id}{' '}
            <button onClick={() => navigate(`/admin/declarations/${d.id}`)}>
              Détails
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeclarationList;
