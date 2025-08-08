import React from 'react';
import styles from './RensDetails.module.css';

interface EmploiRow {
  malH: number; malF: number;
  frLocalH: number; frLocalF: number;
  frExtH: number; frExtF: number;
  etrLocalH: number; etrLocalF: number;
  etrExtH: number; etrExtF: number;
}

interface SaisonRow {
  q1SurPlace: number; q1Deplaces: number;
  q2SurPlace: number; q2Deplaces: number;
  q3SurPlace: number; q3Deplaces: number;
  q4SurPlace: number; q4Deplaces: number;
  journeeHommes: number; masseSalaire: number;
}

interface AvantageRow {
  mal: number;
  frSP: number; frExt: number;
  etrSP: number; etrExt: number;
  total: number;
}

interface NatureRow {
  logement: number;
  electricite: number;
  eau: number;
  voiture: number;
  essence: number;
  domesticite: number;
  ration: number;
  terrain: number;
  total: number;
}

interface RensDetailsData {
  id: string;
  nomEtablissement: string;
  date: string;
  
  // I. Entreprise-mère
  entrepriseMereNom: string;
  entrepriseMereNIS: string;
  entrepriseMereFormeJuridique: string;
  entrepriseMereNationalite: string;
  
  // II. Établissement enquête
  etabNom: string;
  etabNIS: string;
  etabCNAPS: string;
  etabDirecteur: string;
  etabNationalite: string;
  etabAdresse: string;
  etabRue: string;
  etabCommune: string;
  etabDistrict: string;
  etabPrefecture: string;
  etabProvince: string;
  etabActivitePrincipale: string;
  etabActivitesSecondaires: string;
  etabDateEnvoiQuestionnaire: string;
  
  // III. Enquête sur l'emploi
  emploi: EmploiRow[];
  
  // IV. Emploi saisonnier ou temporaire
  saisonnier: SaisonRow[];
  
  // V. Salaire et avantage en natures
  avantage: AvantageRow[];
  
  // VI. Charges sociales
  cotCNAPS: number;
  cotMedecine: number;
  autresCharges: number;
  totalCharges: number;
  nbPermAvNatures: number;
  
  // VII. Avantages en nature
  nature: NatureRow[];
}

const categories = [
  'Manœuvres M1, M2',
  'Employés 1A, 1B',
  'Ouvriers spécialisés OS1, OS2, OS3',
  'Employés 2A, 2B, 3A, 3B',
  'Ouvriers qualifiés OP1A, OP1B',
  'Employés qualifiés 4A, 4B',
  'Ouvriers haute qualité OP2, OP3, maîtrise',
  'Employés qualifiés 5A, 5B',
  'Chauffeurs catégorie A',
  'Chauffeurs catégorie B',
  'Chauffeurs catégorie C',
  'Chauffeurs catégorie D',
  'Cadres hors catégorie, Direction',
];

