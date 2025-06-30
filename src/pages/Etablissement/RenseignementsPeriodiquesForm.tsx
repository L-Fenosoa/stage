// src/pages/Etablissement/RenseignementsPeriodiquesForm.tsx
import React, { useState } from 'react';

const RenseignementsPeriodiquesForm: React.FC = () => {
  const [formData, setFormData] = useState({
    effectif: '',
    chiffreAffaires: '',
    observations: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO : remplacer par un appel à l’API pour enregistrer dans la base de données
    console.log('Renseignements soumis :', formData);
    alert('Formulaire envoyé avec succès !');
  };

  const handleReset = () => {
    setFormData({
      effectif: '',
      chiffreAffaires: '',
      observations: '',
    });
  };

  return (
    <div>
      <h3>Formulaire Renseignements Périodiques</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Effectif actuel :
            <input
              type="number"
              name="effectif"
              value={formData.effectif}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Chiffre d’affaires :
            <input
              type="number"
              name="chiffreAffaires"
              value={formData.chiffreAffaires}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Observations :
            <textarea
              name="observations"
              value={formData.observations}
              onChange={handleChange}
            />
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

export default RenseignementsPeriodiquesForm;
