// src/pages/Admin/OffreDetailsAdmin/OffreDetailsAdmin.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './OffreDetailsAdmin.module.css';

export interface OffreDetailed {
  id: string;
  // A – Identification de l'employeur
  denom_service: string;
  nis_service?: string;
  nif_service?: string;
  cnaps?: string;
  adresse_service?: string;
  nom_respo_offre?: string;
  tel_respo_offre?: string;
  poste_respo_offre?: string;
  // B – Description du poste
  nom_poste_offre?: string;
  nb_postes?: number;
  cadre_assimilation?: string;
  categorie_qualification?: string;
  qualification_professionnelle?: string;
  remuneration_offre?: number | string;
  indemnite_offre?: number | string;
  avntg_nature_offre?: string;
  dure_emploi_offre?: string;
  dure_essai_offre?: string;
  lieu_offre?: string;
  // C – Conditions exigées
  sexe_cond_offre?: 'M' | 'F' | '';
  age_cond_offre?: string;
  formation_b_cond_offre?: string;
  diplome_titre_equivalent_cond_offre?: string;
  localisation_cond_offre?: string;
  accepter_hors_residence?: boolean;
  autres_cond_offre?: string;
  // D – Épreuve de sélection
  nbre_candidat_epreuve?: number;
  date_epreuve?: string;
  date_recrutement_epreuve?: string;

  // état
  validated?: boolean;
  archived?: boolean;
}

/* Mock fallback (utile en dev si on ouvre la route /admin/offredetailsadmin/:id directement) */
const MOCK_OFFRES_DETAILS: Record<string, Partial<OffreDetailed>> = {
  X: {
    denom_service: 'Service Informatique',
    nis_service: '123456',
    nif_service: '654321',
    cnaps: 'CNAPS-111222',
    adresse_service: 'Antananarivo',
    nom_respo_offre: 'Rakoto Jean',
    tel_respo_offre: '+261 34 12 34 56',
    poste_respo_offre: 'RH',
    nom_poste_offre: 'Dev Backend',
    remuneration_offre: '1 200 000 MGA',
    avntg_nature_offre: 'Logement de fonction',
    dure_emploi_offre: 'CDI',
    lieu_offre: 'Antananarivo',
    sexe_cond_offre: 'M',
    age_cond_offre: '25-35',
    diplome_titre_equivalent_cond_offre: 'Bac+3 Informatique',
    accepter_hors_residence: true,
    autres_cond_offre: 'Expérience 2 ans minimum',
    nbre_candidat_epreuve: 3,
    date_epreuve: '2025-07-10',
    date_recrutement_epreuve: '2025-07-20',
    validated: false,
  },
  Y: {
    denom_service: 'Direction Générale',
    nis_service: '789012',
    nif_service: '210987',
    cnaps: 'CNAPS-333444',
    adresse_service: 'Toamasina',
    nom_respo_offre: 'Rasoanaivo Marie',
    tel_respo_offre: '+261 34 98 76 54',
    poste_respo_offre: 'Directrice RH',
    nom_poste_offre: 'Chef de projet',
    remuneration_offre: '2 000 000 MGA',
    avntg_nature_offre: 'Véhicule de service',
    dure_emploi_offre: 'CDD 12 mois',
    lieu_offre: 'Toamasina',
    sexe_cond_offre: 'F',
    age_cond_offre: '30-45',
    diplome_titre_equivalent_cond_offre: 'Bac+5 Gestion de projet',
    accepter_hors_residence: false,
    autres_cond_offre: 'Maîtrise de l’anglais',
    nbre_candidat_epreuve: 2,
    date_epreuve: '2025-08-05',
    date_recrutement_epreuve: '2025-08-15',
    validated: true,
  },
};

interface Props {
  offre?: OffreDetailed | null;
  onClose?: () => void;
  onValidate?: () => void;
  onRefuse?: () => void;
  onInvalidate?: () => void;
  onArchive?: () => void;
}