const MOCK_RENS_DETAILS: Record<string, RensDetailsData> = {
  'A': {
    id: 'A',
    nomEtablissement: 'Société XYZ',
    date: '2025-06-01',
    
    // I. Entreprise-mère
    entrepriseMereNom: 'Groupe XYZ International',
    entrepriseMereNIS: '12345678901234567',
    entrepriseMereFormeJuridique: 'SARL',
    entrepriseMereNationalite: 'Française',
    
    // II. Établissement enquête
    etabNom: 'Société XYZ',
    etabNIS: '12345678901234567',
    etabCNAPS: 'CNAPS-12345',
    etabDirecteur: 'Jean Dupont',
    etabNationalite: 'Malagasy',
    etabAdresse: 'Antananarivo',
    etabRue: 'Rue du Commerce',
    etabCommune: 'Analamanga',
    etabDistrict: 'Antananarivo Renivohitra',
    etabPrefecture: 'Analamanga',
    etabProvince: 'Antananarivo',
    etabActivitePrincipale: 'Commerce de détail',
    etabActivitesSecondaires: 'Import-export, Distribution',
    etabDateEnvoiQuestionnaire: '2025-05-15',
    
    // III. Enquête sur l'emploi
    emploi: categories.map(() => ({
      malH: Math.floor(Math.random() * 10),
      malF: Math.floor(Math.random() * 8),
      frLocalH: Math.floor(Math.random() * 3),
      frLocalF: Math.floor(Math.random() * 2),
      frExtH: Math.floor(Math.random() * 2),
      frExtF: Math.floor(Math.random() * 1),
      etrLocalH: Math.floor(Math.random() * 4),
      etrLocalF: Math.floor(Math.random() * 3),
      etrExtH: Math.floor(Math.random() * 3),
      etrExtF: Math.floor(Math.random() * 2),
    })),
    
    // IV. Emploi saisonnier ou temporaire
    saisonnier: categories.map(() => ({
      q1SurPlace: Math.floor(Math.random() * 5),
      q1Deplaces: Math.floor(Math.random() * 3),
      q2SurPlace: Math.floor(Math.random() * 6),
      q2Deplaces: Math.floor(Math.random() * 4),
      q3SurPlace: Math.floor(Math.random() * 4),
      q3Deplaces: Math.floor(Math.random() * 2),
      q4SurPlace: Math.floor(Math.random() * 7),
      q4Deplaces: Math.floor(Math.random() * 5),
      journeeHommes: Math.floor(Math.random() * 100),
      masseSalaire: Math.floor(Math.random() * 5000000),
    })),
    
    // V. Salaire et avantage en natures
    avantage: categories.map(() => ({
      mal: Math.floor(Math.random() * 500000),
      frSP: Math.floor(Math.random() * 1000000),
      frExt: Math.floor(Math.random() * 1500000),
      etrSP: Math.floor(Math.random() * 800000),
      etrExt: Math.floor(Math.random() * 1200000),
      total: Math.floor(Math.random() * 2000000),
    })),
    
    // VI. Charges sociales
    cotCNAPS: 1500000,
    cotMedecine: 250000,
    autresCharges: 500000,
    totalCharges: 2250000,
    nbPermAvNatures: 12,
    
    // VII. Avantages en nature
    nature: categories.map(() => ({
      logement: Math.floor(Math.random() * 500000),
      electricite: Math.floor(Math.random() * 200000),
      eau: Math.floor(Math.random() * 100000),
      voiture: Math.floor(Math.random() * 1000000),
      essence: Math.floor(Math.random() * 300000),
      domesticite: Math.floor(Math.random() * 400000),
      ration: Math.floor(Math.random() * 250000),
      terrain: Math.floor(Math.random() * 750000),
      total: Math.floor(Math.random() * 2000000),
    })),
  },
  // Ajouter d'autres entrées au besoin...
};

interface RensDetailsProps {
  id: string;
  onClose: () => void;
}

