// src/pages/Etablissement/ReouvertureForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ReouvertureData {
  // ces champs sont affichés en lecture seule
  nomEtablissement: string;
  nis: string;
  nif: string;
  cnaps: string;
  telephone: string;
  adresse: string;
  // ces champs sont éditables
  effectifAuMoment: string;
  nouvellesActivites: string;
}

const ReouvertureForm: React.FC = () => {
  const navigate = useNavigate();
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

  // Simuler le chargement des données de l'établissement (après identification)
  useEffect(() => {
    // TODO : ici, fetch('/api/etablissement')...
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
    <div>
      <button type="button" onClick={() => navigate(-1)}>Retour</button>
      <h3>Déclaration de Réouverture</h3>
      <form onSubmit={handleSubmit}>
        {/* Champs préremplis en lecture seule */}
        <div>
          <label>
            Nom ou raison sociale :
            <input
              type="text"
              name="nomEtablissement"
              value={formData.nomEtablissement}
              readOnly
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
              readOnly
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
              readOnly
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
              readOnly
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
              readOnly
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
              readOnly
            />
          </label>
        </div>

        <hr />

        {/* Champs spécifiques éditables */}
        <div>
          <label>
            Effectif au moment de la réouverture :
            <input
              type="number"
              name="effectifAuMoment"
              value={formData.effectifAuMoment}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Nouvelles activités/produits :
            <textarea
              name="nouvellesActivites"
              value={formData.nouvellesActivites}
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

export default ReouvertureForm;
