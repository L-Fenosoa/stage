// src/pages/Admin/DeclarationDetails.tsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface DeclarationDetailsData {
  id: string;
  type: 'Ouverture' | 'Réouverture' | 'Fermeture';
  // Champs communs
  nomEtablissement: string;
  nis: string;
  nif: string;
  cnaps: string;
  telephone: string;
  adresse: string;
  // Spécifique Ouverture
  effectifInitial?: number;
  // Spécifique Réouverture
  effectifAuMoment?: number;
  nouvellesActivites?: string;
  // Spécifique Fermeture
  nombreLicencies?: number;
}

const MOCK_DECLARATIONS_DETAILS: Record<string, DeclarationDetailsData> = {
  '1': {
    id: '1',
    type: 'Ouverture',
    nomEtablissement: 'Société XYZ',
    nis: '123456',
    nif: '654321',
    cnaps: 'CNAPS-111222',
    telephone: '+261 34 12 34 56',
    adresse: 'Antananarivo',
    effectifInitial: 25,
  },
  '2': {
    id: '2',
    type: 'Réouverture',
    nomEtablissement: 'Entreprise ABC',
    nis: '789012',
    nif: '210987',
    cnaps: 'CNAPS-333444',
    telephone: '+261 34 98 76 54',
    adresse: 'Toamasina',
    effectifAuMoment: 40,
    nouvellesActivites: 'Ajout d’un atelier numérique',
  },
  '3': {
    id: '3',
    type: 'Fermeture',
    nomEtablissement: 'Usine 123',
    nis: '345678',
    nif: '876543',
    cnaps: 'CNAPS-555666',
    telephone: '+261 33 24 68 10',
    adresse: 'Fianarantsoa',
    nombreLicencies: 60,
  },
};

const DeclarationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const data = id ? MOCK_DECLARATIONS_DETAILS[id] : undefined;

  if (!data) {
    return <p>Déclaration non trouvée.</p>;
  }

  return (
    <div>
      {/* Bouton retour toujours vers la liste */}
      <button onClick={() => navigate('/admin/declarationlist')}>Retour</button>

      <h4>Détails de la déclaration #{data.id}</h4>
      <ul>
        <li><strong>Type :</strong> {data.type}</li>
        <li><strong>Nom établissement :</strong> {data.nomEtablissement}</li>
        <li><strong>NIS :</strong> {data.nis}</li>
        <li><strong>NIF :</strong> {data.nif}</li>
        <li><strong>Immat. CNAPS :</strong> {data.cnaps}</li>
        <li><strong>Téléphone :</strong> {data.telephone}</li>
        <li><strong>Adresse :</strong> {data.adresse}</li>

        {data.type === 'Ouverture' && (
          <li><strong>Effectif initial :</strong> {data.effectifInitial}</li>
        )}

        {data.type === 'Réouverture' && (
          <>
            <li><strong>Effectif à la réouverture :</strong> {data.effectifAuMoment}</li>
            <li><strong>Nouvelles activités :</strong> {data.nouvellesActivites}</li>
          </>
        )}

        {data.type === 'Fermeture' && (
          <li><strong>Nombre de licenciés :</strong> {data.nombreLicencies}</li>
        )}
      </ul>

      <div>
        <button onClick={() => navigate('/admin/declarationlist')}>Valider</button>
        <button onClick={() => navigate('/admin/declarationlist')}>Invalider</button>
      </div>
    </div>
  );
};

export default DeclarationDetails;
