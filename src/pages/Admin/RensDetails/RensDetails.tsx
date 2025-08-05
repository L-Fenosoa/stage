// src/pages/Admin/RensDetails.tsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './RensDetails.module.css';

interface RensDetailsData {
  id: string;
  entrepriseMereNom: string;
  entrepriseMereNIS: string;
  entrepriseMereFormeJuridique: string;
  etabNom: string;
  etabNIS: string;
  etabCNAPS: string;
  etabAdresse: string;
  etabActivitePrincipale: string;
  etabActiviteSecondaire: string;
  etabDateEnvoiQuestionnaire: string;
  cotisationCNAPS: string;
  cotisationMedecineTravail: string;
  autresChargesSociales: string;
  totalChargesSociales: string;
  nbAccidents: string;
  dateDernieresElections: string;
  dateEnvoiProcProcElect: string;
}

const MOCK_RENS_DETAILS: Record<string, RensDetailsData> = {
  A: {
    id: 'A',
    entrepriseMereNom: 'Société XYZ',
    entrepriseMereNIS: '123456',
    entrepriseMereFormeJuridique: 'SARL',
    etabNom: 'Site Alpha',
    etabNIS: '1234567',
    etabCNAPS: 'CNAPS-111222',
    etabAdresse: 'Antananarivo',
    etabActivitePrincipale: 'Production',
    etabActiviteSecondaire: 'Distribution',
    etabDateEnvoiQuestionnaire: '2025-06-05',
    cotisationCNAPS: '500000',
    cotisationMedecineTravail: '100000',
    autresChargesSociales: '50000',
    totalChargesSociales: '650000',
    nbAccidents: '2',
    dateDernieresElections: '2024-11-20',
    dateEnvoiProcProcElect: '2024-11-25',
  },
  B: {
    id: 'B',
    entrepriseMereNom: 'Entreprise ABC',
    entrepriseMereNIS: '789012',
    entrepriseMereFormeJuridique: 'SA',
    etabNom: 'Usine Beta',
    etabNIS: '7890123',
    etabCNAPS: 'CNAPS-333444',
    etabAdresse: 'Toamasina',
    etabActivitePrincipale: 'Assemblage',
    etabActiviteSecondaire: 'Expédition',
    etabDateEnvoiQuestionnaire: '2025-03-20',
    cotisationCNAPS: '400000',
    cotisationMedecineTravail: '80000',
    autresChargesSociales: '40000',
    totalChargesSociales: '520000',
    nbAccidents: '1',
    dateDernieresElections: '2024-10-15',
    dateEnvoiProcProcElect: '2024-10-20',
  },
};

const RensDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const data = id ? MOCK_RENS_DETAILS[id] : undefined;

  if (!data) return <p className={styles.error}>Renseignement non trouvé.</p>;

  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={() => navigate('/admin/renslist')}>
        ← Retour
      </button>

      <div className={styles.card}>
        <h4 className={styles.title}>Renseignement périodique #{data.id}</h4>
        <ul className={styles.infoList}>
          <li><strong>Entreprise mère :</strong> {data.entrepriseMereNom}</li>
          <li><strong>NIS (mère) :</strong> {data.entrepriseMereNIS}</li>
          <li><strong>Forme juridique :</strong> {data.entrepriseMereFormeJuridique}</li>
          <li><strong>Établissement :</strong> {data.etabNom}</li>
          <li><strong>NIS (étab.) :</strong> {data.etabNIS}</li>
          <li><strong>CNAPS (étab.) :</strong> {data.etabCNAPS}</li>
          <li><strong>Adresse :</strong> {data.etabAdresse}</li>
          <li><strong>Activité principale :</strong> {data.etabActivitePrincipale}</li>
          <li><strong>Activité secondaire :</strong> {data.etabActiviteSecondaire}</li>
          <li><strong>Date envoi questionnaire :</strong> {data.etabDateEnvoiQuestionnaire}</li>
          <li><strong>Cotisation CNAPS :</strong> {data.cotisationCNAPS}</li>
          <li><strong>Cotisation médecine travail :</strong> {data.cotisationMedecineTravail}</li>
          <li><strong>Autres charges sociales :</strong> {data.autresChargesSociales}</li>
          <li><strong>Total charges sociales :</strong> {data.totalChargesSociales}</li>
          <li><strong>Accidents du travail :</strong> {data.nbAccidents}</li>
          <li><strong>Date dernières élections :</strong> {data.dateDernieresElections}</li>
          <li><strong>Date envoi PV inspection :</strong> {data.dateEnvoiProcProcElect}</li>
        </ul>

        <div className={styles.actions}>
          <button className={styles.validate}>Valider</button>
          <button className={styles.invalidate}>Invalider</button>
        </div>
      </div>
    </div>
  );
};

export default RensDetails;
