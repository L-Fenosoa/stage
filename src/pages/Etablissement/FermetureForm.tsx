// src/pages/Etablissement/FermetureForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface FermetureData {
  // champs préremplis
  nomEtablissement: string;
  nis: string;
  nif: string;
  cnaps: string;
  telephone: string;
  adresse: string;
  // champ éditable
  nombreLicencies: string;
}

const FermetureForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FermetureData>({
    nomEtablissement: '',
    nis: '',
    nif: '',
    cnaps: '',
    telephone: '',
    adresse: '',
    nombreLicencies: '',
  });

  // Simule le chargement des données de l'établissement déjà identifié
  useEffect(() => {
    // TODO : remplacer par un fetch réel à ton API
    const etablissement = {
      nomEtablissement: 'Ma Société SARL',
      nis: '123456789',
      nif: '987654321',
      cnaps: 'CNAPS-001122',
      telephone: '+261 34 00 00 00',
      adresse: 'Antananarivo, Madagascar',
    };
    setFormData(prev => ({
      ...prev,
      ...etablissement,
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
    <div>
      <button onClick={() => navigate(-1)}>Retour</button>
      <h3>Déclaration de Fermeture</h3>
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

        {/* Champ spécifique éditable */}
        <div>
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

export default FermetureForm;
