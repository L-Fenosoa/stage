// src/pages/Travailleur/InscriptionTrav/InscriptionTrav.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './InscriptionTrav.module.css';

interface InscriptionTravData {
  nom: string;
  prenoms: string;
  dateNaissance: string;
  lieuNaissance: string;
  cnaps: string;
  cin: string;
  nationalite: string;
  situationMatrimoniale: 'Marié(e)' | 'Célibataire' | 'Divorcé(e)' | 'Veuf/Veuve';
  enfantsCharge: number;
  adultesCharge: number;
  totalCharge: number;
  adresse: string;
  region: string;
  district: string;
  telephone: string;
  poste1: string;
  poste2: string;
  internat: boolean;
  dateRecherche: string; // YYYY-MM
  niveauEtude: string;
  diplome1: string;
  diplome2: string;
  diplome3: string;
  saitLire: boolean;
  saitEcrire: boolean;
  formations: string;
  languesParlees: string;
  languesEcrites: string;
  experiencePro: boolean;
  activiteActuelle:
    | 'Mpiasa mikarama'
    | 'Mpiasa mahaleotena'
    | 'Mpanao asa an-tselika'
    | 'Misotro ronono'
    | 'Mpianatra'
    | 'Tsy an\'asa';
  travailLieuEloigne: boolean;
  serviceNational:
    | 'Accompli'
    | 'En cours'
    | 'Sursitaire'
    | 'Non concerné(e)'
    | 'Exempté(e)';
}

