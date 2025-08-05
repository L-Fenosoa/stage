// src/pages/Admin/OffreDetailsAdmin.tsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './OffreDetailsAdmin.module.css';

const MOCK_OFFRES_DETAILS = {
  X: {
    denominationService: 'Service Informatique',
    nis: '123456',
    nif: '654321',
    cnaps: 'CNAPS-111222',
    adresseEtab: 'Antananarivo',
    recruteurNom: 'Rakoto Jean',
    recruteurTelephone: '+261 34 12 34 56',
    recruteurPoste: 'RH',
    appellationPoste: 'Dev Backend',
    remuneration: '1 200 000 MGA',
    avantageNature: 'Logement de fonction',
    dureeEmploi: 'CDI',
    lieuEmploi: 'Antananarivo',
    sexe: 'H/F',
    classeAge: '25-35',
    diplomes: 'Bac+3 Informatique',
    lieuResidence: 'Antananarivo',
    autresConditions: 'Expérience 2 ans minimum',
    nombreCandidats: '3',
    dateEpreuve: '2025-07-10',
    dateRecrutement: '2025-07-20'
  },
  Y: {
    denominationService: 'Direction Générale',
    nis: '789012',
    nif: '210987',
    cnaps: 'CNAPS-333444',
    adresseEtab: 'Toamasina',
    recruteurNom: 'Rasoanaivo Marie',
    recruteurTelephone: '+261 34 98 76 54',
    recruteurPoste: 'Directrice RH',
    appellationPoste: 'Chef de projet',
    remuneration: '2 000 000 MGA',
    avantageNature: 'Véhicule de service',
    dureeEmploi: 'CDD 12 mois',
    lieuEmploi: 'Toamasina',
    sexe: 'H/F',
    classeAge: '30-45',
    diplomes: 'Bac+5 Gestion de projet',
    lieuResidence: 'Toamasina',
    autresConditions: 'Maîtrise de l’anglais',
    nombreCandidats: '2',
    dateEpreuve: '2025-08-05',
    dateRecrutement: '2025-08-15'
  }
};

const OffreDetailsAdmin: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const data = id ? MOCK_OFFRES_DETAILS[id as keyof typeof MOCK_OFFRES_DETAILS] : undefined;

  if (!data) {
    return <p>Offre non trouvée.</p>;
  }

  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={() => navigate('/admin/offrelistadmin')}>
        ← Retour
      </button>

      <div className={styles.card}>
        <h4 className={styles.title}>Détails de l'offre #{id}</h4>
        <ul className={styles.list}>
          <li><strong>Dénomination service :</strong> {data.denominationService}</li>
          <li><strong>NIS :</strong> {data.nis}</li>
          <li><strong>NIF :</strong> {data.nif}</li>
          <li><strong>CNAPS :</strong> {data.cnaps}</li>
          <li><strong>Adresse :</strong> {data.adresseEtab}</li>
          <li><strong>Recruteur :</strong> {data.recruteurNom} ({data.recruteurPoste})</li>
          <li><strong>Téléphone :</strong> {data.recruteurTelephone}</li>
          <li><strong>Poste :</strong> {data.appellationPoste}</li>
          <li><strong>Rémunération :</strong> {data.remuneration}</li>
          <li><strong>Avantage en nature :</strong> {data.avantageNature}</li>
          <li><strong>Durée d'emploi :</strong> {data.dureeEmploi}</li>
          <li><strong>Lieu :</strong> {data.lieuEmploi}</li>
          <li><strong>Sexe :</strong> {data.sexe}</li>
          <li><strong>Classe d'âge :</strong> {data.classeAge}</li>
          <li><strong>Diplômes :</strong> {data.diplomes}</li>
          <li><strong>Lieu résidence :</strong> {data.lieuResidence}</li>
          <li><strong>Autres conditions :</strong> {data.autresConditions}</li>
          <li><strong>Nombre candidats :</strong> {data.nombreCandidats}</li>
          <li><strong>Date épreuve :</strong> {data.dateEpreuve}</li>
          <li><strong>Date recrutement :</strong> {data.dateRecrutement}</li>
        </ul>

        <div className={styles.actions}>
          <button className={styles.valid}>Valider</button>
          <button className={styles.invalid}>Invalider</button>
        </div>
      </div>
    </div>
  );
};

export default OffreDetailsAdmin;
