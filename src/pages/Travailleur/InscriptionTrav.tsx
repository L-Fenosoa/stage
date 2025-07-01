// src/pages/Travailleur/InscriptionTrav.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <button onClick={() => navigate(-1)}>Retour</button>
      <h3>Inscription Travailleur</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Nom :
            <input type="text" name="nom" value={formData.nom} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Prénom :
            <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            CIN :
            <input type="text" name="cin" value={formData.cin} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Date de naissance :
            <input type="date" name="dateNaissance" value={formData.dateNaissance} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Lieu de naissance :
            <input type="text" name="lieuNaissance" value={formData.lieuNaissance} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            N° CNAPS :
            <input type="text" name="cnaps" value={formData.cnaps} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Sexe :
            <input type="text" name="sexe" value={formData.sexe} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Nationalité :
            <input type="text" name="nationalite" value={formData.nationalite} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Situation matrimoniale :
            <input type="text" name="situationMatrimoniale" value={formData.situationMatrimoniale} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Personnes à charge :
            <input type="text" name="personnesCharge" value={formData.personnesCharge} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Adresse :
            <input type="text" name="adresse" value={formData.adresse} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Téléphone :
            <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            1er choix d’emploi :
            <input type="text" name="premierChoixEmploi" value={formData.premierChoixEmploi} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            2e choix d’emploi :
            <input type="text" name="deuxiemeChoixEmploi" value={formData.deuxiemeChoixEmploi} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Date début recherche :
            <input type="date" name="dateDebutRecherche" value={formData.dateDebutRecherche} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Diplômes :
            <textarea name="diplomes" value={formData.diplomes} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Formations :
            <textarea name="formations" value={formData.formations} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Langues étrangères :
            <textarea name="languesEtrangeres" value={formData.languesEtrangeres} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Expérience professionnelle :
            <textarea name="experiencePro" value={formData.experiencePro} onChange={handleChange} />
          </label>
        </div>
        <div>
          <button type="submit">Soumettre</button>
          <button type="button" onClick={handleReset}>Effacer tout</button>
        </div>
      </form>
    </div>
  );
};

export default InscriptionTrav;
