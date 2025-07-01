// src/pages/Etablissement/FermetureForm.tsx
import React, { useState, useEffect } from 'react';
import styles from './FermetureForm.module.css';

interface FermetureData {
  nomEtablissement: string;
  nis: string;
  nif: string;
  cnaps: string;
  telephone: string;
  adresse: string;
  nombreLicencies: string;
}

const FermetureForm: React.FC = () => {
  const [formData, setFormData] = useState<FermetureData>({
    nomEtablissement: '',
    nis: '',
    nif: '',
    cnaps: '',
    telephone: '',
    adresse: '',
    nombreLicencies: '',
  });

  useEffect(() => {
    const etab = {
      nomEtablissement: 'Ma Société SARL',
      nis: '123456789',
      nif: '987654321',
      cnaps: 'CNAPS-001122',
      telephone: '+261 34 00 00 00',
      adresse: 'Antananarivo, Madagascar',
    };
    setFormData(prev => ({
      ...prev,
      ...etab,
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Fermeture soumis :', formData);
    alert('Déclaration de fermeture envoyée !');
  };

  const handleReset = () => {
    setFormData(prev => ({
      ...prev,
      nombreLicencies: '',
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Déclaration de Fermeture</h3>
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
              <input type="text" name={key} value={formData[key as keyof FermetureData]} readOnly />
            </label>
          ))}
        </fieldset>

        <fieldset>
          <legend>Fermeture</legend>
          <label>
            Nombre de travailleurs licenciés :
            <input
              type="number"
              name="nombreLicencies"
              value={formData.nombreLicencies}
              onChange={handleChange}
              required
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

export default FermetureForm;
