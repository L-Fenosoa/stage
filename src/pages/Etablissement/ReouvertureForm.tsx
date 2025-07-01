// src/pages/Etablissement/ReouvertureForm.tsx
import React, { useState, useEffect } from 'react';
import styles from './ReouvertureForm.module.css';

interface ReouvertureData {
  nomEtablissement: string;
  nis: string;
  nif: string;
  cnaps: string;
  telephone: string;
  adresse: string;
  effectifAuMoment: string;
  nouvellesActivites: string;
}

const ReouvertureForm: React.FC = () => {
  const [formData, setFormData] = useState<ReouvertureData>({
    nomEtablissement: '',
    nis: '',
    nif: '',
    cnaps: '',
    telephone: '',
    adresse: '',
    effectifAuMoment: '',
    nouvellesActivites: '',
  });

  useEffect(() => {
    const etab = {
      nomEtablissement: 'Ma Société SARL',
      nis: '123456',
      nif: '654321',
      cnaps: 'CNAPS-7890',
      telephone: '+261 34 12 34 56',
      adresse: 'Antananarivo, Madagascar',
    };
    setFormData(prev => ({
      ...prev,
      ...etab
    }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Réouverture soumis :', formData);
    alert('Déclaration de réouverture envoyée !');
  };

  const handleReset = () => {
    setFormData(prev => ({
      ...prev,
      effectifAuMoment: '',
      nouvellesActivites: '',
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Déclaration de Réouverture</h3>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <fieldset>
          <legend>Établissement</legend>
          {[
            { label: 'Nom ou raison sociale', key: 'nomEtablissement' },
            { label: 'NIS', key: 'nis' },
            { label: 'NIF', key: 'nif' },
            { label: 'Immat. CNAPS', key: 'cnaps' },
            { label: 'Téléphone', key: 'telephone' },
            { label: 'Adresse', key: 'adresse' }
          ].map(({ label, key }) => (
            <label key={key}>
              {label} :
              <input type="text" name={key} value={formData[key as keyof ReouvertureData]} readOnly />
            </label>
          ))}
        </fieldset>

        <fieldset>
          <legend>Informations de Réouverture</legend>
          <label>
            Effectif au moment de la réouverture :
            <input
              type="number"
              name="effectifAuMoment"
              value={formData.effectifAuMoment}
              onChange={handleChange}
            />
          </label>
          <label>
            Nouvelles activités/produits :
            <textarea
              name="nouvellesActivites"
              value={formData.nouvellesActivites}
              onChange={handleChange}
            />
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

export default ReouvertureForm;
