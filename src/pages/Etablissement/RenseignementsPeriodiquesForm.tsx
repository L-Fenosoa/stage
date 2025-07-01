// src/pages/Etablissement/RenseignementsPeriodiquesForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface RenseignementsData {
  // I – Renseignements généraux
  entrepriseMereNom: string;
  entrepriseMereNIS: string;
  entrepriseMereFormeJuridique: string;
  etabNom: string;
  etabNIS: string;
  etabCNAPS: string;
  etabAdresse: string;
  etabActivitePrincipale: string;
  etabActiviteSecondaire: string;
  etabDateEnvoiQuestionnaire: string;
  // enquête sur l’emploi (à venir)
  // II – Salaire et avantages en nature (à venir)
  // Charges sociales
  cotisationCNAPS: string;
  cotisationMedecineTravail: string;
  autresChargesSociales: string;
  totalChargesSociales: string;
  // Accidents et élections
  nbAccidents: string;
  dateDernieresElections: string;
  dateEnvoiProcProcElect: string;
}

const RenseignementsPeriodiquesForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RenseignementsData>({
    entrepriseMereNom: '',
    entrepriseMereNIS: '',
    entrepriseMereFormeJuridique: '',
    etabNom: '',
    etabNIS: '',
    etabCNAPS: '',
    etabAdresse: '',
    etabActivitePrincipale: '',
    etabActiviteSecondaire: '',
    etabDateEnvoiQuestionnaire: '',
    cotisationCNAPS: '',
    cotisationMedecineTravail: '',
    autresChargesSociales: '',
    totalChargesSociales: '',
    nbAccidents: '',
    dateDernieresElections: '',
    dateEnvoiProcProcElect: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Renseignements périodiques soumis :', formData);
    alert('Formulaire envoyé avec succès !');
  };

  const handleReset = () => {
    setFormData({
      entrepriseMereNom: '',
      entrepriseMereNIS: '',
      entrepriseMereFormeJuridique: '',
      etabNom: '',
      etabNIS: '',
      etabCNAPS: '',
      etabAdresse: '',
      etabActivitePrincipale: '',
      etabActiviteSecondaire: '',
      etabDateEnvoiQuestionnaire: '',
      cotisationCNAPS: '',
      cotisationMedecineTravail: '',
      autresChargesSociales: '',
      totalChargesSociales: '',
      nbAccidents: '',
      dateDernieresElections: '',
      dateEnvoiProcProcElect: '',
    });
  };

  return (
    <div>
      <button onClick={() => navigate(-1)}>Retour</button>
      <h3>Formulaire Renseignements Périodiques</h3>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>I – Renseignements généraux</legend>
          <label>
            Entreprise mère – Nom :
            <input type="text" name="entrepriseMereNom" value={formData.entrepriseMereNom} onChange={handleChange} />
          </label>
          <label>
            NIS :
            <input type="text" name="entrepriseMereNIS" value={formData.entrepriseMereNIS} onChange={handleChange} />
          </label>
          <label>
            Forme juridique :
            <input type="text" name="entrepriseMereFormeJuridique" value={formData.entrepriseMereFormeJuridique} onChange={handleChange} />
          </label>
          <hr />
          <label>
            Établissement – Dénomination :
            <input type="text" name="etabNom" value={formData.etabNom} onChange={handleChange} />
          </label>
          <label>
            NIS :
            <input type="text" name="etabNIS" value={formData.etabNIS} onChange={handleChange} />
          </label>
          <label>
            N° CNAPS :
            <input type="text" name="etabCNAPS" value={formData.etabCNAPS} onChange={handleChange} />
          </label>
          <label>
            Adresse :
            <input type="text" name="etabAdresse" value={formData.etabAdresse} onChange={handleChange} />
          </label>
          <label>
            Activité principale :
            <input type="text" name="etabActivitePrincipale" value={formData.etabActivitePrincipale} onChange={handleChange} />
          </label>
          <label>
            Activité secondaire :
            <input type="text" name="etabActiviteSecondaire" value={formData.etabActiviteSecondaire} onChange={handleChange} />
          </label>
          <label>
            Date d’envoi du questionnaire :
            <input type="date" name="etabDateEnvoiQuestionnaire" value={formData.etabDateEnvoiQuestionnaire} onChange={handleChange} />
          </label>
        </fieldset>

        <fieldset>
          <legend>Charges sociales</legend>
          <label>
            Cotisation CNAPS :
            <input type="number" name="cotisationCNAPS" value={formData.cotisationCNAPS} onChange={handleChange} />
          </label>
          <label>
            Cotisation médecine du travail :
            <input type="number" name="cotisationMedecineTravail" value={formData.cotisationMedecineTravail} onChange={handleChange} />
          </label>
          <label>
            Autres charges sociales :
            <input type="number" name="autresChargesSociales" value={formData.autresChargesSociales} onChange={handleChange} />
          </label>
          <label>
            Total des charges sociales :
            <input type="number" name="totalChargesSociales" value={formData.totalChargesSociales} onChange={handleChange} />
          </label>
        </fieldset>

        <fieldset>
          <legend>Accidents & Élections</legend>
          <label>
            Nombre d’accidents du travail (année) :
            <input type="number" name="nbAccidents" value={formData.nbAccidents} onChange={handleChange} />
          </label>
          <label>
            Date dernières élections délégué du personnel :
            <input type="date" name="dateDernieresElections" value={formData.dateDernieresElections} onChange={handleChange} />
          </label>
          <label>
            Date envoi PV à l’inspection :
            <input type="date" name="dateEnvoiProcProcElect" value={formData.dateEnvoiProcProcElect} onChange={handleChange} />
          </label>
        </fieldset>

        <div>
          <button type="submit">Soumettre</button>
          <button type="button" onClick={handleReset}>Effacer tout</button>
        </div>
      </form>
    </div>
  );
};

export default RenseignementsPeriodiquesForm;