const InscriptionTrav: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<InscriptionTravData>({
    nom: '',
    prenoms: '',
    dateNaissance: '',
    lieuNaissance: '',
    cnaps: '',
    cin: '',
    nationalite: '',
    situationMatrimoniale: 'Célibataire',
    enfantsCharge: 0,
    adultesCharge: 0,
    totalCharge: 0,
    adresse: '',
    region: '',
    district: '',
    telephone: '',
    poste1: '',
    poste2: '',
    internat: false,
    dateRecherche: '',
    niveauEtude: '',
    diplome1: '',
    diplome2: '',
    diplome3: '',
    saitLire: false,
    saitEcrire: false,
    formations: '',
    languesParlees: '',
    languesEcrites: '',
    experiencePro: false,
    activiteActuelle: 'Tsy an\'asa',
    travailLieuEloigne: false,
    serviceNational: 'Non concerné(e)',
  });

  // Calcul automatique du total de personnes à charge
  useEffect(() => {
    setFormData(fd => ({
      ...fd,
      totalCharge: fd.enfantsCharge + fd.adultesCharge,
    }));
  }, [formData.enfantsCharge, formData.adultesCharge]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData(fd => ({
      ...fd,
      [name]:
        type === 'checkbox'
          ? checked
          : type === 'number'
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Inscription travailleur :', formData);
    alert('Inscription soumise !');
    navigate(-1);
  };

  const handleReset = () => {
    setFormData({
      nom: '',
      prenoms: '',
      dateNaissance: '',
      lieuNaissance: '',
      cnaps: '',
      cin: '',
      nationalite: '',
      situationMatrimoniale: 'Célibataire',
      enfantsCharge: 0,
      adultesCharge: 0,
      totalCharge: 0,
      adresse: '',
      region: '',
      district: '',
      telephone: '',
      poste1: '',
      poste2: '',
      internat: false,
      dateRecherche: '',
      niveauEtude: '',
      diplome1: '',
      diplome2: '',
      diplome3: '',
      saitLire: false,
      saitEcrire: false,
      formations: '',
      languesParlees: '',
      languesEcrites: '',
      experiencePro: false,
      activiteActuelle: 'Tsy an\'asa',
      travailLieuEloigne: false,
      serviceNational: 'Non concerné(e)',
    });
  };

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        ← Retour
      </button>
      <h3 className={styles.title}>Inscription Travailleur</h3>
      <form onSubmit={handleSubmit} onReset={handleReset} className={styles.form}>
        {/* A – Identification */}
        <fieldset className={styles.fieldset}>
          <legend>A – Identification</legend>
          <label>
            Nom
            <input name="nom" value={formData.nom} onChange={handleChange} required />
          </label>
          <label>
            Prénoms
            <input name="prenoms" value={formData.prenoms} onChange={handleChange} required />
          </label>
          <label>
            Date de naissance
            <input name="dateNaissance" type="date" value={formData.dateNaissance} onChange={handleChange} required />
          </label>
          <label>
            Lieu de naissance
            <input name="lieuNaissance" value={formData.lieuNaissance} onChange={handleChange} required />
          </label>
          <label>
            CNaPS
            <input name="cnaps" value={formData.cnaps} onChange={handleChange} required />
          </label>
          <label>
            CIN
            <input name="cin" value={formData.cin} onChange={handleChange} required />
          </label>
          <label>
            Nationalité
            <input name="nationalite" value={formData.nationalite} onChange={handleChange} required />
          </label>
          <label>
            Situation matrimoniale
            <select name="situationMatrimoniale" value={formData.situationMatrimoniale} onChange={handleChange}>
              {['Marié(e)','Célibataire','Divorcé(e)','Veuf/Veuve'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
          <label>
            Enfants à charge
            <input name="enfantsCharge" type="number" min={0} value={formData.enfantsCharge} onChange={handleChange} />
          </label>
          <label>
            Adultes à charge
            <input name="adultesCharge" type="number" min={0} value={formData.adultesCharge} onChange={handleChange} />
          </label>
          <label>
            Total à charge
            <input name="totalCharge" type="number" value={formData.totalCharge} readOnly />
          </label>
          <label>
            Adresse
            <input name="adresse" value={formData.adresse} onChange={handleChange} />
          </label>
          <label>
            Région
            <input name="region" value={formData.region} onChange={handleChange} />
          </label>
          <label>
            District
            <input name="district" value={formData.district} onChange={handleChange} />
          </label>
          <label>
            Téléphone
            <input name="telephone" type="tel" value={formData.telephone} onChange={handleChange} />
          </label>
        </fieldset>

        {/* B – Poste recherché */}
        <fieldset className={styles.fieldset}>
          <legend>B – Poste recherché</legend>
          <label>
            Intitulé poste 1°
            <input name="poste1" value={formData.poste1} onChange={handleChange} />
          </label>
          <label>
            Intitulé poste 2°
            <input name="poste2" value={formData.poste2} onChange={handleChange} />
          </label>
          <label>
            Travail en internat
            <input name="internat" type="checkbox" checked={formData.internat} onChange={handleChange} />
          </label>
          <label>
            Date recherche (mois/année)
            <input name="dateRecherche" type="month" value={formData.dateRecherche} onChange={handleChange} />
          </label>
        </fieldset>

        {/* C – Formation & diplômes */}
        <fieldset className={styles.fieldset}>
          <legend>C – Formation & diplômes</legend>
          <label>
            Niveau d’étude le plus élevé
            <input name="niveauEtude" value={formData.niveauEtude} onChange={handleChange} />
          </label>
          <label>
            Diplôme 1 (plus récent)
            <input name="diplome1" value={formData.diplome1} onChange={handleChange} />
          </label>
          <label>
            Diplôme 2
            <input name="diplome2" value={formData.diplome2} onChange={handleChange} />
          </label>
          <label>
            Diplôme 3
            <input name="diplome3" value={formData.diplome3} onChange={handleChange} />
          </label>
          <label>
            Sait lire
            <input name="saitLire" type="checkbox" checked={formData.saitLire} onChange={handleChange} />
          </label>
          <label>
            Sait écrire
            <input name="saitEcrire" type="checkbox" checked={formData.saitEcrire} onChange={handleChange} />
          </label>
          <label>
            Formations complémentaires
            <textarea name="formations" rows={3} value={formData.formations} onChange={handleChange} />
          </label>
          <label>
            Langues parlées
            <input name="languesParlees" value={formData.languesParlees} onChange={handleChange} />
          </label>
          <label>
            Langues écrites
            <input name="languesEcrites" value={formData.languesEcrites} onChange={handleChange} />
          </label>
        </fieldset>

        {/* D – Expérience & activité */}
        <fieldset className={styles.fieldset}>
          <legend>D – Expérience & activité</legend>
          <label>
            Expérience pro antérieure
            <input name="experiencePro" type="checkbox" checked={formData.experiencePro} onChange={handleChange} />
          </label>
          <label>
            Activité actuelle
            <select name="activiteActuelle" value={formData.activiteActuelle} onChange={handleChange}>
              {[
                'Mpiasa mikarama',
                'Mpiasa mahaleotena',
                'Mpanao asa an-tselika',
                'Misotro ronono',
                'Mpianatra',
                'Tsy an\'asa'
              ].map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </label>
          <label>
            Postuler en lieu éloigné
            <input name="travailLieuEloigne" type="checkbox" checked={formData.travailLieuEloigne} onChange={handleChange} />
          </label>
          <label>
            Service National
            <select name="serviceNational" value={formData.serviceNational} onChange={handleChange}>
              {['Accompli','En cours','Sursitaire','Non concerné(e)','Exempté(e)'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
        </fieldset>

        <div className={styles.buttons}>
          <button type="submit" className={styles.submitButton}>Soumettre</button>
          <button type="reset" className={styles.resetButton}>Effacer tout</button>
        </div>
      </form>
    </div>
  );
};

export default InscriptionTrav;
