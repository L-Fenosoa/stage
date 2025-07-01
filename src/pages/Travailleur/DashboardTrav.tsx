// src/pages/Travailleur/DashboardTrav.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Données fictives simulant le travailleur identifié
const USER_DATA = {
  nom: 'Rakoto',
  prenom: 'Jean',
  telephone: '+261 34 12 34 56',
  premierChoixEmploi: 'Développeur Full Stack',
  deuxiemeChoixEmploi: 'Chef de projet',
};

// Données fictives simulant les offres récupérées
const MOCK_OFFRES = [
  {
    id: '1',
    nomEtablissement: 'Société XYZ',
    poste: 'Développeur Full Stack',
  },
  {
    id: '2',
    nomEtablissement: 'Entreprise ABC',
    poste: 'Responsable RH',
  },
];

const DashboardTrav: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      {/* Bouton Retour */}
      <button onClick={() => navigate(-1)}>Retour</button>

      <h3>Tableau de bord Travailleur</h3>


      {/* Données du travailleur */}
      <div style={{ margin: '1em 0' }}>
        <h4>Mes informations</h4>
        <ul>
          <li><strong>Nom :</strong> {USER_DATA.nom}</li>
          <li><strong>Prénom :</strong> {USER_DATA.prenom}</li>
          <li><strong>Téléphone :</strong> {USER_DATA.telephone}</li>
          <li><strong>1er choix d’emploi :</strong> {USER_DATA.premierChoixEmploi}</li>
          <li><strong>2e choix d’emploi :</strong> {USER_DATA.deuxiemeChoixEmploi}</li>
        </ul>
      </div>

      {/* Mettre à jour infos */}
      <button onClick={() => navigate('/travailleur/miseajourinfos')}>
        Mettre à jour mes informations
      </button>

      {/* Liste des offres */}
      <h4>Offres d’emploi disponibles</h4>
      <ul>
        {MOCK_OFFRES.map(offre => (
          <li key={offre.id}>
            <strong>{offre.nomEtablissement}</strong> — {offre.poste}{' '}
            <button onClick={() => navigate(`/travailleur/offredetails/${offre.id}`)}>
              Voir détails
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardTrav;
