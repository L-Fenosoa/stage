// src/pages/Etablissement/ReouvertureForm.tsx
import React, { useState } from 'react';

const ReouvertureForm: React.FC = () => {
  const [formData, setFormData] = useState({
    motif: '',
    datePrevue: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Données envoyées :', formData);
    alert('Formulaire de réouverture soumis !');
  };

  const handleReset = () => {
    setFormData({
      motif: '',
      datePrevue: '',
    });
  };

  return (
    <div>
      <h3>Formulaire de Réouverture</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Motif de la réouverture :
            <input
              type="text"
              name="motif"
              value={formData.motif}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Date prévue :
            <input
              type="date"
              name="datePrevue"
              value={formData.datePrevue}
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

export default ReouvertureForm;
