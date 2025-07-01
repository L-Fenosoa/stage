// src/pages/Travailleur/OffreDetails.tsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// 1. Définition de l’interface décrivant une offre
interface OffreDetailsData {
  id: string;
  denominationService: string;
  nis: string;
  nif: string;
  cnaps: string;
  adresseEtab: string;
  recruteurNom: string;
  recruteurTelephone: string;
  recruteurPoste: string;
  appellationPoste: string;
  remuneration: string;
  avantageNature: string;
  dureeEmploi: string;
  lieuEmploi: string;
  sexe: string;
  classeAge: string;
  diplomes: string;
  lieuResidence: string;
  autresConditions: string;
  nombreCandidats: string;
  dateEpreuve: string;
  dateRecrutement: string;
}

// 2. Mock typé avec cette interface
const MOCK_OFFRES_DETAILS: Record<string, OffreDetailsData> = {
  '1': {
    id: '1',
    denominationService: 'Société XYZ',
    nis: '123456',
    nif: '654321',
    cnaps: 'CNAPS-111222',
    adresseEtab: 'Antananarivo',
    recruteurNom: 'Rakoto',
    recruteurTelephone: '+26134123456',
    recruteurPoste: 'Responsable RH',
    appellationPoste: 'Développeur Full Stack',
    remuneration: '2 500 000 MGA',
    avantageNature: 'Véhicule de fonction',
    dureeEmploi: 'CDI',
    lieuEmploi: 'Antananarivo',
    sexe: 'Tous',
    classeAge: '20‑40 ans',
    diplomes: 'Bac+3',
    lieuResidence: 'Antananarivo',
    autresConditions: 'Maîtrise React',
    nombreCandidats: '3',
    dateEpreuve: '2025‑07‑15',
    dateRecrutement: '2025‑08‑01',
  },
  '2': {
    id: '2',
    denominationService: 'Entreprise ABC',
    nis: '789012',
    nif: '210987',
    cnaps: 'CNAPS‑333444',
    adresseEtab: 'Toamasina',
    recruteurNom: 'Rasoanaivo',
    recruteurTelephone: '+26134987654',
    recruteurPoste: 'Directeur',
    appellationPoste: 'Responsable RH',
    remuneration: '1 800 000 MGA',
    avantageNature: 'Assurance santé',
    dureeEmploi: 'CDD 6 mois',
    lieuEmploi: 'Toamasina',
    sexe: 'Tous',
    classeAge: '25‑45 ans',
    diplomes: 'Bac+4',
    lieuResidence: 'Toamasina',
    autresConditions: 'Expérience gestion équipe',
    nombreCandidats: '2',
    dateEpreuve: '2025‑07‑20',
    dateRecrutement: '2025‑08‑10',
  },
};

const OffreDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const data = id ? MOCK_OFFRES_DETAILS[id] : undefined;

  if (!data) {
    return <p>Offre non trouvée.</p>;
  }

  return (
    <div>
      {/* Bouton Retour avant le titre */}
      <button onClick={() => navigate(-1)}>Retour</button>

      <h3>Détails de l'offre #{data.id}</h3>
      <ul>
        <li><strong>Service employeur :</strong> {data.denominationService}</li>
        <li><strong>NIS :</strong> {data.nis}</li>
        <li><strong>NIF :</strong> {data.nif}</li>
        <li><strong>Immat. CNAPS :</strong> {data.cnaps}</li>
        <li><strong>Adresse :</strong> {data.adresseEtab}</li>
        <li>
          <strong>Recruteur :</strong> {data.recruteurNom} - 
          {data.recruteurPoste} - {data.recruteurTelephone}
        </li>

        <li><strong>Intitulé du poste :</strong> {data.appellationPoste}</li>
        <li><strong>Rémunération :</strong> {data.remuneration}</li>
        <li><strong>Avantage en nature :</strong> {data.avantageNature}</li>
        <li><strong>Durée d’emploi :</strong> {data.dureeEmploi}</li>
        <li><strong>Lieu d’emploi :</strong> {data.lieuEmploi}</li>

        <li><strong>Sexe :</strong> {data.sexe}</li>
        <li><strong>Classe d’âge :</strong> {data.classeAge}</li>
        <li><strong>Diplômes :</strong> {data.diplomes}</li>
        <li><strong>Lieu de résidence :</strong> {data.lieuResidence}</li>
        <li><strong>Autres conditions :</strong> {data.autresConditions}</li>

        <li><strong>Nombre de candidats demandés :</strong> {data.nombreCandidats}</li>
        <li><strong>Date de l’épreuve :</strong> {data.dateEpreuve}</li>
        <li><strong>Date de recrutement :</strong> {data.dateRecrutement}</li>
      </ul>

      {/* Bouton Postuler */}
      <button onClick={() => alert('Candidature envoyée !')}>Postuler</button>
    </div>
  );
};

export default OffreDetails;
