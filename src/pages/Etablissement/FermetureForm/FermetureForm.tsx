// src/pages/Etablissement/FermetureForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FermetureForm.module.css';

interface FermetureData {
  nom_etab: string;
  num_dos_etab: string;
  id_fiscal_etab: string;
  immatricule_cnaps_etab: string;
  tel_etab: string;
  adresse: string;
  nbre_travailleur_licencier_etab: number;
}

const FermetureForm: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<FermetureData>({
    nom_etab: '',
    num_dos_etab: '',
    id_fiscal_etab: '',
    immatricule_cnaps_etab: '',
    tel_etab: '',
    adresse: '',
    nbre_travailleur_licencier_etab: 0,
  });

  useEffect(() => {
    fetch('/api/etablissements/1')
      .then(r => r.json())
      .then(e =>
        setData(d => ({
          ...d,
          nom_etab: e.nom_etab,
          num_dos_etab: e.num_dos_etab,
          id_fiscal_etab: String(e.id_fiscal_etab),
          immatricule_cnaps_etab: String(e.immatricule_cnaps_etab),
          tel_etab: e.tel_etab,
          adresse: e.adresse || '',
        }))
      )
      .catch(console.error);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(d => ({
      ...d,
      [name]: Number(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/fermeture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          etab_id: 1,
          changement_info_fermeture: '',
          ancienne_info_fermeture: '',
          date_fermeture: new Date().toISOString(),
          etab_id: 1,
          nbre_travailleur_licencier_etab: data.nbre_travailleur_licencier_etab,
        }),
      });
      alert('Fermeture déclarée !');
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la fermeture.');
    }
  };

  const handleReset = () => {
    setData(d => ({
      ...d,
      nbre_travailleur_licencier_etab: 0,
    }));
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Déclaration de Fermeture</h3>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <fieldset>
          <legend>Établissement</legend>
          {(
            ['nom_etab','num_dos_etab','id_fiscal_etab','immatricule_cnaps_etab','tel_etab','adresse'] as const
          ).map(key => (
            <label key={key}>
              {key.replace(/_/g,' ')}
              <input
                type="text"
                name={key}
                value={String(data[key])}
                readOnly
              />
            </label>
          ))}
        </fieldset>

        <fieldset>
          <legend>Licenciements</legend>
          <label>
            Nb licenciés
            <input
              type="number"
              name="nbre_travailleur_licencier_etab"
              value={data.nbre_travailleur_licencier_etab}
              onChange={handleChange}
              min={0}
            />
          </label>
        </fieldset>

        <div className={styles.buttons}>
          <button type="submit" className={styles.submit}>Soumettre</button>
          <button type="reset" className={styles.reset}>Effacer tout</button>
        </div>
      </form>
    </div>
  );
};

export default FermetureForm;