const OffreDetailsAdmin: React.FC<Props> = ({
  offre,
  onClose,
  onValidate,
  onRefuse,
  onInvalidate,
  onArchive,
}) => {
  const params = useParams<{ id?: string }>();
  let data: Partial<OffreDetailed> | null = offre ?? null;

  // si pas de prop offre, essayer via params + mock
  if (!data && params.id) {
    data = MOCK_OFFRES_DETAILS[params.id] ?? null;
    if (data) {
      data.id = params.id;
    }
  }

  if (!data) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>Offre introuvable.</div>
        <div className={styles.footer}>
          <button onClick={onClose} className={styles.closeOnly}>Fermer</button>
        </div>
      </div>
    );
  }

  const validated = !!data.validated;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.back} onClick={onClose} aria-label="Retour">←</button>
        <div className={styles.meta}>
          <h3 className={styles.title}>
            {data.nom_poste_offre ?? '—'} — <span className={styles.svc}>{data.denom_service ?? '—'}</span>
          </h3>
          <div className={styles.smallMeta}>
            <span>ID: {data.id ?? '—'}</span>
            <span>Lieu: {data.lieu_offre ?? '—'}</span>
            <span>{validated ? 'Validée' : 'En attente'}</span>
          </div>
        </div>
      </div>

      <div className={styles.sections}>
        <section className={styles.section}>
          <h4>A — Identification de l'employeur</h4>
          <dl>
            <dt>Dénomination :</dt><dd>{data.denom_service ?? '—'}</dd>
            <dt>N° STAT :</dt><dd>{data.nis_service ?? '—'}</dd>
            <dt>NIF :</dt><dd>{data.nif_service ?? '—'}</dd>
            <dt>CNAPS :</dt><dd>{data.cnaps ?? '—'}</dd>
            <dt>Adresse :</dt><dd>{data.adresse_service ?? '—'}</dd>
            <dt>Recruteur :</dt><dd>{data.nom_respo_offre ?? '—'} ({data.poste_respo_offre ?? '—'})</dd>
            <dt>Téléphone :</dt><dd>{data.tel_respo_offre ?? '—'}</dd>
          </dl>
        </section>

        <section className={styles.section}>
          <h4>B — Description du poste</h4>
          <dl>
            <dt>Appellation :</dt><dd>{data.nom_poste_offre ?? '—'}</dd>
            <dt>Nombre postes :</dt><dd>{data.nb_postes ?? '—'}</dd>
            <dt>Cadre :</dt><dd>{data.cadre_assimilation ?? '—'}</dd>
            <dt>Catégorie :</dt><dd>{data.categorie_qualification ?? '—'}</dd>
            <dt>Qualification :</dt><dd>{data.qualification_professionnelle ?? '—'}</dd>
            <dt>Rémunération :</dt><dd>{data.remuneration_offre ?? '—'}</dd>
            <dt>Indemnité :</dt><dd>{data.indemnite_offre ?? '—'}</dd>
            <dt>Avantages :</dt><dd>{data.avntg_nature_offre ?? '—'}</dd>
            <dt>Durée emploi :</dt><dd>{data.dure_emploi_offre ?? '—'}</dd>
            <dt>Durée essai :</dt><dd>{data.dure_essai_offre ?? '—'}</dd>
            <dt>Lieu :</dt><dd>{data.lieu_offre ?? '—'}</dd>
          </dl>
        </section>

        <section className={styles.section}>
          <h4>C — Conditions exigées</h4>
          <dl>
            <dt>Sexe :</dt><dd>{data.sexe_cond_offre ?? '—'}</dd>
            <dt>Classe d'âge :</dt><dd>{data.age_cond_offre ?? '—'}</dd>
            <dt>Formation :</dt><dd>{data.formation_b_cond_offre ?? '—'}</dd>
            <dt>Diplômes :</dt><dd>{data.diplome_titre_equivalent_cond_offre ?? '—'}</dd>
            <dt>Lieu de résidence :</dt><dd>{data.localisation_cond_offre ?? '—'}</dd>
            <dt>Accepte hors résidence :</dt><dd>{data.accepter_hors_residence ? 'Oui' : 'Non'}</dd>
            <dt>Autres conditions :</dt><dd>{data.autres_cond_offre ?? '—'}</dd>
          </dl>
        </section>

        <section className={styles.section}>
          <h4>D — Épreuve de sélection</h4>
          <dl>
            <dt>Nombre candidats :</dt><dd>{data.nbre_candidat_epreuve ?? '—'}</dd>
            <dt>Date épreuve :</dt><dd>{data.date_epreuve ?? '—'}</dd>
            <dt>Date recrutement :</dt><dd>{data.date_recrutement_epreuve ?? '—'}</dd>
          </dl>
        </section>
      </div>

      <div className={styles.footer}>
        {validated ? (
          <>
            <button className={styles.invalid} onClick={onInvalidate}>Invalider</button>
            <button className={styles.archive} onClick={onArchive}>Archiver</button>
          </>
        ) : (
          <>
            <button className={styles.valid} onClick={onValidate}>Valider</button>
            <button className={styles.refuse} onClick={onRefuse}>Refuser</button>
          </>
        )}
      </div>
    </div>
  );
};

export default OffreDetailsAdmin;
