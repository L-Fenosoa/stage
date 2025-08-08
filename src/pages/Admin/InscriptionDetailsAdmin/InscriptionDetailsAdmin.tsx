import React from 'react';
import styles from './InscriptionDetailsAdmin.module.css';

export interface InscriptionTravData {
  nom: string;
  prenoms: string;
  dateNaissance: string;
  lieuNaissance: string;
  cnaps: string;
  cin: string;
  nationalite: string;
  situationMatrimoniale: string;
  enfantsCharge: number;
  adultesCharge: number;
  totalCharge: number;
  adresse: string;
  region: string;
  district: string;
  telephone: string;
  poste1: string;
  poste2: string;
  internat: boolean;
  dateRecherche: string;
  niveauEtude: string;
  diplome1: string;
  diplome2: string;
  diplome3: string;
  saitLire: boolean;
  saitEcrire: boolean;
  formations: string;
  languesParlees: string;
  languesEcrites: string;
  experiencePro: boolean;
  activiteActuelle: string;
  travailLieuEloigne: boolean;
  serviceNational: string;
}

const MOCK: Record<string, InscriptionTravData> = {
  T1: {
    nom: 'Rakoto',
    prenoms: 'Jean',
    dateNaissance: '1990-01-15',
    lieuNaissance: 'Antananarivo',
    cnaps: 'CNAPS-111',
    cin: '123456789012',
    nationalite: 'Malgache',
    situationMatrimoniale: 'Célibataire',
    enfantsCharge: 0,
    adultesCharge: 0,
    totalCharge: 0,
    adresse: 'Lot II M 123, Antananarivo',
    region: 'Analamanga',
    district: 'Antananarivo',
    telephone: '+261341234567',
    poste1: 'Développeur Full Stack',
    poste2: 'Technicien',
    internat: false,
    dateRecherche: '2025-06',
    niveauEtude: 'Licence',
    diplome1: 'Licence Informatique',
    diplome2: '',
    diplome3: '',
    saitLire: true,
    saitEcrire: true,
    formations: 'React avancé',
    languesParlees: 'Français, Anglais',
    languesEcrites: 'Français',
    experiencePro: true,
    activiteActuelle: "Tsy an'asa",
    travailLieuEloigne: false,
    serviceNational: 'Non concerné(e)',
  },
  // ajoute d'autres mocks si besoin
};

interface Props {
  id: string;
  data?: InscriptionTravData; // optionnel — si fourni, on l'utilise
  isPending?: boolean; // si true => montre Valider/Invalider
  onClose: () => void;
  onValidate?: (id: string) => Promise<void> | void;
  onInvalidate?: (id: string) => Promise<void> | void;
}

const humanLabel = (k: keyof InscriptionTravData) => {
  const map: Partial<Record<keyof InscriptionTravData, string>> = {
    nom: 'Nom',
    prenoms: 'Prénoms',
    dateNaissance: 'Date de naissance',
    lieuNaissance: 'Lieu de naissance',
    cnaps: 'CNaPS',
    cin: 'CIN',
    nationalite: 'Nationalité',
    situationMatrimoniale: 'Situation matrimoniale',
    enfantsCharge: 'Enfants à charge',
    adultesCharge: 'Adultes à charge',
    totalCharge: 'Total à charge',
    adresse: 'Adresse',
    region: 'Région',
    district: 'District',
    telephone: 'Téléphone',
    poste1: 'Poste 1',
    poste2: 'Poste 2',
    internat: 'Internat',
    dateRecherche: 'Date recherche',
    niveauEtude: 'Niveau d’étude',
    diplome1: 'Diplôme 1',
    diplome2: 'Diplôme 2',
    diplome3: 'Diplôme 3',
    saitLire: 'Sait lire',
    saitEcrire: 'Sait écrire',
    formations: 'Formations complémentaires',
    languesParlees: 'Langues parlées',
    languesEcrites: 'Langues écrites',
    experiencePro: 'Expérience pro',
    activiteActuelle: 'Activité actuelle',
    travailLieuEloigne: 'Travail lieu éloigné',
    serviceNational: 'Service national',
  };
  return map[k] ?? (String(k) as string);
};

const InscriptionDetailsAdmin: React.FC<Props> = ({
  id,
  data,
  isPending = false,
  onClose,
  onValidate,
  onInvalidate,
}) => {
  const record = data ?? MOCK[id];

  if (!record) {
    return (
      <div className={styles.container}>
        <button className={styles.back} onClick={onClose}>← Retour</button>
        <div className={styles.card}>
          <p>Inscription introuvable.</p>
        </div>
      </div>
    );
  }

  const handleValidate = async () => {
    if (onValidate) {
      await onValidate(id);
    } else {
      // mock behaviour
      alert(`Inscription ${id} validée (mock).`);
    }
    onClose();
  };

  const handleInvalidate = async () => {
    if (onInvalidate) {
      await onInvalidate(id);
    } else {
      alert(`Inscription ${id} refusée (mock).`);
    }
    onClose();
  };

  // Préparer affichage ordonné des champs (liste)
  const entries: Array<[keyof InscriptionTravData, string]> = [
    ['nom', record.nom],
    ['prenoms', record.prenoms],
    ['cin', record.cin],
    ['dateNaissance', record.dateNaissance],
    ['lieuNaissance', record.lieuNaissance],
    ['cnaps', record.cnaps],
    ['nationalite', record.nationalite],
    ['situationMatrimoniale', record.situationMatrimoniale],
    ['enfantsCharge', String(record.enfantsCharge)],
    ['adultesCharge', String(record.adultesCharge)],
    ['totalCharge', String(record.totalCharge)],
    ['adresse', record.adresse],
    ['region', record.region],
    ['district', record.district],
    ['telephone', record.telephone],
    ['poste1', record.poste1],
    ['poste2', record.poste2],
    ['internat', record.internat ? 'Oui' : 'Non'],
    ['dateRecherche', record.dateRecherche],
    ['niveauEtude', record.niveauEtude],
    ['diplome1', record.diplome1],
    ['diplome2', record.diplome2],
    ['diplome3', record.diplome3],
    ['saitLire', record.saitLire ? 'Oui' : 'Non'],
    ['saitEcrire', record.saitEcrire ? 'Oui' : 'Non'],
    ['formations', record.formations],
    ['languesParlees', record.languesParlees],
    ['languesEcrites', record.languesEcrites],
    ['experiencePro', record.experiencePro ? 'Oui' : 'Non'],
    ['activiteActuelle', record.activiteActuelle],
    ['travailLieuEloigne', record.travailLieuEloigne ? 'Oui' : 'Non'],
    ['serviceNational', record.serviceNational],
  ];

  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={onClose} aria-label="Retour">← Retour</button>

      <div className={styles.card}>
        <h4 className={styles.title}>Inscription #{id}</h4>

        <div className={styles.grid}>
          {entries.map(([key, val]) => (
            <div className={styles.row} key={String(key)}>
              <div className={styles.k}>{humanLabel(key)}</div>
              <div className={styles.v}>{val ?? '—'}</div>
            </div>
          ))}
        </div>

        <div className={styles.buttonGroup}>
          {isPending ? (
            <>
              <button className={styles.validate} onClick={handleValidate}>Valider</button>
              <button className={styles.invalidate} onClick={handleInvalidate}>Invalider</button>
            </>
          ) : (
            <div className={styles.noActions}>Travailleur déjà inscrit — aucune action requise.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InscriptionDetailsAdmin;
