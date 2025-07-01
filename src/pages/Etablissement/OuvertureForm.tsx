// src/pages/Etablissement/OuvertureForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div>
      
      <button type="button" onClick={() => navigate(-1)}>Retour</button>
      
      <h3>Déclaration d’Ouverture</h3>
      <form onSubmit={handleSubmit}>
        {/* Champs communs */}
        <div>
          <label>
            Nom ou raison sociale :
            <input
              type="text"
              name="nomEtablissement"
              value={formData.nomEtablissement}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            NIS :
            <input
              type="text"
              name="nis"
              value={formData.nis}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            NIF :
            <input
              type="text"
              name="nif"
              value={formData.nif}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Immat. CNAPS :
            <input
              type="text"
              name="cnaps"
              value={formData.cnaps}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Téléphone :
            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Adresse :
            <input
              type="text"
              name="adresse"
              value={formData.adresse}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Statut juridique :
            <input
              type="text"
              name="statutJuridique"
              value={formData.statutJuridique}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Activité principale :
            <input
              type="text"
              name="activitePrincipale"
              value={formData.activitePrincipale}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Activité secondaire :
            <input
              type="text"
              name="activiteSecondaire"
              value={formData.activiteSecondaire}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Adresse maison mère :
            <input
              type="text"
              name="adresseMaisonMere"
              value={formData.adresseMaisonMere}
              onChange={handleChange}
            />
          </label>
        </div>

        {/* Champ spécifique */}
        <div>
          <label>
            Effectif initial embauché :
            <input
              type="number"
              name="effectifInitial"
              value={formData.effectifInitial}
              onChange={handleChange}
            />
          </label>
        </div>

        {/* Boutons */}
        <div>
          <button type="submit">Soumettre</button>
          <button type="button" onClick={handleReset}>Effacer tout</button>
        </div>
      </form>
    </div>
  );
};

export default OuvertureForm;
