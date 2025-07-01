// src/pages/Admin/DeclarationList.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface DeclarationItem {
  id: string;
  type: 'Ouverture' | 'Réouverture' | 'Fermeture';
  nomEtablissement: string;
}

const MOCK_DECLARATIONS: DeclarationItem[] = [
  { id: '1', type: 'Ouverture', nomEtablissement: 'Société XYZ' },
  { id: '2', type: 'Réouverture', nomEtablissement: 'Entreprise ABC' },
  { id: '3', type: 'Fermeture', nomEtablissement: 'Usine 123' },
];

const DeclarationList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Bouton Retour */}
      <button onClick={() => navigate(-1)}>Retour</button>

      <h4>Liste des déclarations</h4>
      <ul>
        {MOCK_DECLARATIONS.map(d => (
          <li key={d.id}>
            {d.type} – {d.nomEtablissement}{' '}
            <button onClick={() => navigate(`/admin/declarationdetails/${d.id}`)}>
              Détails
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeclarationList;
