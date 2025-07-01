// src/pages/Travailleur/InscriptionTrav.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './InscriptionTrav.module.css';

interface InscriptionTravData {
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

const InscriptionTrav: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<InscriptionTravData>({
    nom: '',
    prenom: '',
    cin: '',
    dateNaissance: '',
    lieuNaissance: '',
    cnaps: '',
    sexe: '',
    nationalite: '',
    situationMatrimoniale: '',
    personnesCharge: '',
    adresse: '',
    telephone: '',
    premierChoixEmploi: '',
    deuxiemeChoixEmploi: '',
    dateDebutRecherche: '',
    diplomes: '',
    formations: '',
    languesEtrangeres: '',
    experiencePro: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Inscription travailleur :', formData);
    alert('Inscription soumise !');
  };

  const handleReset = () => {
    setFormData({
      nom: '',
      prenom: '',
      cin: '',
      dateNaissance: '',
      lieuNaissance: '',
      cnaps: '',
      sexe: '',
      nationalite: '',
      situationMatrimoniale: '',
      personnesCharge: '',
      adresse: '',
      telephone: '',
      premierChoixEmploi: '',
      deuxiemeChoixEmploi: '',
      dateDebutRecherche: '',
      diplomes: '',
      formations: '',
      languesEtrangeres: '',
      experiencePro: '',
    });
  };

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.backButton}>Retour</button>
      <h3 className={styles.title}>Inscription Travailleur</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        {Object.keys(formData).map((key) => (
          <div key={key} className={styles.formGroup}>
            <label>
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())} :
              {key === 'diplomes' || key === 'formations' || key === 'languesEtrangeres' || key === 'experiencePro' ? (
                <textarea name={key} value={formData[key as keyof InscriptionTravData]} onChange={handleChange} />
              ) : (
                <input
                  type={key.includes('date') ? 'date' : key === 'telephone' ? 'tel' : 'text'}
                  name={key}
                  value={formData[key as keyof InscriptionTravData]}
                  onChange={handleChange}
                />
              )}
            </label>
          </div>
        ))}
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitButton}>Soumettre</button>
          <button type="button" onClick={handleReset} className={styles.resetButton}>Effacer tout</button>
        </div>
      </form>
    </div>
  );
};

export default InscriptionTrav;
