import React, { useState } from 'react';
import styles from './DashboardTrav.module.css';
import { useNavigate } from 'react-router-dom';

const USER_DATA_INITIAL = {
  nom: 'Rakoto',
  prenom: 'Jean',
  telephone: '+261 34 12 34 56',
  premierChoixEmploi: 'Développeur Full Stack',
  deuxiemeChoixEmploi: 'Chef de projet',
};

const MOCK_OFFRES = [
  {
    id: '1',
    nomEtablissement: 'Société XYZ',
    poste: 'Développeur Full Stack',
    description: "Offre intéressante pour développeur full stack avec 3 ans d'expérience.",
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
  {
    id: '2',
    nomEtablissement: 'Entreprise ABC',
    poste: 'Responsable RH',
    description: "Poste de responsable RH avec gestion d'équipe.",
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
];

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="20" height="20">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z" />
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="20" height="20">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const DashboardTrav: React.FC = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(USER_DATA_INITIAL);
  const [modalUserOpen, setModalUserOpen] = useState(false);
  const [editData, setEditData] = useState(userData);
  const [modalOffreOpen, setModalOffreOpen] = useState(false);
  const [selectedOffre, setSelectedOffre] = useState<typeof MOCK_OFFRES[0] | null>(null);

  const openUserModal = () => {
    setEditData(userData);
    setModalUserOpen(true);
  };
  const closeUserModal = () => setModalUserOpen(false);
  const handleFieldChange = (field: keyof typeof editData, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };
  const handleSave = () => {
    setUserData(editData);
    setModalUserOpen(false);
  };

  const openOffreModal = (offre: typeof MOCK_OFFRES[0]) => {
    setSelectedOffre(offre);
    setModalOffreOpen(true);
  };
  const closeOffreModal = () => {
    setSelectedOffre(null);
    setModalOffreOpen(false);
  };

  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={() => navigate(-1)}>Retour</button>

      <div className={styles.pageTitle}>
        Tableau de bord Travailleur
      </div>

      <div className={styles.card}>
        <section className={styles.section}>
          <h4>Mes informations</h4>
          <ul className={styles.infoList}>
            {(Object.entries(userData) as [keyof typeof userData, string][]).map(([key, val]) => (
              <li key={key} className={styles.infoItem}>
                <span className={styles.infoText}>
                  <strong>
                    {key === 'nom' ? 'Nom' :
                     key === 'prenom' ? 'Prénom' :
                     key === 'telephone' ? 'Téléphone' :
                     key === 'premierChoixEmploi' ? '1er choix d’emploi' :
                     key === 'deuxiemeChoixEmploi' ? '2e choix d’emploi' : key}
                    :
                  </strong> {val}
                </span>
              </li>
            ))}
          </ul>
          <button className={styles.action} onClick={openUserModal} aria-label="Mettre à jour mes informations">
            <EditIcon />
          </button>
        </section>

        <section className={styles.section}>
          <h4>Offres d’emploi disponibles</h4>
          <ul className={styles.offres}>
            {MOCK_OFFRES.map(offre => (
              <li key={offre.id} className={styles.offreItem}>
                <span>
                  <strong>{offre.nomEtablissement}</strong> — {offre.poste}
                </span>
                <button className={styles.detail} onClick={() => openOffreModal(offre)} aria-label="Voir les détails">
                  <EyeIcon />
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Modal utilisateur */}
      {modalUserOpen && (
        <div className={styles.modalOverlay} onClick={closeUserModal}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h3>Modifier mes informations</h3>
            <ul className={styles.modalInfoList}>
              {(Object.entries(editData) as [keyof typeof editData, string][]).map(([key, val]) => (
                <li key={key} className={styles.modalInfoItem}>
                  <label className={styles.modalLabel} htmlFor={`input-${key}`}>
                    {key === 'nom' ? 'Nom' :
                     key === 'prenom' ? 'Prénom' :
                     key === 'telephone' ? 'Téléphone' :
                     key === 'premierChoixEmploi' ? '1er choix d’emploi' :
                     key === 'deuxiemeChoixEmploi' ? '2e choix d’emploi' : key} :
                  </label>
                  <input
                    id={`input-${key}`}
                    type="text"
                    value={val}
                    onChange={e => handleFieldChange(key, e.target.value)}
                    className={styles.modalInput}
                  />
                  <button className={styles.edit} type="button"><EditIcon /></button>
                </li>
              ))}
            </ul>
            <div className={styles.modalActions}>
              <button className={`${styles.action} ${styles.cancel}`} onClick={closeUserModal}>Annuler</button>
              <button className={`${styles.action} ${styles.save}`} onClick={handleSave}>Enregistrer</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal détails d'offre */}
      {modalOffreOpen && selectedOffre && (
        <div className={styles.modalOverlay} onClick={closeOffreModal}>
          <div className={`${styles.modal} ${styles.modalDetails}`} onClick={e => e.stopPropagation()}>
            <h3>Détails de l’offre</h3>
            <div className={styles.modalDetailsContent}>
              <p><strong>Service employeur :</strong> {selectedOffre.nomEtablissement}</p>
              <p><strong>NIS :</strong> {selectedOffre.nis}</p>
              <p><strong>NIF :</strong> {selectedOffre.nif}</p>
              <p><strong>Immat. CNAPS :</strong> {selectedOffre.cnaps}</p>
              <p><strong>Adresse :</strong> {selectedOffre.adresseEtab}</p>
              <p><strong>Recruteur :</strong> {selectedOffre.recruteurNom} - {selectedOffre.recruteurPoste} - {selectedOffre.recruteurTelephone}</p>
              <p><strong>Intitulé du poste :</strong> {selectedOffre.appellationPoste}</p>
              <p><strong>Rémunération :</strong> {selectedOffre.remuneration}</p>
              <p><strong>Avantage en nature :</strong> {selectedOffre.avantageNature}</p>
              <p><strong>Durée d’emploi :</strong> {selectedOffre.dureeEmploi}</p>
              <p><strong>Lieu d’emploi :</strong> {selectedOffre.lieuEmploi}</p>
              <p><strong>Sexe :</strong> {selectedOffre.sexe}</p>
              <p><strong>Classe d’âge :</strong> {selectedOffre.classeAge}</p>
              <p><strong>Diplômes :</strong> {selectedOffre.diplomes}</p>
              <p><strong>Lieu de résidence :</strong> {selectedOffre.lieuResidence}</p>
              <p><strong>Autres conditions :</strong> {selectedOffre.autresConditions}</p>
              <p><strong>Nombre de candidats :</strong> {selectedOffre.nombreCandidats}</p>
              <p><strong>Date de l’épreuve :</strong> {selectedOffre.dateEpreuve}</p>
              <p><strong>Date de recrutement :</strong> {selectedOffre.dateRecrutement}</p>
            </div>
            <div className={styles.modalActions}>
              <button className={`${styles.action} ${styles.cancel}`} onClick={closeOffreModal}>Fermer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardTrav;
