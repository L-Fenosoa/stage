import React, { useState } from 'react';

const OffreEmploiForm: React.FC = () => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: ici, tu pourrais envoyer formData à une API
    console.log('Données envoyées :', formData);

    // pour l'instant, on affiche juste un message
    alert('Formulaire soumis !');
  };

  const handleReset = () => {
    setFormData({
      titre: '',
      description: '',
    });
  };

  return (
    <div>
      <h3>Formulaire Offre d’emploi</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Titre de l’offre :
            <input
              type="text"
              name="titre"
              value={formData.titre}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Description :
            <textarea
              name="description"
              value={formData.description}
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

export default OffreEmploiForm;
