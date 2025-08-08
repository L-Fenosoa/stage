import React from 'react';
import styles from './DeclarationDetails.module.css';

interface DeclarationDetailsData {
  id: string;
  type: 'Ouverture' | 'Réouverture' | 'Fermeture';
  
  // Informations générales (tous types)
  nom_etab: string;
  num_dos_etab: string;
  id_fiscal_etab: string;
  immatricule_cnaps_etab: string;
  tel_etab: string;
  commune: string;
  district: string;
  region: string;
  province: string;
  
  // Ouverture spécifique
  status_juridique?: string;
  activite_principal_etab?: string;
  activites_secondaires_etab?: string;
  nbre_travailleur_embaucher_etab?: number;
  maison_mere_etab?: string;
  
  // Réouverture spécifique
  nouvelles_activites?: string;
  effectifAuMoment?: number;
  
  // Fermeture spécifique
  nbre_travailleur_licencier_etab?: number;
}

const MOCK_DECLARATIONS_DETAILS: Record<string, DeclarationDetailsData> = {
  '1': {
    id: '1',
    type: 'Ouverture',
    nom_etab: 'Société XYZ',
    num_dos_etab: '12345678901234567',
    id_fiscal_etab: '12345678901234',
    immatricule_cnaps_etab: 'CNAPS12345',
    tel_etab: '+261 34 12 34 56',
    commune: 'Antananarivo',
    district: 'Analamanga',
    region: 'Analamanga',
    province: 'Antananarivo',
    status_juridique: 'SARL',
    activite_principal_etab: 'Commerce de détail',
    activites_secondaires_etab: 'Import-export',
    nbre_travailleur_embaucher_etab: 25,
    maison_mere_etab: '123 Rue Commerce, Antananarivo',
  },
  '2': {
    id: '2',
    type: 'Réouverture',
    nom_etab: 'Entreprise ABC',
    num_dos_etab: '98765432109876543',
    id_fiscal_etab: '98765432109876',
    immatricule_cnaps_etab: 'CNAPS67890',
    tel_etab: '+261 34 98 76 54',
    commune: 'Toamasina',
    district: 'Atsinanana',
    region: 'Atsinanana',
    province: 'Toamasina',
    nouvelles_activites: 'Atelier numérique et services cloud',
    effectifAuMoment: 40,
  },
  '3': {
    id: '3',
    type: 'Fermeture',
    nom_etab: 'Usine 123',
    num_dos_etab: '54321678901234567',
    id_fiscal_etab: '54321678901234',
    immatricule_cnaps_etab: 'CNAPS54321',
    tel_etab: '+261 33 24 68 10',
    commune: 'Fianarantsoa',
    district: 'Haute Matsiatra',
    region: 'Haute Matsiatra',
    province: 'Fianarantsoa',
    nbre_travailleur_licencier_etab: 60,
  },
};

interface DeclarationDetailsProps {
  id: string;
  onClose: () => void;
}

const DeclarationDetails: React.FC<DeclarationDetailsProps> = ({ id, onClose }) => {
  const data = id ? MOCK_DECLARATIONS_DETAILS[id] : undefined;

  if (!data) {
    return (
      <div className={styles.modalContainer}>
        <p className={styles.error}>Déclaration non trouvée.</p>
        <button className={styles.close} onClick={onClose}>
          &times;
        </button>
      </div>
    );
  }

  return (
    <div className={styles.modalContainer}>
      <button className={styles.close} onClick={onClose}>
        &times;
      </button>

      <div className={styles.card}>
        <h4 className={styles.title}>Déclaration #{data.id} - {data.type}</h4>
        
        <div className={styles.infoGrid}>
          <div className={styles.infoSection}>
            <h5>Informations Générales</h5>
            <InfoItem label="Nom établissement" value={data.nom_etab} />
            <InfoItem label="N° identification statistique" value={data.num_dos_etab} />
            <InfoItem label="N° identification fiscal" value={data.id_fiscal_etab} />
            <InfoItem label="Immat. CNAPS" value={data.immatricule_cnaps_etab} />
            <InfoItem label="Téléphone" value={data.tel_etab} />
            <InfoItem label="Commune" value={data.commune} />
            <InfoItem label="District" value={data.district} />
            <InfoItem label="Région" value={data.region} />
            <InfoItem label="Province" value={data.province} />
          </div>

          {/* Section spécifique au type de déclaration */}
          <div className={styles.infoSection}>
            {data.type === 'Ouverture' && (
              <>
                <h5>Détails d'Ouverture</h5>
                <InfoItem label="Statut juridique" value={data.status_juridique} />
                <InfoItem label="Activité principale" value={data.activite_principal_etab} />
                <InfoItem 
                  label="Activité(s) secondaire(s)" 
                  value={data.activites_secondaires_etab} 
                />
                <InfoItem 
                  label="Nombre travailleurs embauchés" 
                  value={data.nbre_travailleur_embaucher_etab?.toString()} 
                />
                <InfoItem 
                  label="Adresse maison mère" 
                  value={data.maison_mere_etab} 
                />
              </>
            )}

            {data.type === 'Réouverture' && (
              <>
                <h5>Détails de Réouverture</h5>
                <InfoItem 
                  label="Effectif à la réouverture" 
                  value={data.effectifAuMoment?.toString()} 
                />
                <InfoItem 
                  label="Nouvelles activités" 
                  value={data.nouvelles_activites} 
                />
              </>
            )}

            {data.type === 'Fermeture' && (
              <>
                <h5>Détails de Fermeture</h5>
                <InfoItem 
                  label="Nombre de licenciés" 
                  value={data.nbre_travailleur_licencier_etab?.toString()} 
                />
              </>
            )}
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.validate}>Valider</button>
          <button className={styles.invalidate}>Invalider</button>
        </div>
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

export default DeclarationDetails;