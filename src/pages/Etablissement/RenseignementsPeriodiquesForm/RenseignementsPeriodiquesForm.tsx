// src/pages/Etablissement/RenseignementsPeriodiquesForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RenseignementsPeriodiquesForm.module.css';

interface FormeJuridique {
  id_frm_juridique: number;
  nom_frm_juridique: string;
}

interface EmploiRow {
  malH: number; malF: number;
  frLocalH: number; frLocalF: number;
  frExtH: number; frExtF: number;
  etrLocalH: number; etrLocalF: number;
  etrExtH: number; etrExtF: number;
}

interface SaisonRow {
  q1SurPlace: number; q1Deplaces: number;
  q2SurPlace: number; q2Deplaces: number;
  q3SurPlace: number; q3Deplaces: number;
  q4SurPlace: number; q4Deplaces: number;
  journeeHommes: number; masseSalaire: number;
}

interface AvantageRow {
  mal: number;
  frSP: number; frExt: number;
  etrSP: number; etrExt: number;
  total: number;
}

interface NatureRow {
  logement: number;
  electricite: number;
  eau: number;
  voiture: number;
  essence: number;
  domesticite: number;
  ration: number;
  terrain: number;
  total: number;
}

interface PeriodiqueData {
  // I. Entreprise-mère
  entrepriseMereNom: string;
  entrepriseMereNIS: string;
  entrepriseMereFormeJuridique: string;
  entrepriseMereNationalite: string;
  // II. Établissement enquête
  etabNom: string; etabNIS: string; etabCNAPS: string;
  etabDirecteur: string; etabNationalite: string;
  etabAdresse: string; etabRue: string; etabCommune: string;
  etabDistrict: string; etabPrefecture: string; etabProvince: string;
  etabActivitePrincipale: string; etabActivitesSecondaires: string;
  etabDateEnvoiQuestionnaire: string;
  // III. Enquête sur l’emploi
  emploi: EmploiRow[];
  // IV. Emploi saisonnier ou temporaire
  saisonnier: SaisonRow[];
  // V. Salaire et avantage en natures
  avantage: AvantageRow[];
  // VI. Charges sociales
  cotCNAPS: number;
  cotMedecine: number;
  autresCharges: number;
  totalCharges: number;
  nbPermAvNatures: number;
  // VII. Avantages en nature
  nature: NatureRow[];
}

const categories = [
  'Manœuvres M1, M2',
  'Employés 1A, 1B',
  'Ouvriers spécialisés OS1, OS2, OS3',
  'Employés 2A, 2B, 3A, 3B',
  'Ouvriers qualifiés OP1A, OP1B',
  'Employés qualifiés 4A, 4B',
  'Ouvriers haute qualité OP2, OP3, maîtrise',
  'Employés qualifiés 5A, 5B',
  'Chauffeurs catégorie A',
  'Chauffeurs catégorie B',
  'Chauffeurs catégorie C',
  'Chauffeurs catégorie D',
  'Cadres hors catégorie, Direction',
];

const emptyEmploiRow: EmploiRow = {
  malH:0, malF:0, frLocalH:0, frLocalF:0,
  frExtH:0, frExtF:0, etrLocalH:0, etrLocalF:0,
  etrExtH:0, etrExtF:0,
};

const emptySaisonRow: SaisonRow = {
  q1SurPlace:0, q1Deplaces:0, q2SurPlace:0, q2Deplaces:0,
  q3SurPlace:0, q3Deplaces:0, q4SurPlace:0, q4Deplaces:0,
  journeeHommes:0, masseSalaire:0,
};

const emptyAvantageRow: AvantageRow = {
  mal:0, frSP:0, frExt:0, etrSP:0, etrExt:0, total:0,
};

const emptyNatureRow: NatureRow = {
  logement:0, electricite:0, eau:0, voiture:0,
  essence:0, domesticite:0, ration:0, terrain:0, total:0,
};

