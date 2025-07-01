/* eslint-disable no-irregular-whitespace */
// src/pages/Admin/RensDetails.tsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface RensDetailsData {
  id: string;
  // I – Renseignements généraux (exemple)
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
  // Charges sociales
  cotisationCNAPS: string;
  cotisationMedecineTravail: string;
  autresChargesSociales: string;
  totalChargesSociales: string;
  // Accidents & élections
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

  if (!data) return <p>Renseignement non trouvé.</p>;

  return (
    <div>
      {/* Bouton Retour vers la liste des renseignements */}
      <button onClick={() => navigate('/admin/renslist')}>Retour</button>

      <h4>Détails du renseignement périodique #{data.id}</h4>
      <ul>
        <li><strong>Entreprise mère :</strong> {data.entrepriseMereNom}</li>
        <li><strong>NIS (mère) :</strong> {data.entrepriseMereNIS}</li>
        <li><strong>Forme juridique :</strong> {data.entrepriseMereFormeJuridique}</li>
        <li><strong>Établissement :</strong> {data.etabNom}</li>
        <li><strong>NIS (étab.) :</strong> {data.etabNIS}</li>
        <li><strong>CNAPS (étab.) :</strong> {data.etabCNAPS}</li>
        <li><strong>Adresse :</strong> {data.etabAdresse}</li>
        <li><strong>Activité principale :</strong> {data.etabActivitePrincipale}</li>
        <li><strong>Activité secondaire :</strong> {data.etabActiviteSecondaire}</li>
        <li><strong>Date envoi questionnaire :</strong> {data.etabDateEnvoiQuestionnaire}</li>

        <li><strong>Cotisation CNAPS :</strong> {data.cotisationCNAPS}</li>
        <li><strong>Cotisation médecine travail :</strong> {data.cotisationMedecineTravail}</li>
        <li><strong>Autres charges sociales :</strong> {data.autresChargesSociales}</li>
        <li><strong>Total charges sociales :</strong> {data.totalChargesSociales}</li>

        <li><strong>Accidents du travail (année) :</strong> {data.nbAccidents}</li>
        <li><strong>Date dernières élections :</strong> {data.dateDernieresElections}</li>
        // eslint-disable-next-line no-irregular-whitespace
        <li><strong>Date envoi PV inspection :</strong> {data.dateEnvoiProcProcElect}</li>
      </ul>

      <div>
        <button onClick={() => navigate('/admin/renslist')}>Valider</button>
        <button onClick={() => navigate('/admin/renslist')}>Invalider</button>
      </div>
    </div>
  );
};

export default RensDetails;
