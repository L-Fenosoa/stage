// src/pages/Etablissement/OuvertureForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './OuvertureForm.module.css';

interface OuvertureData {
  nomEtablissement: string;
  nis: string;
  nif: string;
  cnaps: string;
  telephone: string;
  adresse: string;
  statutJuridique: string;
  activitePrincipale: string;
  activiteSecondaire: string;
  adresseMaisonMere: string;
  effectifInitial: string;
}

const OuvertureForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<OuvertureData>({
    nomEtablissement: '',
    nis: '',
    nif: '',
    cnaps: '',
    telephone: '',
    adresse: '',
    statutJuridique: '',
    activitePrincipale: '',
    activiteSecondaire: '',
    adresseMaisonMere: '',
    effectifInitial: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Ouverture soumis :', formData);
    alert('Déclaration d’ouverture envoyée !');
  };

  const handleReset = () => {
    setFormData({
      nomEtablissement: '',
      nis: '',
      nif: '',
      cnaps: '',
      telephone: '',
      adresse: '',
      statutJuridique: '',
      activitePrincipale: '',
      activiteSecondaire: '',
      adresseMaisonMere: '',
      effectifInitial: '',
    });
  };

  return (
    <div className={styles.container}>
      <button className={styles.back} type="button" onClick={() => navigate(-1)}>Retour</button>

      <div className={styles.header}>
        <h3 className={styles.title}>Déclaration d’Ouverture</h3>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <fieldset>
          <legend>Informations Générales</legend>

          <label>
            Nom ou raison sociale :
            <input type="text" name="nomEtablissement" value={formData.nomEtablissement} onChange={handleChange} />
          </label>
          <label>
            NIS :
            <input type="text" name="nis" value={formData.nis} onChange={handleChange} />
          </label>
          <label>
            NIF :
            <input type="text" name="nif" value={formData.nif} onChange={handleChange} />
          </label>
          <label>
            Immat. CNAPS :
            <input type="text" name="cnaps" value={formData.cnaps} onChange={handleChange} />
          </label>
          <label>
            Téléphone :
            <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} />
          </label>
          <label>
            Adresse :
            <input type="text" name="adresse" value={formData.adresse} onChange={handleChange} />
          </label>
          <label>
            Statut juridique :
            <input type="text" name="statutJuridique" value={formData.statutJuridique} onChange={handleChange} />
          </label>
          <label>
            Activité principale :
            <input type="text" name="activitePrincipale" value={formData.activitePrincipale} onChange={handleChange} />
          </label>
          <label>
            Activité secondaire :
            <input type="text" name="activiteSecondaire" value={formData.activiteSecondaire} onChange={handleChange} />
          </label>
          <label>
            Adresse maison mère :
            <input type="text" name="adresseMaisonMere" value={formData.adresseMaisonMere} onChange={handleChange} />
          </label>
          <label>
            Effectif initial embauché :
            <input type="number" name="effectifInitial" value={formData.effectifInitial} onChange={handleChange} />
          </label>
        </fieldset>

        <div className={styles.buttons}>
          <button className={styles.submit} type="submit">Soumettre</button>
          <button className={styles.reset} type="button" onClick={handleReset}>Effacer tout</button>
        </div>
      </form>
    </div>
  );
};

export default OuvertureForm;