const RenseignementsPeriodiquesForm: React.FC = () => {
  const navigate = useNavigate();
  const [formes, setFormes] = useState<FormeJuridique[]>([]);
  const [data, setData] = useState<PeriodiqueData>({
    entrepriseMereNom:'', entrepriseMereNIS:'',
    entrepriseMereFormeJuridique:'', entrepriseMereNationalite:'',
    etabNom:'', etabNIS:'', etabCNAPS:'',
    etabDirecteur:'', etabNationalite:'',
    etabAdresse:'', etabRue:'', etabCommune:'',
    etabDistrict:'', etabPrefecture:'', etabProvince:'',
    etabActivitePrincipale:'', etabActivitesSecondaires:'',
    etabDateEnvoiQuestionnaire:'',
    emploi: categories.map(()=>({...emptyEmploiRow})),
    saisonnier: categories.map(()=>({...emptySaisonRow})),
    avantage: categories.map(()=>({...emptyAvantageRow})),
    cotCNAPS:0, cotMedecine:0, autresCharges:0, totalCharges:0,
    nbPermAvNatures:0,
    nature: categories.map(()=>({...emptyNatureRow})),
  });

  useEffect(() => {
    fetch('/api/forme_juridique')
      .then(r => r.json())
      .then((list:FormeJuridique[]) => setFormes(list))
      .catch(console.error);
  }, []);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData(d=>({ ...d, [name]: value }));
  };

  const handleNumberChange = (name:keyof PeriodiqueData, val:string) => {
    const num = parseFloat(val) || 0;
    let update:any = { [name]: num };
    if (['cotCNAPS','cotMedecine','autresCharges'].includes(name)) {
      const c1 = name==='cotCNAPS'? num : data.cotCNAPS;
      const c2 = name==='cotMedecine'? num : data.cotMedecine;
      const c3 = name==='autresCharges'? num : data.autresCharges;
      update.totalCharges = parseFloat((c1+c2+c3).toFixed(2));
    }
    setData(d=>({ ...d, ...update }));
  };

  const handleEmploiChange = (row:number, field:keyof EmploiRow, val:string) => {
    const num=Number(val)||0;
    setData(d=>{ const e=[...d.emploi]; e[row]={...e[row],[field]:num}; return {...d,emploi:e}; });
  };
  const handleSaisonChange = (row:number, field:keyof SaisonRow, val:string) => {
    const num=Number(val)||0;
    setData(d=>{ const s=[...d.saisonnier]; s[row]={...s[row],[field]:num}; return {...d,saisonnier:s};});
  };
  const handleAvantageChange = (row:number, field:keyof AvantageRow, val:string) => {
    const num=Number(val)||0;
    setData(d=>{ const a=[...d.avantage]; a[row]={...a[row],[field]:num}; return {...d,avantage:a};});
  };
  const handleNatureChange = (row:number, field:keyof NatureRow, val:string) => {
    const num=Number(val)||0;
    setData(d=>{ const n=[...d.nature]; n[row]={...n[row],[field]:num}; return {...d,nature:n};});
  };

  // III totals...
  const rowTotals = data.emploi.map(r=>({ totalH:r.malH+r.frLocalH+r.frExtH+r.etrLocalH+r.etrExtH, totalF:r.malF+r.frLocalF+r.frExtF+r.etrLocalF+r.etrExtF }));
  const grandEmploi = data.emploi.reduce((acc,r)=>{ (Object.keys(emptyEmploiRow) as (keyof EmploiRow)[]).forEach(k=>acc[k]+=r[k]); return acc; },{...emptyEmploiRow});
  const grandEmploiTotals = { ...grandEmploi, totalH:grandEmploi.malH+grandEmploi.frLocalH+grandEmploi.frExtH+grandEmploi.etrLocalH+grandEmploi.etrExtH, totalF:grandEmploi.malF+grandEmploi.frLocalF+grandEmploi.frExtF+grandEmploi.etrLocalF+grandEmploi.etrExtF };

  // IV totals...
  const saisonTotals = data.saisonnier.map(r=>({ totalQ1:r.q1SurPlace+r.q1Deplaces, totalQ2:r.q2SurPlace+r.q2Deplaces, totalQ3:r.q3SurPlace+r.q3Deplaces, totalQ4:r.q4SurPlace+r.q4Deplaces }));
  const grandSaison = data.saisonnier.reduce((acc,r)=>{ (Object.keys(emptySaisonRow) as (keyof SaisonRow)[]).forEach(k=>acc[k]+=r[k]); return acc; },{...emptySaisonRow});

  // V totals...
  const computeAvantageTotals = () => {
    const grand={...emptyAvantageRow};
    data.avantage.forEach(r=>{ grand.mal+=r.mal; grand.frSP+=r.frSP; grand.frExt+=r.frExt; grand.etrSP+=r.etrSP; grand.etrExt+=r.etrExt; });
    grand.total = grand.mal+grand.frSP+grand.frExt+grand.etrSP+grand.etrExt;
    return grand;
  };
  const grandAvantage = computeAvantageTotals();

  // VII totals...
  const computeNatureTotals = () => {
    const grand={...emptyNatureRow};
    data.nature.forEach(r=>{
      grand.logement+=r.logement; grand.electricite+=r.electricite; grand.eau+=r.eau;
      grand.voiture+=r.voiture; grand.essence+=r.essence; grand.domesticite+=r.domesticite;
      grand.ration+=r.ration; grand.terrain+=r.terrain;
    });
    grand.total = grand.logement+grand.electricite+grand.eau+grand.voiture+grand.essence+grand.domesticite+grand.ration+grand.terrain;
    return grand;
  };
  const grandNature = computeNatureTotals();

  const handleSubmit = async(e:React.FormEvent)=>{
    e.preventDefault();
    await fetch('/api/renseignements_periodiques',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
    alert('Envoyé !'); navigate(-1);
  };

  const handleReset = ()=>{
    setData(d=>({
      ...d,
      emploi: categories.map(()=>({...emptyEmploiRow})),
      saisonnier: categories.map(()=>({...emptySaisonRow})),
      avantage: categories.map(()=>({...emptyAvantageRow})),
      nature: categories.map(()=>({...emptyNatureRow})),
      cotCNAPS:0, cotMedecine:0, autresCharges:0, totalCharges:0, nbPermAvNatures:0,
    }));
  };

  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={()=>navigate(-1)}>← Retour</button>
      <h3 className={styles.title}>Renseignements Périodiques</h3>
      <form onSubmit={handleSubmit} onReset={handleReset} className={styles.form}>

        {/* I – Entreprise-mère */}
        <fieldset className={styles.fieldset}>
          <legend>I – Entreprise-mère</legend>
          <label>Nom / raison sociale<input name="entrepriseMereNom" value={data.entrepriseMereNom} onChange={handleFieldChange} required/></label>
          <label>N° identification statistique<input name="entrepriseMereNIS" value={data.entrepriseMereNIS} onChange={handleFieldChange} required/></label>
          <label>Forme juridique<select name="entrepriseMereFormeJuridique" value={data.entrepriseMereFormeJuridique} onChange={handleFieldChange} required>
            <option value="">— Choisissez —</option>
            {formes.map(f=><option key={f.id_frm_juridique} value={f.id_frm_juridique}>{f.nom_frm_juridique}</option>)}
          </select></label>
          <label>Nationalité<input name="entrepriseMereNationalite" value={data.entrepriseMereNationalite} onChange={handleFieldChange} required/></label>
        </fieldset>

        {/* II – Établissement enquête */}
        <fieldset className={styles.fieldset}>
          <legend>II – Établissement enquête</legend>
          <label>Nom / dénomination<input name="etabNom" value={data.etabNom} onChange={handleFieldChange} required/></label>
          <label>N° identification statistique<input name="etabNIS" value={data.etabNIS} onChange={handleFieldChange} required/></label>
          <label>N° immatriculation CNaPS<input name="etabCNAPS" value={data.etabCNAPS} onChange={handleFieldChange} required/></label>
          <label>Directeur / responsable<input name="etabDirecteur" value={data.etabDirecteur} onChange={handleFieldChange} required/></label>
          <label>Nationalité<input name="etabNationalite" value={data.etabNationalite} onChange={handleFieldChange} required/></label>
          <label>Adresse (localité)<input name="etabAdresse" value={data.etabAdresse} onChange={handleFieldChange} required/></label>
          <label>Rue<input name="etabRue" value={data.etabRue} onChange={handleFieldChange}/></label>
          <label>Commune<input name="etabCommune" value={data.etabCommune} onChange={handleFieldChange}/></label>
          <label>District<input name="etabDistrict" value={data.etabDistrict} onChange={handleFieldChange}/></label>
          <label>Préfecture<input name="etabPrefecture" value={data.etabPrefecture} onChange={handleFieldChange}/></label>
          <label>Province<input name="etabProvince" value={data.etabProvince} onChange={handleFieldChange}/></label>
          <label>Activité principale<input name="etabActivitePrincipale" value={data.etabActivitePrincipale} onChange={handleFieldChange} required/></label>
          <label>Activités secondaires<input name="etabActivitesSecondaires" value={data.etabActivitesSecondaires} onChange={handleFieldChange}/></label>
          <label>Date envoi questionnaire<input type="date" name="etabDateEnvoiQuestionnaire" value={data.etabDateEnvoiQuestionnaire} onChange={handleFieldChange} required/></label>
        </fieldset>

        {/* III – Enquête sur l’emploi */}
        <fieldset className={styles.fieldset}>
          <legend>III – Enquête sur l’emploi</legend>
          <table className={styles.table}>
            <thead>
              <tr><th rowSpan={3}>Catégorie professionnelle</th><th rowSpan={2} colSpan={2}>Malagasy</th><th colSpan={4}>Français et citoyens français</th><th colSpan={4}>Autres étrangers</th><th rowSpan={2} colSpan={2}>Total</th></tr>
              <tr><th colSpan={2}>Recruté sur place</th><th colSpan={2}>Recruté à l’extérieur</th><th colSpan={2}>Recruté sur place</th><th colSpan={2}>Recruté à l’extérieur</th></tr>
              <tr><th>H</th><th>F</th><th>H</th><th>F</th><th>H</th><th>F</th><th>H</th><th>F</th><th>H</th><th>F</th><th>H</th><th>F</th></tr>
            </thead>
            <tbody>
              {categories.map((cat,i)=>(
                <tr key={i}>
                  <td>{cat}</td>
                  {(['malH','malF','frLocalH','frLocalF','frExtH','frExtF','etrLocalH','etrLocalF','etrExtH','etrExtF'] as (keyof EmploiRow)[]).map(k=>(
                    <td key={k}><input type="number" className={styles.tblInput} value={data.emploi[i][k]} onChange={e=>handleEmploiChange(i,k,e.target.value)}/></td>
                  ))}
                  <td>{rowTotals[i].totalH}</td><td>{rowTotals[i].totalF}</td>
                </tr>
              ))}
              <tr><td><strong>TOTAL</strong></td>
                <td>{grandEmploi.malH}</td><td>{grandEmploi.malF}</td>
                <td>{grandEmploi.frLocalH}</td><td>{grandEmploi.frLocalF}</td>
                <td>{grandEmploi.frExtH}</td><td>{grandEmploi.frExtF}</td>
                <td>{grandEmploi.etrLocalH}</td><td>{grandEmploi.etrLocalF}</td>
                <td>{grandEmploi.etrExtH}</td><td>{grandEmploi.etrExtF}</td>
                <td>{grandEmploiTotals.totalH}</td><td>{grandEmploiTotals.totalF}</td>
              </tr>
            </tbody>
          </table>
        </fieldset>

        {/* IV – Emploi saisonnier ou temporaire */}
        <fieldset className={styles.fieldset}>
          <legend>IV – Emploi saisonnier ou temporaire</legend>
          <table className={styles.table}>
            <thead>
              <tr><th rowSpan={3}>Catégorie professionnelle</th><th colSpan={8}>Effectif par trimestre</th><th rowSpan={3}>Nombre de journées hommes</th><th rowSpan={3}>Masse de salaire versée</th></tr>
              <tr><th colSpan={2}>Jan–Mar</th><th colSpan={2}>Avr–Juin</th><th colSpan={2}>Juil–Sept</th><th colSpan={2}>Oct–Déc</th></tr>
              <tr><th>Sur place</th><th>Déplacés</th><th>Sur place</th><th>Déplacés</th><th>Sur place</th><th>Déplacés</th><th>Sur place</th><th>Déplacés</th></tr>
            </thead>
            <tbody>
              {categories.map((cat,i)=>(
                <tr key={i}>
                  <td>{cat}</td>
                  {(['q1SurPlace','q1Deplaces','q2SurPlace','q2Deplaces','q3SurPlace','q3Deplaces','q4SurPlace','q4Deplaces'] as (keyof SaisonRow)[]).map(f=>(
                    <td key={f}><input type="number" className={styles.tblInput} value={data.saisonnier[i][f]} onChange={e=>handleSaisonChange(i,f,e.target.value)}/></td>
                  ))}
                  <td><input type="number" className={styles.tblInput} value={data.saisonnier[i].journeeHommes} onChange={e=>handleSaisonChange(i,'journeeHommes',e.target.value)}/></td>
                  <td><input type="number" className={styles.tblInput} value={data.saisonnier[i].masseSalaire} onChange={e=>handleSaisonChange(i,'masseSalaire',e.target.value)}/></td>
                </tr>
              ))}
              <tr><td><strong>TOTAL</strong></td>
                <td>{grandSaison.q1SurPlace}</td><td>{grandSaison.q1Deplaces}</td>
                <td>{grandSaison.q2SurPlace}</td><td>{grandSaison.q2Deplaces}</td>
                <td>{grandSaison.q3SurPlace}</td><td>{grandSaison.q3Deplaces}</td>
                <td>{grandSaison.q4SurPlace}</td><td>{grandSaison.q4Deplaces}</td>
                <td>{grandSaison.journeeHommes}</td><td>{grandSaison.masseSalaire}</td>
              </tr>
            </tbody>
          </table>
        </fieldset>

        {/* V – Salaire et avantage en natures */}
        <fieldset className={styles.fieldset}>
          <legend>V – Salaire et avantage en natures</legend>
          <table className={styles.table}>
            <thead>
              <tr><th rowSpan={2}>Catégorie professionnelle</th><th rowSpan={2}>Malagasy</th><th colSpan={2}>Français et citoyens français</th><th colSpan={2}>Autres étrangers</th><th rowSpan={2}>Total</th></tr>
              <tr><th>Recrutés sur place</th><th>Recrutés à l’extérieur</th><th>Recrutés sur place</th><th>Recrutés à l’extérieur</th></tr>
            </thead>
            <tbody>
              {categories.map((cat,i)=>(
                <tr key={i}>
                  <td>{cat}</td>
                  <td><input type="number" className={styles.tblInput} value={data.avantage[i].mal} onChange={e=>handleAvantageChange(i,'mal',e.target.value)}/></td>
                  <td><input type="number" className={styles.tblInput} value={data.avantage[i].frSP} onChange={e=>handleAvantageChange(i,'frSP',e.target.value)}/></td>
                  <td><input type="number" className={styles.tblInput} value={data.avantage[i].frExt} onChange={e=>handleAvantageChange(i,'frExt',e.target.value)}/></td>
                  <td><input type="number" className={styles.tblInput} value={data.avantage[i].etrSP} onChange={e=>handleAvantageChange(i,'etrSP',e.target.value)}/></td>
                  <td><input type="number" className={styles.tblInput} value={data.avantage[i].etrExt} onChange={e=>handleAvantageChange(i,'etrExt',e.target.value)}/></td>
                  <td>{ data.avantage[i].mal + data.avantage[i].frSP + data.avantage[i].frExt + data.avantage[i].etrSP + data.avantage[i].etrExt }</td>
                </tr>
              ))}
              <tr><td><strong>TOTAL</strong></td>
                <td>{grandAvantage.mal}</td><td>{grandAvantage.frSP}</td>
                <td>{grandAvantage.frExt}</td><td>{grandAvantage.etrSP}</td>
                <td>{grandAvantage.etrExt}</td><td>{grandAvantage.total}</td>
              </tr>
            </tbody>
          </table>
        </fieldset>

        {/* VI – Charges sociales */}
        <fieldset className={styles.fieldset}>
          <legend>VI – Charges sociales</legend>
          <label>
            Cotisations patronales CNaPS (décimale):
            <input
              type="number" step="0.01"
              value={data.cotCNAPS}
              onChange={e=>handleNumberChange('cotCNAPS', e.target.value)}
            />
          </label>
          <label>
            Médecine du travail (décimale):
            <input
              type="number" step="0.01"
              value={data.cotMedecine}
              onChange={e=>handleNumberChange('cotMedecine', e.target.value)}
            />
          </label>
          <label>
            Autres charges sociales (décimale):
            <input
              type="number" step="0.01"
              value={data.autresCharges}
              onChange={e=>handleNumberChange('autresCharges', e.target.value)}
            />
          </label>
          <label>
            Total des charges sociales:
            <input
              type="number" step="0.01"
              value={data.totalCharges}
              readOnly
            />
          </label>
          <label>
            Nb salariés permanents avec avantages en nature (entier):
            <input
              type="number"
              value={data.nbPermAvNatures}
              onChange={e=>handleNumberChange('nbPermAvNatures', e.target.value)}
            />
          </label>
        </fieldset>

        {/* VII – Avantages en nature */}
        <fieldset className={styles.fieldset}>
          <legend>VII – Avantages en nature</legend>
          <table className={styles.table}>
            <thead>
              <tr><th rowSpan={2}>AVANTAGES</th><th rowSpan={2}>Malagasy</th><th colSpan={2}>Français et assimilés</th><th colSpan={2}>Autres étrangers</th><th rowSpan={2}>Total</th></tr>
              <tr><th>Recrutés sur place</th><th>Recrutés à l’extérieur</th><th>Recrutés sur place</th><th>Recrutés à l’extérieur</th></tr>
            </thead>
            <tbody>
              {[
                'Logement','Electricité','Eau','Voiture',
                'Essence','Domesticité','Ration alimentaire','Terrain de culture'
              ].map((label,i)=>(
                <tr key={i}>
                  <td>{label}</td>
                  <td><input type="number" className={styles.tblInput} value={data.nature[i].logement}    onChange={e=>handleNatureChange(i,'logement',e.target.value)}/></td>
                  <td><input type="number" className={styles.tblInput} value={data.nature[i].electricite} onChange={e=>handleNatureChange(i,'electricite',e.target.value)}/></td>
                  <td><input type="number" className={styles.tblInput} value={data.nature[i].eau}         onChange={e=>handleNatureChange(i,'eau',e.target.value)}/></td>
                  <td><input type="number" className={styles.tblInput} value={data.nature[i].voiture}     onChange={e=>handleNatureChange(i,'voiture',e.target.value)}/></td>
                  <td><input type="number" className={styles.tblInput} value={data.nature[i].essence}     onChange={e=>handleNatureChange(i,'essence',e.target.value)}/></td>
                  <td>{ data.nature[i].logement + data.nature[i].electricite + data.nature[i].eau + data.nature[i].voiture + data.nature[i].essence + data.nature[i].domesticite + data.nature[i].ration + data.nature[i].terrain }</td>
                </tr>
              ))}
              <tr>
                <td><strong>TOTAL</strong></td>
                <td>{grandNature.logement}</td><td>{grandNature.electricite}</td><td>{grandNature.eau}</td>
                <td>{grandNature.voiture}</td><td>{grandNature.essence}</td><td>{grandNature.total}</td>
              </tr>
            </tbody>
          </table>
        </fieldset>

        <div className={styles.buttons}>
          <button type="submit" className={styles.submit}>Soumettre</button>
          <button type="reset" className={styles.reset}>Effacer tout</button>
        </div>
      </form>
    </div>
  );
};

export default RenseignementsPeriodiquesForm;
