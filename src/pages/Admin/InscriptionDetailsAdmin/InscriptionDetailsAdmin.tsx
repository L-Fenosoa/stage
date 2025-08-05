// src/pages/Admin/InscriptionDetailsAdmin.tsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './InscriptionDetailsAdmin.module.css';

interface InscriptionData {
  nom: string;
  prenom: string;
  cin: string;
  dateNaissance: string;
  lieuNaissance: string;
  cnaps: string;
  sexe: string;
  nationalite: string;
  situationMatrimoniale: string;
  personnesCharge: string;
  adresse: string;
  telephone: string;
  premierChoixEmploi: string;
  deuxiemeChoixEmploi: string;
  dateDebutRecherche: string;
  diplomes: string;
  formations: string;
  languesEtrangeres: string;
  experiencePro: string;
}

const MOCK_INSCRIPTIONS: Record<string, InscriptionData> = {
  U1: {
    nom: 'Alice',
    prenom: 'Rasoanirina',
    cin: '123456789012',
    dateNaissance: '1995-06-15',
    lieuNaissance: 'Antsirabe',
    cnaps: 'CNAPS-123',
    sexe: 'Féminin',
    nationalite: 'Malgache',
    situationMatrimoniale: 'Célibataire',
    personnesCharge: '2',
    adresse: 'Lot II A 45 Antananarivo',
    telephone: '+261341234567',
    premierChoixEmploi: 'Secrétaire',
    deuxiemeChoixEmploi: 'Assistante RH',
    dateDebutRecherche: '2025-05-01',
    diplomes: 'Licence en Gestion',
    formations: 'Formation en bureautique',
    languesEtrangeres: 'Français, Anglais',
    experiencePro: '2 ans chez XYZ Corp',
  },
  U2: {
    nom: 'Bob',
    prenom: 'Rakoto',
    cin: '987654321098',
    dateNaissance: '1990-01-20',
    lieuNaissance: 'Fianarantsoa',
    cnaps: 'CNAPS-456',
    sexe: 'Masculin',
    nationalite: 'Malgache',
    situationMatrimoniale: 'Marié',
    personnesCharge: '3',
    adresse: 'Lot III B 12 Fianarantsoa',
    telephone: '+261330112233',
    premierChoixEmploi: 'Technicien',
    deuxiemeChoixEmploi: 'Electricien',
    dateDebutRecherche: '2025-04-15',
    diplomes: 'BEP Électricité',
    formations: 'Formation maintenance industrielle',
    languesEtrangeres: 'Français',
    experiencePro: '5 ans dans secteur BTP',
  },
};

const InscriptionDetailsAdmin: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const data = id ? MOCK_INSCRIPTIONS[id] : undefined;

  if (!data) return <p>Inscrit introuvable</p>;

  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={() => navigate('/admin/inscriptionlistadmin')}>
        ← Retour
      </button>

      <div className={styles.card}>
        <h4 className={styles.title}>Inscription #{id}</h4>
        <ul className={styles.detailList}>
          {(Object.keys(data) as (keyof InscriptionData)[]).map((key) => (
            <li key={key}>
              <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())} :</strong> {data[key]}
            </li>
          ))}
        </ul>

        <div className={styles.buttonGroup}>
          <button className={styles.validate}>Valider</button>
          <button className={styles.invalidate}>Invalider</button>
        </div>
      </div>
    </div>
  );
};

export default InscriptionDetailsAdmin;
