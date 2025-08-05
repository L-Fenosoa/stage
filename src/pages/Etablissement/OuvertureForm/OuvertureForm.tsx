// src/pages/Etablissement/OuvertureForm.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './OuvertureForm.module.css';

interface FormeJuridique {
  id_frm_juridique: number;
  nom_frm_juridique: string;
}

interface OuvertureData {
  nom_etab: string;                                // Raison sociale
  num_dos_etab: string;                            // N° d'identification statistique (17 chiffres)
  id_fiscal_etab: string;                          // N° d'identification fiscal (14 chiffres)
  immatricule_cnaps_etab: string;                  // N° d'immatriculation à la CNaPS (9 chiffres)
  status_juridique_id: string;                     // Statut juridique
  tel_etab: string;                                // Téléphone (10 chiffres)
  commune: string;                                 // Commune
  district: string;                                // District
  region: string;                                  // Région
  province: string;                                // Province
  activite_principal_etab: string;                 // Activité principale
  activites_secondaires_etab: string;              // Activité(s) secondaire(s)
  nbre_travailleur_embaucher_etab: number;         // Nombre de travailleurs embauchés
  maison_mere_etab: string;                        // Adresse de la maison mère
  autorisation_ouverture: File | null;             // Copie autorisation d'ouverture
  registre_commerce: File | null;                  // Copie Registre de commerce
  certificat_existence: File | null;               // Certificat d'existence Fokotany
  carte_statistique: File | null;                  // Photocopie Carte Statistique
  carte_fiscale: File | null;                      // Photocopie Carte Fiscale
}

