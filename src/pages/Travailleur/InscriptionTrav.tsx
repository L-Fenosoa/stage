// src/pages/Travailleur/InscriptionTrav.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InscriptionTrav: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nom: '', email: '', motDePasse: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Inscription :', formData);
    alert('Inscription soumise !');
  };

  const handleReset = () => {
    setFormData({ nom: '', email: '', motDePasse: '' });
  };

  return (
    <div>
      <h3>Inscription Travailleur</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Nom :
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Email :
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Mot de passe :
            <input
              type="password"
              name="motDePasse"
              value={formData.motDePasse}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <button type="submit">Soumettre</button>
          <button type="button" onClick={handleReset}>
            Effacer tout
          </button>
          <button type="button" onClick={() => navigate(-1)}>
            Retour
          </button>
        </div>
      </form>
    </div>
  );
};

export default InscriptionTrav;