const RensDetails: React.FC<RensDetailsProps> = ({ id, onClose }) => {
  const data = id ? MOCK_RENS_DETAILS[id] : undefined;

  if (!data) {
    return (
      <div className={styles.modalContainer}>
        <p className={styles.error}>Renseignement non trouvé.</p>
        <button className={styles.close} onClick={onClose}>
          &times;
        </button>
      </div>
    );
  }

  // Calculer les totaux pour les tableaux
  const emploiTotals = data.emploi.reduce((acc, row) => {
    Object.keys(row).forEach(key => {
      acc[key] = (acc[key] || 0) + row[key];
    });
    return acc;
  }, {} as any);

  const saisonnierTotals = data.saisonnier.reduce((acc, row) => {
    Object.keys(row).forEach(key => {
      acc[key] = (acc[key] || 0) + row[key];
    });
    return acc;
  }, {} as any);

  const avantageTotals = data.avantage.reduce((acc, row) => {
    Object.keys(row).forEach(key => {
      acc[key] = (acc[key] || 0) + row[key];
    });
    return acc;
  }, {} as any);

  const natureTotals = data.nature.reduce((acc, row) => {
    Object.keys(row).forEach(key => {
      acc[key] = (acc[key] || 0) + row[key];
    });
    return acc;
  }, {} as any);

  return (
    <div className={styles.modalContainer}>
      <button className={styles.close} onClick={onClose}>
        &times;
      </button>

      <h3 className={styles.title}>Renseignement périodique #{data.id}</h3>
      <p className={styles.subtitle}>Établissement: {data.nomEtablissement} | Année: {data.date.slice(0, 4)}</p>

      <div className={styles.sections}>
        {/* I. Entreprise-mère */}
        <section className={styles.section}>
          <h4>I. Entreprise-mère</h4>
          <div className={styles.infoGrid}>
            <InfoItem label="Nom / raison sociale" value={data.entrepriseMereNom} />
            <InfoItem label="N° identification statistique" value={data.entrepriseMereNIS} />
            <InfoItem label="Forme juridique" value={data.entrepriseMereFormeJuridique} />
            <InfoItem label="Nationalité" value={data.entrepriseMereNationalite} />
          </div>
        </section>

        {/* II. Établissement enquête */}
        <section className={styles.section}>
          <h4>II. Établissement enquête</h4>
          <div className={styles.infoGrid}>
            <InfoItem label="Nom / dénomination" value={data.etabNom} />
            <InfoItem label="N° identification statistique" value={data.etabNIS} />
            <InfoItem label="N° immatriculation CNaPS" value={data.etabCNAPS} />
            <InfoItem label="Directeur / responsable" value={data.etabDirecteur} />
            <InfoItem label="Nationalité" value={data.etabNationalite} />
            <InfoItem label="Adresse (localité)" value={data.etabAdresse} />
            <InfoItem label="Rue" value={data.etabRue} />
            <InfoItem label="Commune" value={data.etabCommune} />
            <InfoItem label="District" value={data.etabDistrict} />
            <InfoItem label="Préfecture" value={data.etabPrefecture} />
            <InfoItem label="Province" value={data.etabProvince} />
            <InfoItem label="Activité principale" value={data.etabActivitePrincipale} />
            <InfoItem label="Activités secondaires" value={data.etabActivitesSecondaires} />
            <InfoItem label="Date envoi questionnaire" value={data.etabDateEnvoiQuestionnaire} />
          </div>
        </section>

        {/* III. Enquête sur l'emploi */}
        <section className={styles.section}>
          <h4>III. Enquête sur l'emploi</h4>
          <div className={styles.tableContainer}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Catégorie professionnelle</th>
                  <th colSpan={2}>Malagasy</th>
                  <th colSpan={4}>Français et citoyens français</th>
                  <th colSpan={4}>Autres étrangers</th>
                </tr>
                <tr>
                  <th></th>
                  <th>H</th>
                  <th>F</th>
                  <th colSpan={2}>Recruté sur place</th>
                  <th colSpan={2}>Recruté à l'extérieur</th>
                  <th colSpan={2}>Recruté sur place</th>
                  <th colSpan={2}>Recruté à l'extérieur</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, i) => (
                  <tr key={i}>
                    <td>{cat}</td>
                    <td>{data.emploi[i].malH}</td>
                    <td>{data.emploi[i].malF}</td>
                    <td>{data.emploi[i].frLocalH}</td>
                    <td>{data.emploi[i].frLocalF}</td>
                    <td>{data.emploi[i].frExtH}</td>
                    <td>{data.emploi[i].frExtF}</td>
                    <td>{data.emploi[i].etrLocalH}</td>
                    <td>{data.emploi[i].etrLocalF}</td>
                    <td>{data.emploi[i].etrExtH}</td>
                    <td>{data.emploi[i].etrExtF}</td>
                  </tr>
                ))}
                <tr className={styles.totalRow}>
                  <td><strong>TOTAL</strong></td>
                  <td>{emploiTotals.malH}</td>
                  <td>{emploiTotals.malF}</td>
                  <td>{emploiTotals.frLocalH}</td>
                  <td>{emploiTotals.frLocalF}</td>
                  <td>{emploiTotals.frExtH}</td>
                  <td>{emploiTotals.frExtF}</td>
                  <td>{emploiTotals.etrLocalH}</td>
                  <td>{emploiTotals.etrLocalF}</td>
                  <td>{emploiTotals.etrExtH}</td>
                  <td>{emploiTotals.etrExtF}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* IV. Emploi saisonnier ou temporaire */}
        <section className={styles.section}>
          <h4>IV. Emploi saisonnier ou temporaire</h4>
          <div className={styles.tableContainer}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Catégorie professionnelle</th>
                  <th colSpan={2}>Jan-Mar</th>
                  <th colSpan={2}>Avr-Juin</th>
                  <th colSpan={2}>Juil-Sept</th>
                  <th colSpan={2}>Oct-Déc</th>
                  <th>Journées hommes</th>
                  <th>Masse salariale</th>
                </tr>
                <tr>
                  <th></th>
                  <th>Sur place</th>
                  <th>Déplacés</th>
                  <th>Sur place</th>
                  <th>Déplacés</th>
                  <th>Sur place</th>
                  <th>Déplacés</th>
                  <th>Sur place</th>
                  <th>Déplacés</th>
                  <th></th>
                  <th>(MGA)</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, i) => (
                  <tr key={i}>
                    <td>{cat}</td>
                    <td>{data.saisonnier[i].q1SurPlace}</td>
                    <td>{data.saisonnier[i].q1Deplaces}</td>
                    <td>{data.saisonnier[i].q2SurPlace}</td>
                    <td>{data.saisonnier[i].q2Deplaces}</td>
                    <td>{data.saisonnier[i].q3SurPlace}</td>
                    <td>{data.saisonnier[i].q3Deplaces}</td>
                    <td>{data.saisonnier[i].q4SurPlace}</td>
                    <td>{data.saisonnier[i].q4Deplaces}</td>
                    <td>{data.saisonnier[i].journeeHommes}</td>
                    <td>{data.saisonnier[i].masseSalaire.toLocaleString()}</td>
                  </tr>
                ))}
                <tr className={styles.totalRow}>
                  <td><strong>TOTAL</strong></td>
                  <td>{saisonnierTotals.q1SurPlace}</td>
                  <td>{saisonnierTotals.q1Deplaces}</td>
                  <td>{saisonnierTotals.q2SurPlace}</td>
                  <td>{saisonnierTotals.q2Deplaces}</td>
                  <td>{saisonnierTotals.q3SurPlace}</td>
                  <td>{saisonnierTotals.q3Deplaces}</td>
                  <td>{saisonnierTotals.q4SurPlace}</td>
                  <td>{saisonnierTotals.q4Deplaces}</td>
                  <td>{saisonnierTotals.journeeHommes}</td>
                  <td>{saisonnierTotals.masseSalaire.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* V. Salaire et avantage en natures */}
        <section className={styles.section}>
          <h4>V. Salaire et avantage en natures (MGA)</h4>
          <div className={styles.tableContainer}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Catégorie professionnelle</th>
                  <th>Malagasy</th>
                  <th>Français recrutés sur place</th>
                  <th>Français recrutés à l'extérieur</th>
                  <th>Autres étrangers recrutés sur place</th>
                  <th>Autres étrangers recrutés à l'extérieur</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, i) => (
                  <tr key={i}>
                    <td>{cat}</td>
                    <td>{data.avantage[i].mal.toLocaleString()}</td>
                    <td>{data.avantage[i].frSP.toLocaleString()}</td>
                    <td>{data.avantage[i].frExt.toLocaleString()}</td>
                    <td>{data.avantage[i].etrSP.toLocaleString()}</td>
                    <td>{data.avantage[i].etrExt.toLocaleString()}</td>
                    <td>{data.avantage[i].total.toLocaleString()}</td>
                  </tr>
                ))}
                <tr className={styles.totalRow}>
                  <td><strong>TOTAL</strong></td>
                  <td>{avantageTotals.mal.toLocaleString()}</td>
                  <td>{avantageTotals.frSP.toLocaleString()}</td>
                  <td>{avantageTotals.frExt.toLocaleString()}</td>
                  <td>{avantageTotals.etrSP.toLocaleString()}</td>
                  <td>{avantageTotals.etrExt.toLocaleString()}</td>
                  <td>{avantageTotals.total.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* VI. Charges sociales */}
        <section className={styles.section}>
          <h4>VI. Charges sociales (MGA)</h4>
          <div className={styles.infoGrid}>
            <InfoItem label="Cotisations patronales CNaPS" value={data.cotCNAPS.toLocaleString()} />
            <InfoItem label="Médecine du travail" value={data.cotMedecine.toLocaleString()} />
            <InfoItem label="Autres charges sociales" value={data.autresCharges.toLocaleString()} />
            <InfoItem label="Total des charges sociales" value={data.totalCharges.toLocaleString()} />
            <InfoItem label="Nb salariés permanents avec avantages en nature" value={data.nbPermAvNatures.toString()} />
          </div>
        </section>

        {/* VII. Avantages en nature */}
        <section className={styles.section}>
          <h4>VII. Avantages en nature (MGA)</h4>
          <div className={styles.tableContainer}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Catégorie professionnelle</th>
                  <th>Logement</th>
                  <th>Électricité</th>
                  <th>Eau</th>
                  <th>Voiture</th>
                  <th>Essence</th>
                  <th>Domesticité</th>
                  <th>Ration alimentaire</th>
                  <th>Terrain de culture</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, i) => (
                  <tr key={i}>
                    <td>{cat}</td>
                    <td>{data.nature[i].logement.toLocaleString()}</td>
                    <td>{data.nature[i].electricite.toLocaleString()}</td>
                    <td>{data.nature[i].eau.toLocaleString()}</td>
                    <td>{data.nature[i].voiture.toLocaleString()}</td>
                    <td>{data.nature[i].essence.toLocaleString()}</td>
                    <td>{data.nature[i].domesticite.toLocaleString()}</td>
                    <td>{data.nature[i].ration.toLocaleString()}</td>
                    <td>{data.nature[i].terrain.toLocaleString()}</td>
                    <td>{data.nature[i].total.toLocaleString()}</td>
                  </tr>
                ))}
                <tr className={styles.totalRow}>
                  <td><strong>TOTAL</strong></td>
                  <td>{natureTotals.logement.toLocaleString()}</td>
                  <td>{natureTotals.electricite.toLocaleString()}</td>
                  <td>{natureTotals.eau.toLocaleString()}</td>
                  <td>{natureTotals.voiture.toLocaleString()}</td>
                  <td>{natureTotals.essence.toLocaleString()}</td>
                  <td>{natureTotals.domesticite.toLocaleString()}</td>
                  <td>{natureTotals.ration.toLocaleString()}</td>
                  <td>{natureTotals.terrain.toLocaleString()}</td>
                  <td>{natureTotals.total.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <div className={styles.actions}>
        <button className={styles.validate}>Valider</button>
        <button className={styles.invalidate}>Invalider</button>
      </div>
    </div>
  );
};

// Composant helper pour afficher les paires label-valeur
const InfoItem: React.FC<{ label: string; value?: string }> = ({ label, value }) => (
  <div className={styles.infoItem}>
    <strong>{label} :</strong>
    <span>{value || '—'}</span>
  </div>
);

export default RensDetails;