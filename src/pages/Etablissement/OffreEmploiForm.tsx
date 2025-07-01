// src/pages/Etablissement/OffreEmploiForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './OffreEmploiForm.module.css';

interface OffreEmploiData {
  denominationService: string;
  nis: string;
  nif: string;
  cnaps: string;
  adresseEtab: string;
  recruteurNom: string;
  recruteurTelephone: string;
  recruteurPoste: string;
  appellationPoste: string;
  remuneration: string;
  avantageNature: string;
  dureeEmploi: string;
  lieuEmploi: string;
  sexe: string;
  classeAge: string;
  diplomes: string;
  lieuResidence: string;
  autresConditions: string;
  nombreCandidats: string;
  dateEpreuve: string;
  dateRecrutement: string;
}

const OffreEmploiForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<OffreEmploiData>({
    denominationService: '',
    nis: '',
    nif: '',
    cnaps: '',
    adresseEtab: '',
    recruteurNom: '',
    recruteurTelephone: '',
    recruteurPoste: '',
    appellationPoste: '',
    remuneration: '',
    avantageNature: '',
    dureeEmploi: '',
    lieuEmploi: '',
    sexe: '',
    classeAge: '',
    diplomes: '',
    lieuResidence: '',
    autresConditions: '',
    nombreCandidats: '',
    dateEpreuve: '',
    dateRecrutement: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Offre d’emploi soumise :', formData);
    alert('Formulaire d’offre d’emploi soumis !');
  };

  const handleReset = () => {
    setFormData({
      denominationService: '',
      nis: '',
      nif: '',
      cnaps: '',
      adresseEtab: '',
      recruteurNom: '',
      recruteurTelephone: '',
      recruteurPoste: '',
      appellationPoste: '',
      remuneration: '',
      avantageNature: '',
      dureeEmploi: '',
      lieuEmploi: '',
      sexe: '',
      classeAge: '',
      diplomes: '',
      lieuResidence: '',
      autresConditions: '',
      nombreCandidats: '',
      dateEpreuve: '',
      dateRecrutement: '',
    });
  };

  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={() => navigate(-1)}>
        ← Retour
      </button>

      <header className={styles.header}>
        <h3 className={styles.title}>Formulaire Offre d’emploi</h3>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* A – Identification de l’employeur */}
        <fieldset>
          <legend>A – Identification de l’employeur</legend>
          <label>Dénomination du service :
            <input type="text" name="denominationService" value={formData.denominationService} onChange={handleChange} />
          </label>
          <label>NIS :
            <input type="text" name="nis" value={formData.nis} onChange={handleChange} />
          </label>
          <label>NIF :
            <input type="text" name="nif" value={formData.nif} onChange={handleChange} />
          </label>
          <label>N° CNAPS :
            <input type="text" name="cnaps" value={formData.cnaps} onChange={handleChange} />
          </label>
          <label>Adresse :
            <input type="text" name="adresseEtab" value={formData.adresseEtab} onChange={handleChange} />
          </label>
          <label>Responsable recrutement – Nom :
            <input type="text" name="recruteurNom" value={formData.recruteurNom} onChange={handleChange} />
          </label>
          <label>Téléphone :
            <input type="tel" name="recruteurTelephone" value={formData.recruteurTelephone} onChange={handleChange} />
          </label>
          <label>Poste :
            <input type="text" name="recruteurPoste" value={formData.recruteurPoste} onChange={handleChange} />
          </label>
        </fieldset>

        {/* B – Description du poste */}
        <fieldset>
          <legend>B – Description du poste</legend>
          <label>Appellation du poste :
            <input type="text" name="appellationPoste" value={formData.appellationPoste} onChange={handleChange} />
          </label>
          <label>Rémunération :
            <input type="text" name="remuneration" value={formData.remuneration} onChange={handleChange} />
          </label>
          <label>Avantage en nature :
            <input type="text" name="avantageNature" value={formData.avantageNature} onChange={handleChange} />
          </label>
          <label>Durée d’emploi :
            <input type="text" name="dureeEmploi" value={formData.dureeEmploi} onChange={handleChange} />
          </label>
          <label>Lieu d’emploi :
            <input type="text" name="lieuEmploi" value={formData.lieuEmploi} onChange={handleChange} />
          </label>
        </fieldset>

        {/* C – Conditions exigées des candidats */}
        <fieldset>
          <legend>C – Conditions exigées des candidats</legend>
          <label>Sexe :
            <input type="text" name="sexe" value={formData.sexe} onChange={handleChange} />
          </label>
          <label>Classe d’âge :
            <input type="text" name="classeAge" value={formData.classeAge} onChange={handleChange} />
          </label>
          <label>Diplômes :
            <input type="text" name="diplomes" value={formData.diplomes} onChange={handleChange} />
          </label>
          <label>Lieu de résidence :
            <input type="text" name="lieuResidence" value={formData.lieuResidence} onChange={handleChange} />
          </label>
          <label>Autres :
            <input type="text" name="autresConditions" value={formData.autresConditions} onChange={handleChange} />
          </label>
        </fieldset>

        {/* D – Épreuve de sélection */}
        <fieldset>
          <legend>D – Épreuve de sélection</legend>
          <label>Nombre de candidats :
            <input type="number" name="nombreCandidats" value={formData.nombreCandidats} onChange={handleChange} />
          </label>
          <label>Date de l’épreuve :
            <input type="date" name="dateEpreuve" value={formData.dateEpreuve} onChange={handleChange} />
          </label>
          <label>Date de recrutement :
            <input type="date" name="dateRecrutement" value={formData.dateRecrutement} onChange={handleChange} />
          </label>
        </fieldset>

        <div className={styles.buttons}>
          <button type="submit" className={styles.submit}>Soumettre</button>
          <button type="button" className={styles.reset} onClick={handleReset}>Effacer tout</button>
        </div>
      </form>
    </div>
  );
};

export default OffreEmploiForm;