const OuvertureForm: React.FC = () => {
  const navigate = useNavigate();
  const autorisationRef = useRef<HTMLInputElement>(null);
  const registreRef = useRef<HTMLInputElement>(null);
  const certificatRef = useRef<HTMLInputElement>(null);
  const statistiqueRef = useRef<HTMLInputElement>(null);
  const fiscaleRef = useRef<HTMLInputElement>(null);

  const [formes, setFormes] = useState<FormeJuridique[]>([]);
  const [formData, setFormData] = useState<OuvertureData>({
    nom_etab: '',
    num_dos_etab: '',
    id_fiscal_etab: '',
    immatricule_cnaps_etab: '',
    status_juridique_id: '',
    tel_etab: '',
    commune: '',
    district: '',
    region: '',
    province: '',
    activite_principal_etab: '',
    activites_secondaires_etab: '',
    nbre_travailleur_embaucher_etab: 0,
    maison_mere_etab: '',
    autorisation_ouverture: null,
    registre_commerce: null,
    certificat_existence: null,
    carte_statistique: null,
    carte_fiscale: null,
  });

  // Récupérer les formes juridiques pour le select
  useEffect(() => {
    fetch('/api/forme_juridique')
      .then(res => res.json())
      .then((data: FormeJuridique[]) => setFormes(data))
      .catch(console.error);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        name === 'nbre_travailleur_embaucher_etab'
          ? parseInt(value, 10)
          : value,
    }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const file = files?.[0] || null;
    setFormData(prev => ({ ...prev, [name]: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (val !== null && val !== '' && !(typeof val === 'number' && isNaN(val))) {
        payload.append(key, val as any);
      }
    });

    try {
      const res = await fetch('/api/etablissements', {
        method: 'POST',
        body: payload,
      });
      if (!res.ok) throw new Error(await res.text());
      alert('Établissement créé avec succès !');
      navigate('/etablissementhome');
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la création.');
    }
  };

  const handleReset = () => {
    setFormData({
      nom_etab: '',
      num_dos_etab: '',
      id_fiscal_etab: '',
      immatricule_cnaps_etab: '',
      status_juridique_id: '',
      tel_etab: '',
      commune: '',
      district: '',
      region: '',
      province: '',
      activite_principal_etab: '',
      activites_secondaires_etab: '',
      nbre_travailleur_embaucher_etab: 0,
      maison_mere_etab: '',
      autorisation_ouverture: null,
      registre_commerce: null,
      certificat_existence: null,
      carte_statistique: null,
      carte_fiscale: null,
    });
    autorisationRef.current!.value = '';
    registreRef.current!.value = '';
    certificatRef.current!.value = '';
    statistiqueRef.current!.value = '';
    fiscaleRef.current!.value = '';
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.back}
        type="button"
        onClick={() => navigate('/')}
      >
        ← Retour
      </button>

      <h3 className={styles.title}>Déclaration d’Ouverture</h3>

      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className={styles.form}
      >
        <fieldset className={styles.fieldset}>
          <legend>Informations Générales</legend>

          <label>
            Nom / Raison sociale :
            <input
              type="text"
              name="nom_etab"
              value={formData.nom_etab}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            N° d'identification statistique :
            <input
              type="text"
              name="num_dos_etab"
              value={formData.num_dos_etab}
              maxLength={17}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            N° d'identification fiscal :
            <input
              type="text"
              name="id_fiscal_etab"
              value={formData.id_fiscal_etab}
              maxLength={14}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            N° d'immatriculation à la CNaPS :
            <input
              type="text"
              name="immatricule_cnaps_etab"
              value={formData.immatricule_cnaps_etab}
              maxLength={9}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Statut juridique :
            <select
              name="status_juridique_id"
              value={formData.status_juridique_id}
              onChange={handleChange}
              required
            >
              <option value="">— Choisissez —</option>
              {formes.map(f => (
                <option
                  key={f.id_frm_juridique}
                  value={String(f.id_frm_juridique)}
                >
                  {f.nom_frm_juridique}
                </option>
              ))}
            </select>
          </label>

          <label>
            Téléphone :
            <input
              type="tel"
              name="tel_etab"
              value={formData.tel_etab}
              maxLength={10}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Commune :
            <select
              name="commune"
              value={formData.commune}
              onChange={handleChange}
              required
            >
              <option value="">-</option>
              {/* TODO: remplacer par une liste dynamique */}
              <option value="Antananarivo">Antananarivo</option>
              <option value="Toamasina">Toamasina</option>
              <option value="Fianarantsoa">Fianarantsoa</option>
              {/* … */}
            </select>
          </label>

          <label>
            District :
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Région :
            <input
              type="text"
              name="region"
              value={formData.region}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Province :
            <input
              type="text"
              name="province"
              value={formData.province}
              onChange={handleChange}
              required
            />
          </label>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend>Activités & Effectif</legend>

          <label>
            Activité principale :
            <input
              type="text"
              name="activite_principal_etab"
              value={formData.activite_principal_etab}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Activité(s) secondaire(s) :
            <input
              type="text"
              name="activites_secondaires_etab"
              value={formData.activites_secondaires_etab}
              onChange={handleChange}
            />
          </label>

          <label>
            Nombre de travailleurs embauchés :
            <input
              type="number"
              name="nbre_travailleur_embaucher_etab"
              value={formData.nbre_travailleur_embaucher_etab}
              onChange={handleChange}
              required
              min={0}
            />
          </label>

          <label>
            Adresse de la maison mère :
            <input
              type="text"
              name="maison_mere_etab"
              value={formData.maison_mere_etab}
              onChange={handleChange}
              required
            />
          </label>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend>Documents à Joindre</legend>

          <label>
            Autorisation d'ouverture :
            <input
              type="file"
              name="autorisation_ouverture"
              ref={autorisationRef}
              accept=".pdf,.jpg,.png"
              onChange={handleFile}
              required
            />
          </label>

          <label>
            Registre de commerce :
            <input
              type="file"
              name="registre_commerce"
              ref={registreRef}
              accept=".pdf,.jpg,.png"
              onChange={handleFile}
              required
            />
          </label>

          <label>
            Certificat d'existence (Fokotany) :
            <input
              type="file"
              name="certificat_existence"
              ref={certificatRef}
              accept=".pdf,.jpg,.png"
              onChange={handleFile}
              required
            />
          </label>

          <label>
            Photocopie Carte Statistique :
            <input
              type="file"
              name="carte_statistique"
              ref={statistiqueRef}
              accept=".pdf,.jpg,.png"
              onChange={handleFile}
              required
            />
          </label>

          <label>
            Photocopie Carte Fiscale :
            <input
              type="file"
              name="carte_fiscale"
              ref={fiscaleRef}
              accept=".pdf,.jpg,.png"
              onChange={handleFile}
              required
            />
          </label>
        </fieldset>

        <div className={styles.buttons}>
          <button type="submit" className={styles.submit}>
            Soumettre
          </button>
          <button type="reset" className={styles.reset}>
            Effacer tout
          </button>
        </div>
      </form>
    </div>
  );
};

export default OuvertureForm;
