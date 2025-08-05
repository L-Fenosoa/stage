// src/pages/Travailleur/DashboardTrav/DashboardTrav.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DashboardTrav.module.css';

interface UserInfo {
  nom: string;
  prenoms: string;
  dateNaissance: string;
  lieuNaissance: string;
  sexe: 'M' | 'F';
  adresse: string;
  telephone: string;
  situationMatrimoniale: 'Marié(e)' | 'Célibataire' | 'Divorcé(e)' | 'Veuf/Veuve';
  niveauEducation: string;
  formationsExtra: string;
  experiencePro: string;
  situationActuelle: string;
  emploiEnvisage: string;
  langues: string;
}

interface Offre {
  id: string;
  // A – Identification de l'employeur
  denom_service: string;
  nis_service: string;
  nif_service: string;
  adresse_service: string;
  nom_respo_offre: string;
  tel_respo_offre: string;
  poste_respo_offre: string;
  // B – Description du poste
  nom_poste_offre: string;
  nb_postes: number;
  cadre_assimilation: string;
  categorie_qualification: string;
  qualification_professionnelle: string;
  remuneration_offre: number;
  indemnite_offre: number;
  avntg_nature_offre: string;
  dure_emploi_offre: string;
  dure_essai_offre: string;
  lieu_offre: string;
  // C – Conditions exigées
  sexe_cond_offre: 'M' | 'F';
  age_cond_offre: string;
  formation_b_cond_offre: string;
  diplome_titre_equivalent_cond_offre: string;
  localisation_cond_offre: string;
  accepter_hors_residence: boolean;
  autres_cond_offre: string;
  // D – Épreuve de sélection
  nbre_candidat_epreuve: number;
  date_epreuve: string;
  date_recrutement_epreuve: string;
}

const INITIAL_USER: UserInfo = {
  nom: 'Rakoto',
  prenoms: 'Jean',
  dateNaissance: '1990-01-15',
  lieuNaissance: 'Antananarivo',
  sexe: 'M',
  adresse: 'Lot II M 123, Antananarivo',
  telephone: '+261 34 12 34 56',
  situationMatrimoniale: 'Célibataire',
  niveauEducation: 'Licence Informatique',
  formationsExtra: 'React avancé (2022)',
  experiencePro: '2 ans comme développeur frontend',
  situationActuelle: 'Emploi (CDI à Antananarivo depuis 2024)',
  emploiEnvisage: 'Développeur Full Stack',
  langues: 'Français, Anglais',
};

const MOCK_OFFRES: Offre[] = [
  {
    id: '1',
    denom_service: 'Société XYZ',
    nis_service: '123456',
    nif_service: '654321',
    adresse_service: 'Antananarivo, Lot II M 123',
    nom_respo_offre: 'Rakoto Jean',
    tel_respo_offre: '+261 34 12 34 56',
    poste_respo_offre: 'Responsable RH',
    nom_poste_offre: 'Développeur Full Stack',
    nb_postes: 2,
    cadre_assimilation: 'Informatique',
    categorie_qualification: 'Tertiaire',
    qualification_professionnelle: 'Développement web',
    remuneration_offre: 2500000,
    indemnite_offre: 200000,
    avntg_nature_offre: 'Véhicule de fonction',
    dure_emploi_offre: 'CDI',
    dure_essai_offre: '3 mois',
    lieu_offre: 'Antananarivo',
    sexe_cond_offre: 'M',
    age_cond_offre: '25-40 ans',
    formation_b_cond_offre: 'Bac+3',
    diplome_titre_equivalent_cond_offre: 'Licence Informatique',
    localisation_cond_offre: 'Antananarivo',
    accepter_hors_residence: true,
    autres_cond_offre: 'Maîtrise React',
    nbre_candidat_epreuve: 5,
    date_epreuve: '2025-07-15',
    date_recrutement_epreuve: '2025-08-01',
  },
  // … autres offres éventuelles …
];

const EditIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z"/>
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20">
    <path d="M12 5c-7.633 0-11.99 6.522-11.99 6.522s4.358 6.478 11.99 6.478c7.633 0 11.99-6.478 11.99-6.478S19.633 5 12 5zm0 11a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z"/>
    <circle cx="12" cy="11.5" r="2.5"/>
  </svg>
);

const DashboardTrav: React.FC = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(INITIAL_USER);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(userInfo);

  const [modalOffreOpen, setModalOffreOpen] = useState(false);
  const [selectedOffre, setSelectedOffre] = useState<Offre | null>(null);

  const openEdit = () => {
    setDraft(userInfo);
    setIsEditing(true);
  };
  const cancelEdit = () => setIsEditing(false);
  const saveEdit = () => {
    setUserInfo(draft);
    setIsEditing(false);
  };

  const handleUserChange = (field: keyof UserInfo, value: string | boolean) => {
    setDraft(prev => ({ ...prev, [field]: value as any }));
  };

  const openOffreModal = (offre: Offre) => {
    setSelectedOffre(offre);
    setModalOffreOpen(true);
  };
  const closeOffreModal = () => setModalOffreOpen(false);

  return (
    <main className={styles.container}>
      <button className={styles.back} onClick={() => navigate('/')}>
        ← Accueil
      </button>

      <h1 className={styles.title}>Tableau de bord Travailleur</h1>

      {/* I – Mes informations */}
      <section className={styles.profileSection}>
        <header className={styles.header}>
          <h2>Mes informations</h2>
          <button onClick={openEdit} className={styles.btnEdit}>
            <EditIcon /> Modifier
          </button>
        </header>

        {isEditing ? (
          <form
            className={styles.form}
            onSubmit={e => { e.preventDefault(); saveEdit(); }}
          >
            {(
              [
                { label: 'Nom', field: 'nom', type: 'text' },
                { label: 'Prénoms', field: 'prenoms', type: 'text' },
                { label: 'Date de naissance', field: 'dateNaissance', type: 'date' },
                { label: 'Lieu de naissance', field: 'lieuNaissance', type: 'text' },
                { label: 'Sexe', field: 'sexe', type: 'select', options: ['M','F'] },
                { label: 'Adresse', field: 'adresse', type: 'text' },
                { label: 'Téléphone', field: 'telephone', type: 'tel' },
                {
                  label: 'Situation matrimoniale',
                  field: 'situationMatrimoniale',
                  type: 'select',
                  options: ['Marié(e)','Célibataire','Divorcé(e)','Veuf/Veuve']
                },
                { label: 'Niveau d’éducation', field: 'niveauEducation', type: 'text' },
                { label: 'Formations extra-professionnelles', field: 'formationsExtra', type: 'textarea' },
                { label: 'Expériences professionnelles', field: 'experiencePro', type: 'textarea' },
                { label: 'Situation actuelle', field: 'situationActuelle', type: 'text' },
                { label: 'Emploi envisagé', field: 'emploiEnvisage', type: 'text' },
                { label: 'Langues', field: 'langues', type: 'text' }
              ] as const
            ).map(({ label, field, type, options }) => (
              <label key={field} className={styles.field}>
                {label}
                {type === 'textarea' ? (
                  <textarea
                    value={(draft as any)[field]}
                    onChange={e => handleUserChange(field, e.target.value)}
                  />
                ) : type === 'select' && options ? (
                  <select
                    value={(draft as any)[field]}
                    onChange={e => handleUserChange(field, e.target.value)}
                  >
                    {options.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={type}
                    value={(draft as any)[field]}
                    onChange={e => handleUserChange(field, e.target.value)}
                  />
                )}
              </label>
            ))}
            <div className={styles.actions}>
              <button type="button" onClick={cancelEdit}  className={styles.btnCancel}>
                Annuler
              </button>
              <button type="submit" className={styles.btnSave}>
                Enregistrer
              </button>
            </div>
          </form>
        ) : (
          <dl className={styles.infoList}>
            {Object.entries(userInfo).map(([key, val]) => (
              <React.Fragment key={key}>
                <dt>{key.replace(/([A-Z])/g, ' $1')}</dt>
                <dd>{val}</dd>
              </React.Fragment>
            ))}
          </dl>
        )}
      </section>

      {/* II – Offres d’emploi */}
      <section className={styles.offresSection}>
        <header className={styles.header}>
          <h2>Offres d’emploi disponibles</h2>
        </header>
        <ul className={styles.offresList}>
          {MOCK_OFFRES.map(offre => (
            <li key={offre.id} className={styles.offreItem}>
              <div>
                <strong>{offre.denom_service}</strong> — {offre.nom_poste_offre} ({offre.lieu_offre})
              </div>
              <button
                onClick={() => openOffreModal(offre)}
                className={styles.btnDetail}
                aria-label="Voir détails"
              >
                <EyeIcon />
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Modal détails offre */}
      {modalOffreOpen && selectedOffre && (
        <div className={styles.modalOverlay} onClick={closeOffreModal}>
          <div className={styles.modalDetails} onClick={e => e.stopPropagation()}>
            <h3>{selectedOffre.nom_poste_offre} — {selectedOffre.denom_service}</h3>
            <p><strong>Service :</strong> {selectedOffre.denom_service}</p>
            <p><strong>N° STATISTIQUE :</strong> {selectedOffre.nis_service}</p>
            <p><strong>NIF :</strong> {selectedOffre.nif_service}</p>
            <p><strong>Adresse :</strong> {selectedOffre.adresse_service}</p>
            <p><strong>Responsable :</strong> {selectedOffre.nom_respo_offre} ({selectedOffre.poste_respo_offre})</p>
            <p><strong>Tél :</strong> {selectedOffre.tel_respo_offre}</p>
            <hr/>
            <p><strong>Poste à pourvoir :</strong> {selectedOffre.nom_poste_offre}</p>
            <p><strong>Nombre de postes :</strong> {selectedOffre.nb_postes}</p>
            <p><strong>Cadre :</strong> {selectedOffre.cadre_assimilation}</p>
            <p><strong>Qualification :</strong> {selectedOffre.qualification_professionnelle} ({selectedOffre.categorie_qualification})</p>
            <p><strong>Rémunération :</strong> {selectedOffre.remuneration_offre} MGA</p>
            <p><strong>Indemnité :</strong> {selectedOffre.indemnite_offre} MGA</p>
            <p><strong>Avantages :</strong> {selectedOffre.avntg_nature_offre}</p>
            <p><strong>Durée contrat :</strong> {selectedOffre.dure_emploi_offre} (essai {selectedOffre.dure_essai_offre})</p>
            <p><strong>Lieu :</strong> {selectedOffre.lieu_offre}</p>
            <hr/>
            <h4>Conditions exigées</h4>
            <p>Sexe : {selectedOffre.sexe_cond_offre}</p>
            <p>Âge : {selectedOffre.age_cond_offre}</p>
            <p>Formation : {selectedOffre.formation_b_cond_offre}</p>
            <p>Diplômes : {selectedOffre.diplome_titre_equivalent_cond_offre}</p>
            <p>Résidence : {selectedOffre.localisation_cond_offre}</p>
            <p>Hors résidence : {selectedOffre.accepter_hors_residence ? 'Oui' : 'Non'}</p>
            <p>Autres conditions : {selectedOffre.autres_cond_offre}</p>
            <hr/>
            <h4>Épreuve de sélection</h4>
            <p>Candidats demandés : {selectedOffre.nbre_candidat_epreuve}</p>
            <p>Date épreuve : {selectedOffre.date_epreuve}</p>
            <p>Date recrutement : {selectedOffre.date_recrutement_epreuve}</p>
            <button className={styles.btnClose} onClick={closeOffreModal}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default DashboardTrav;
