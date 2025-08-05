// src/pages/Etablissement/OffreEmploiForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './OffreEmploiForm.module.css';

interface OffreEmploiData {
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
  sexe_cond_offre: 'M' | 'F' | '';
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

const OffreEmploiForm: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<OffreEmploiData>({
    denom_service: '',
    nis_service: '',
    nif_service: '',
    adresse_service: '',
    nom_respo_offre: '',
    tel_respo_offre: '',
    poste_respo_offre: '',
    nom_poste_offre: '',
    nb_postes: 1,
    cadre_assimilation: '',
    categorie_qualification: '',
    qualification_professionnelle: '',
    remuneration_offre: 0,
    indemnite_offre: 0,
    avntg_nature_offre: '',
    dure_emploi_offre: '',
    dure_essai_offre: '',
    lieu_offre: '',
    sexe_cond_offre: '',
    age_cond_offre: '',
    formation_b_cond_offre: '',
    diplome_titre_equivalent_cond_offre: '',
    localisation_cond_offre: '',
    accepter_hors_residence: false,
    autres_cond_offre: '',
    nbre_candidat_epreuve: 1,
    date_epreuve: '',
    date_recrutement_epreuve: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setData(d => ({
      ...d,
      [name]:
        type === 'checkbox'
          ? checked
          : type === 'number'
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Submit the complete data object to your API endpoint
      await fetch('/api/offre-complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      alert('Offre d’emploi créée avec succès !');
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la création de l’offre.');
    }
  };

  const handleReset = () => {
    setData({
      denom_service: '',
      nis_service: '',
      nif_service: '',
      adresse_service: '',
      nom_respo_offre: '',
      tel_respo_offre: '',
      poste_respo_offre: '',
      nom_poste_offre: '',
      nb_postes: 1,
      cadre_assimilation: '',
      categorie_qualification: '',
      qualification_professionnelle: '',
      remuneration_offre: 0,
      indemnite_offre: 0,
      avntg_nature_offre: '',
      dure_emploi_offre: '',
      dure_essai_offre: '',
      lieu_offre: '',
      sexe_cond_offre: '',
      age_cond_offre: '',
      formation_b_cond_offre: '',
      diplome_titre_equivalent_cond_offre: '',
      localisation_cond_offre: '',
      accepter_hors_residence: false,
      autres_cond_offre: '',
      nbre_candidat_epreuve: 1,
      date_epreuve: '',
      date_recrutement_epreuve: '',
    });
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Formulaire Offre d’emploi</h3>
      <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
        {/* A – Identification de l'employeur */}
        <fieldset>
          <legend>A – Identification de l'employeur</legend>
          <label>
            Dénomination du Service
            <input name="denom_service" value={data.denom_service} onChange={handleChange} required />
          </label>
          <label>
            N° STATISTIQUE
            <input name="nis_service" value={data.nis_service} onChange={handleChange} required />
          </label>
          <label>
            NIF
            <input name="nif_service" value={data.nif_service} onChange={handleChange} required />
          </label>
          <label>
            Adresse
            <input name="adresse_service" value={data.adresse_service} onChange={handleChange} required />
          </label>
          <label>
            Responsable du recrutement – Nom & Prénoms
            <input name="nom_respo_offre" value={data.nom_respo_offre} onChange={handleChange} required />
          </label>
          <label>
            Téléphone
            <input name="tel_respo_offre" type="tel" value={data.tel_respo_offre} onChange={handleChange} />
          </label>
          <label>
            Poste
            <input name="poste_respo_offre" value={data.poste_respo_offre} onChange={handleChange} />
          </label>
        </fieldset>

        {/* B – Description du poste */}
        <fieldset>
          <legend>B – Description du poste</legend>
          <label>
            1. Appellation du poste
            <input name="nom_poste_offre" value={data.nom_poste_offre} onChange={handleChange} required />
          </label>
          <label>
            2. Nombre de postes à pourvoir
            <input name="nb_postes" type="number" min={1} value={data.nb_postes} onChange={handleChange} required />
          </label>
          <label>
            3. Cadre d'assimilation
            <input name="cadre_assimilation" value={data.cadre_assimilation} onChange={handleChange} />
          </label>
          <label>
            Catégorie de Qualification
            <input name="categorie_qualification" value={data.categorie_qualification} onChange={handleChange} />
          </label>
          <label>
            Qualification Professionnelle
            <input name="qualification_professionnelle" value={data.qualification_professionnelle} onChange={handleChange} />
          </label>
          <label>
            4. Rémunération (en Ariary)
            <input name="remuneration_offre" type="number" value={data.remuneration_offre} onChange={handleChange} />
          </label>
          <label>
            Indemnité
            <input name="indemnite_offre" type="number" value={data.indemnite_offre} onChange={handleChange} />
          </label>
          <label>
            Avantages et natures
            <input name="avntg_nature_offre" value={data.avntg_nature_offre} onChange={handleChange} />
          </label>
          <label>
            5. Durée de l'emploi
            <input name="dure_emploi_offre" type="text" value={data.dure_emploi_offre} onChange={handleChange} />
          </label>
          <label>
            6. Durée de l'essai
            <input name="dure_essai_offre" type="text" value={data.dure_essai_offre} onChange={handleChange} />
          </label>
          <label>
            7. Lieu d'emploi
            <input name="lieu_offre" value={data.lieu_offre} onChange={handleChange} />
          </label>
        </fieldset>

        {/* C – Conditions exigées des candidats */}
        <fieldset>
          <legend>C – Conditions exigées des candidats</legend>
          <label>
            8. Sexe
            <select name="sexe_cond_offre" value={data.sexe_cond_offre} onChange={handleChange} required>
              <option value="">—</option>
              <option value="M">M</option>
              <option value="F">F</option>
            </select>
          </label>
          <label>
            9. Classe d'âge souhaitée
            <input name="age_cond_offre" value={data.age_cond_offre} onChange={handleChange} />
          </label>
          <label>
            10. Formation de Base
            <input name="formation_b_cond_offre" value={data.formation_b_cond_offre} onChange={handleChange} />
          </label>
          <label>
            11. Diplômes et titres équivalents
            <input name="diplome_titre_equivalent_cond_offre" value={data.diplome_titre_equivalent_cond_offre} onChange={handleChange} />
          </label>
          <label>
            12. Lieu de résidence
            <input name="localisation_cond_offre" value={data.localisation_cond_offre} onChange={handleChange} />
          </label>
          <label>
            13. Accepter hors résidence ?
            <input
              name="accepter_hors_residence"
              type="checkbox"
              checked={data.accepter_hors_residence}
              onChange={handleChange}
            />
          </label>
          <label>
            14. Autres conditions
            <input name="autres_cond_offre" value={data.autres_cond_offre} onChange={handleChange} />
          </label>
        </fieldset>

        {/* D – Épreuve de sélection */}
        <fieldset>
          <legend>D – Épreuve de sélection</legend>
          <label>
            15. Nombre de candidats demandés
            <input name="nbre_candidat_epreuve" type="number" min={1} value={data.nbre_candidat_epreuve} onChange={handleChange} />
          </label>
          <label>
            16. Date de l'épreuve de sélection
            <input name="date_epreuve" type="date" value={data.date_epreuve} onChange={handleChange} />
          </label>
          <label>
            17. Date prévue de recrutement
            <input name="date_recrutement_epreuve" type="date" value={data.date_recrutement_epreuve} onChange={handleChange} />
          </label>
        </fieldset>

        <div className={styles.buttons}>
          <button type="submit" className={styles.submit}>Soumettre</button>
          <button type="reset" className={styles.reset}>Effacer tout</button>
        </div>
      </form>
    </div>
  );
};

export default OffreEmploiForm;
