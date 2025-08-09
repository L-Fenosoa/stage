import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import AdminSidebar from '../../../components/AdminSidebar/AdminSidebar';
import styles from './StatRapport.module.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface KPIData {
  totalInscriptions: number;
  totalOffres: number;
}

interface OuvertureData {
  nom: string;
  adresse: string;
  activite: string;
  travailleurs: number;
}

interface FermetureData {
  nom: string;
  adresse: string;
  activite: string;
  licencies: number;
}

interface MarcheData {
  periode: string;
  demandesRecues: number;
  demandesHommes: number;
  demandesFemmes: number;
  offresPublic: number;
  offresPrive: number;
  licenciements: number;
  attestationsNonEmploi: number;
  attestationsChomage: number;
}

interface SelectionTestData {
  label: string;
  publicSector: number;
  privateSector: number;
  total: number;
}

interface DemandeurRepartition {
  anciensHommes: number;
  nouveauxHommes: number;
  anciennesFemmes: number;
  nouvellesFemmes: number;
}

interface FormationData {
  niveau: string;
  hommes: number;
  femmes: number;
}

interface AgeData {
  classe: string;
  hommes: number;
  femmes: number;
}

const StatRapport: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'statistiques' | 'rapports'>('statistiques');
  const [kpi, setKpi] = useState<KPIData>({ totalInscriptions: 0, totalOffres: 0 });
  
  const [ouvertures, setOuvertures] = useState<OuvertureData[]>([]);
  const [fermetures, setFermetures] = useState<FermetureData[]>([]);
  const [marcheTravail, setMarcheTravail] = useState<MarcheData | null>(null);
  const [selectionTests, setSelectionTests] = useState<SelectionTestData[]>([]);
  const [demandeurRepartition, setDemandeurRepartition] = useState<DemandeurRepartition | null>(null);
  const [formations, setFormations] = useState<FormationData[]>([]);
  const [ages, setAges] = useState<AgeData[]>([]);
  
  const pdfRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    // Données mockées (tu peux remplacer par fetch API)
    setKpi({ totalInscriptions: 1245, totalOffres: 367 });
    
    setOuvertures([
      { nom: 'Société ABC', adresse: 'Antananarivo', activite: 'Commerce', travailleurs: 15 },
      { nom: 'Usine XYZ', adresse: 'Toamasina', activite: 'Industrie', travailleurs: 42 },
      { nom: 'Atelier Bleu', adresse: 'Antsirabe', activite: 'Artisanat', travailleurs: 8 },
      { nom: 'Entreprise Delta', adresse: 'Mahajanga', activite: 'Services', travailleurs: 23 },
      { nom: 'SARL Gamma', adresse: 'Fianarantsoa', activite: 'Agriculture', travailleurs: 31 },
    ]);
    
    setFermetures([
      { nom: 'Manufacture Tana', adresse: 'Antananarivo', activite: 'Textile', licencies: 28 },
      { nom: 'Boutique Océan', adresse: 'Toamasina', activite: 'Commerce', licencies: 12 },
      { nom: 'Atelier Sud', adresse: 'Toliara', activite: 'Artisanat', licencies: 5 },
      { nom: 'Service Pro', adresse: 'Antsiranana', activite: 'Services', licencies: 17 },
    ]);
    
    setMarcheTravail({
      periode: '30 derniers jours',
      demandesRecues: 289,
      demandesHommes: 178,
      demandesFemmes: 111,
      offresPublic: 18,
      offresPrive: 34,
      licenciements: 25,
      attestationsNonEmploi: 46,
      attestationsChomage: 243
    });
    
    setSelectionTests([
      { label: "Test de sélection", publicSector: 45, privateSector: 120, total: 165 },
      { label: "Poste à pourvoir", publicSector: 12, privateSector: 78, total: 90 },
      { label: "Candidats présentés", publicSector: 23, privateSector: 65, total: 88 },
      { label: "Candidats reçus", publicSector: 8, privateSector: 42, total: 50 }
    ]);
    
    setDemandeurRepartition({
      anciensHommes: 845,
      nouveauxHommes: 332,
      anciennesFemmes: 621,
      nouvellesFemmes: 289
    });
    
    setFormations([
      { niveau: "Sans diplôme", hommes: 120, femmes: 85 },
      { niveau: "BEPC", hommes: 95, femmes: 110 },
      { niveau: "Bac", hommes: 210, femmes: 195 },
      { niveau: "Bac+2", hommes: 180, femmes: 155 },
      { niveau: "Bac+3 et plus", hommes: 240, femmes: 165 },
    ]);
    
    setAges([
      { classe: "x < 25 ans", hommes: 285, femmes: 245 },
      { classe: "25 ans ≤ x < 35 ans", hommes: 415, femmes: 325 },
      { classe: "35 ans ≤ x", hommes: 350, femmes: 280 },
    ]);
  }, []);

  const totalFormations = formations.reduce((acc, curr) => ({
    hommes: acc.hommes + curr.hommes,
    femmes: acc.femmes + curr.femmes,
    niveau: "Total"
  }), { hommes: 0, femmes: 0, niveau: "Total" });

  const totalAges = ages.reduce((acc, curr) => ({
    hommes: acc.hommes + curr.hommes,
    femmes: acc.femmes + curr.femmes,
    classe: "Total"
  }), { hommes: 0, femmes: 0, classe: "Total" });

  /**
   * Nouvelle génération PDF :
   * - capture tout le conteneur pdfRef en un grand canvas (scale élevé pour conserver qualité)
   * - découpe verticalement le canvas en tranches correspondant à la hauteur utile A4
   * - ajoute chaque tranche au PDF (remplissant au maximum chaque page avant de passer à la suivante)
   */
  const generatePDF = async () => {
    if (isGeneratingPDF) return;
    setIsGeneratingPDF(true);

    // Forcer l'onglet statistiques visible quand on capture
    const originalTab = activeTab;
    setActiveTab('statistiques');

    // attente que le DOM se stabilise (petit délai)
    await new Promise(resolve => setTimeout(resolve, 400));

    if (!pdfRef.current) {
      setIsGeneratingPDF(false);
      return;
    }

    // message visuel temporaire
    const loadingMsg = document.createElement('div');
    loadingMsg.style.position = 'fixed';
    loadingMsg.style.top = '50%';
    loadingMsg.style.left = '50%';
    loadingMsg.style.transform = 'translate(-50%, -50%)';
    loadingMsg.style.backgroundColor = 'rgba(0,0,0,0.75)';
    loadingMsg.style.color = 'white';
    loadingMsg.style.padding = '18px 22px';
    loadingMsg.style.borderRadius = '6px';
    loadingMsg.style.zIndex = '10000';
    loadingMsg.textContent = 'Génération du PDF en cours...';
    document.body.appendChild(loadingMsg);

    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth(); // mm
      const pdfHeight = pdf.internal.pageSize.getHeight(); // mm
      const margin = 10; // mm (gauche + droite)
      const usableWidth = pdfWidth - 2 * margin; // mm
      const usableHeight = pdfHeight - 2 * margin; // mm

      // conversion mm -> px : approx. 96dpi => 96px per 25.4mm => 96/25.4 px/mm
      const pxPerMm = (typeof window !== 'undefined' && (window.devicePixelRatio || 1)) 
        ? (96 * (window.devicePixelRatio || 1)) / 25.4 
        : 96 / 25.4;

      // On veut un canvas large en pixels correspondant à usableWidth mm * pxPerMm * upscale
      const upscale = 2; // augmente la résolution pour éviter compression / perte -> tu peux ajuster (1.5 - 3)
      const targetCanvasWidth = Math.floor(usableWidth * pxPerMm * upscale);

      // Sauvegarder styles originaux et forcer la largeur du conteneur pour correspondre à la largeur PDF
      const container = pdfRef.current;
      const originalStyleWidth = container.style.width || '';
      const originalStyleTransform = container.style.transform || '';

      // Appliquer largeur en pixels calculée (pour rendu consistant)
      container.style.width = `${targetCanvasWidth / (window.devicePixelRatio || 1)}px`; 
      // enlever transformations CSS temporaires qui pourraient affecter rendu
      container.style.transform = 'none';

      // Capture de tout le bloc
      const canvas = await html2canvas(container, {
        scale: upscale * (window.devicePixelRatio || 1), // haute résolution
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        // width/height non fournis, html2canvas prend la largeur actuelle du DOM
      });

      // Restaurer styles
      container.style.width = originalStyleWidth;
      container.style.transform = originalStyleTransform;

      // canvas.width correspond maintenant à targetCanvasWidth (ou proche)
      // calculer pixels par mm effectif à partir du canvas
      const pixelsPerMmEffective = canvas.width / usableWidth; // px per mm

      // hauteur d'une page en pixels sur ce canvas
      const pageHeightPx = Math.floor(usableHeight * pixelsPerMmEffective);

      let remainingHeight = canvas.height;
      let yOffset = 0;
      let pageIndex = 0;

      while (remainingHeight > 0) {
        const sliceHeight = Math.min(pageHeightPx, remainingHeight);

        // créer canvas temporaire pour la tranche
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = sliceHeight;
        const ctx = pageCanvas.getContext('2d');
        if (!ctx) throw new Error('Impossible de créer le contexte canvas');

        // dessiner la tranche
        ctx.drawImage(canvas, 0, yOffset, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight);

        // convertir en image
        const imgData = pageCanvas.toDataURL('image/png');

        // hauteur en mm pour jsPDF (convertir pixels -> mm via pixelsPerMmEffective)
        const imgHeightMm = sliceHeight / pixelsPerMmEffective;
        const imgWidthMm = usableWidth; // on garde la largeur pleine utilisable

        // ajouter page (saut de page si pas la première)
        if (pageIndex > 0) pdf.addPage();

        // centrer verticalement/horizontalement (x,y)
        const x = margin;
        // On place l'image à la marge top = margin
        const y = margin;

        pdf.addImage(imgData, 'PNG', x, y, imgWidthMm, imgHeightMm, undefined, 'FAST');

        // avancer
        remainingHeight -= sliceHeight;
        yOffset += sliceHeight;
        pageIndex += 1;
      }

      // télécharger
      pdf.save('statistiques_emploi.pdf');

      // restaurer onglet
      setActiveTab(originalTab);
    } catch (err) {
      console.error('Erreur lors de la génération PDF:', err);
      alert('Erreur lors de la génération du PDF. Voir la console pour détails.');
    } finally {
      // supprimer message
      if (loadingMsg && document.body.contains(loadingMsg)) document.body.removeChild(loadingMsg);
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className={styles.layout}>
      <AdminSidebar currentPath={location.pathname} />

      <main className={styles.container}>
        <div className={styles.folderTabs}>
          <button
            className={`${styles.tab} ${activeTab === 'statistiques' ? styles.active : ''}`}
            onClick={() => setActiveTab('statistiques')}
          >
            Statistiques
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'rapports' ? styles.active : ''}`}
            onClick={() => setActiveTab('rapports')}
          >
            Rapports
          </button>
        </div>

        <div className={styles.content}>
          {activeTab === 'statistiques' ? (
            <div ref={pdfRef} className={styles.pdfContent}>
              <section className={styles.kpiSection}>
                <h2>1. Indicateurs clés</h2>
                <div className={styles.kpiCards}>
                  <div className={styles.kpiCard}>
                    <span className={styles.kpiLabel}>Inscriptions</span>
                    <span className={styles.kpiValue}>{kpi.totalInscriptions}</span>
                  </div>
                  <div className={styles.kpiCard}>
                    <span className={styles.kpiLabel}>Offres publiées</span>
                    <span className={styles.kpiValue}>{kpi.totalOffres}</span>
                  </div>
                </div>
              </section>

              <section className={styles.statsSection}>
                <h2>Tableau I: Ouverture d'établissement</h2>
                <div className={styles.tableContainer}>
                  <table className={styles.dataTable}>
                    <thead>
                      <tr>
                        <th>Nom de l'établissement</th>
                        <th>Adresse</th>
                        <th>Activité principale</th>
                        <th>Travailleurs recrutés</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ouvertures.map((etab, index) => (
                        <tr key={index}>
                          <td>{etab.nom}</td>
                          <td>{etab.adresse}</td>
                          <td>{etab.activite}</td>
                          <td className={styles.numberCell}>{etab.travailleurs}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className={styles.totalRow}>
                        <td colSpan={3}>Total</td>
                        <td className={styles.numberCell}>
                          {ouvertures.reduce((sum, etab) => sum + etab.travailleurs, 0)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </section>

              <section className={styles.statsSection}>
                <h2>Tableau II: Fermeture d'établissement</h2>
                <div className={styles.tableContainer}>
                  <table className={styles.dataTable}>
                    <thead>
                      <tr>
                        <th>Nom de l'établissement</th>
                        <th>Adresse</th>
                        <th>Activité principale</th>
                        <th>Travailleurs licenciés</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fermetures.map((etab, index) => (
                        <tr key={index}>
                          <td>{etab.nom}</td>
                          <td>{etab.adresse}</td>
                          <td>{etab.activite}</td>
                          <td className={styles.numberCell}>{etab.licencies}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className={styles.totalRow}>
                        <td colSpan={3}>Total</td>
                        <td className={styles.numberCell}>
                          {fermetures.reduce((sum, etab) => sum + etab.licencies, 0)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </section>

              <section className={styles.statsSection}>
                <h2>Tableau III: Marché du travail</h2>
                <h3>Situation des 30 derniers jours</h3>
                <div className={styles.tableContainer}>
                  <table className={styles.dataTable}>
                    <thead>
                      <tr>
                        <th colSpan={3}>Demande d'emploi</th>
                        <th colSpan={2}>Offres d'emploi reçues</th>
                        <th>Licenciements</th>
                        <th colSpan={2}>Attestations</th>
                      </tr>
                      <tr>
                        <th>Reçues</th>
                        <th>Hommes</th>
                        <th>Femmes</th>
                        <th>Secteur public</th>
                        <th>Secteur privé</th>
                        <th></th>
                        <th>De non emploi</th>
                        <th>De chômage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {marcheTravail && (
                        <tr>
                          <td className={styles.numberCell}>{marcheTravail.demandesRecues}</td>
                          <td className={styles.numberCell}>{marcheTravail.demandesHommes}</td>
                          <td className={styles.numberCell}>{marcheTravail.demandesFemmes}</td>
                          <td className={styles.numberCell}>{marcheTravail.offresPublic}</td>
                          <td className={styles.numberCell}>{marcheTravail.offresPrive}</td>
                          <td className={styles.numberCell}>{marcheTravail.licenciements}</td>
                          <td className={styles.numberCell}>{marcheTravail.attestationsNonEmploi}</td>
                          <td className={styles.numberCell}>{marcheTravail.attestationsChomage}</td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={8} className={styles.periodCell}>
                          Période: {marcheTravail?.periode}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </section>

              <section className={styles.statsSection}>
                <h2>Tableau IV: Test de sélection</h2>
                <div className={styles.tableContainer}>
                  <table className={styles.dataTable}>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Secteur public</th>
                        <th>Secteur privé</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectionTests.map((row, index) => (
                        <tr key={index}>
                          <td>{row.label}</td>
                          <td className={styles.numberCell}>{row.publicSector}</td>
                          <td className={styles.numberCell}>{row.privateSector}</td>
                          <td className={styles.numberCell}>{row.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className={styles.statsSection}>
                <h2>Tableau V: Répartition des demandeurs d'emploi</h2>
                <h3>Profil demandeurs d'emploi selon le sexe et la position antérieure</h3>
                <div className={styles.tableContainer}>
                  <table className={styles.dataTable}>
                    <thead>
                      <tr>
                        <th></th>
                        <th colSpan={2}>Homme</th>
                        <th colSpan={2}>Femme</th>
                        <th colSpan={2}>Ensemble</th>
                      </tr>
                      <tr>
                        <th>Position antérieure</th>
                        <th>Effectif</th>
                        <th>%</th>
                        <th>Effectif</th>
                        <th>%</th>
                        <th>Effectif</th>
                        <th>%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {demandeurRepartition && (
                        <>
                          <tr>
                            <td>Ancien (A)</td>
                            <td className={styles.numberCell}>{demandeurRepartition.anciensHommes}</td>
                            <td className={styles.numberCell}>
                              {Math.round((demandeurRepartition.anciensHommes / 
                                (demandeurRepartition.anciensHommes + demandeurRepartition.nouveauxHommes)) * 100)}%
                            </td>
                            <td className={styles.numberCell}>{demandeurRepartition.anciennesFemmes}</td>
                            <td className={styles.numberCell}>
                              {Math.round((demandeurRepartition.anciennesFemmes / 
                                (demandeurRepartition.anciennesFemmes + demandeurRepartition.nouvellesFemmes)) * 100)}%
                            </td>
                            <td className={styles.numberCell}>
                              {demandeurRepartition.anciensHommes + demandeurRepartition.anciennesFemmes}
                            </td>
                            <td className={styles.numberCell}>
                              {Math.round(
                                (demandeurRepartition.anciensHommes + demandeurRepartition.anciennesFemmes) / 
                                (demandeurRepartition.anciensHommes + demandeurRepartition.nouveauxHommes +
                                demandeurRepartition.anciennesFemmes + demandeurRepartition.nouvellesFemmes) * 100
                              )}%
                            </td>
                          </tr>
                          <tr>
                            <td>Nouveau (N)</td>
                            <td className={styles.numberCell}>{demandeurRepartition.nouveauxHommes}</td>
                            <td className={styles.numberCell}>
                              {Math.round((demandeurRepartition.nouveauxHommes / 
                                (demandeurRepartition.anciensHommes + demandeurRepartition.nouveauxHommes)) * 100)}%
                            </td>
                            <td className={styles.numberCell}>{demandeurRepartition.nouvellesFemmes}</td>
                            <td className={styles.numberCell}>
                              {Math.round((demandeurRepartition.nouvellesFemmes / 
                                (demandeurRepartition.anciennesFemmes + demandeurRepartition.nouvellesFemmes)) * 100)}%
                            </td>
                            <td className={styles.numberCell}>
                              {demandeurRepartition.nouveauxHommes + demandeurRepartition.nouvellesFemmes}
                            </td>
                            <td className={styles.numberCell}>
                              {Math.round(
                                (demandeurRepartition.nouveauxHommes + demandeurRepartition.nouvellesFemmes) / 
                                (demandeurRepartition.anciensHommes + demandeurRepartition.nouveauxHommes +
                                demandeurRepartition.anciennesFemmes + demandeurRepartition.nouvellesFemmes) * 100
                              )}%
                            </td>
                          </tr>
                          <tr className={styles.totalRow}>
                            <td>Total</td>
                            <td className={styles.numberCell}>
                              {demandeurRepartition.anciensHommes + demandeurRepartition.nouveauxHommes}
                            </td>
                            <td className={styles.numberCell}>100%</td>
                            <td className={styles.numberCell}>
                              {demandeurRepartition.anciennesFemmes + demandeurRepartition.nouvellesFemmes}
                            </td>
                            <td className={styles.numberCell}>100%</td>
                            <td className={styles.numberCell}>
                              {demandeurRepartition.anciensHommes + demandeurRepartition.nouveauxHommes +
                               demandeurRepartition.anciennesFemmes + demandeurRepartition.nouvellesFemmes}
                            </td>
                            <td className={styles.numberCell}>100%</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={7} className={styles.legendCell}>
                          A = ancien, ayant déjà travaillé auparavant | N = nouveau, sans antécédent d'emploi
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </section>

              <section className={styles.statsSection}>
                <h2>Tableau VI: Répartition des demandeurs d'emploi selon le niveau de formation</h2>
                <div className={styles.tableContainer}>
                  <table className={styles.dataTable}>
                    <thead>
                      <tr>
                        <th>Niveau de formation</th>
                        <th>Homme</th>
                        <th>Femme</th>
                        <th>Ensemble</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formations.map((formation, index) => (
                        <tr key={index}>
                          <td>{formation.niveau}</td>
                          <td className={styles.numberCell}>{formation.hommes}</td>
                          <td className={styles.numberCell}>{formation.femmes}</td>
                          <td className={styles.numberCell}>{formation.hommes + formation.femmes}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className={styles.totalRow}>
                        <td>Total</td>
                        <td className={styles.numberCell}>{totalFormations.hommes}</td>
                        <td className={styles.numberCell}>{totalFormations.femmes}</td>
                        <td className={styles.numberCell}>{totalFormations.hommes + totalFormations.femmes}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </section>

              <section className={styles.statsSection}>
                <h2>Tableau VII: Répartition des demandeurs d'emploi selon le genre et les classes d'âges</h2>
                <div className={styles.tableContainer}>
                  <table className={styles.dataTable}>
                    <thead>
                      <tr>
                        <th>Classe d'âge</th>
                        <th>Homme</th>
                        <th>Femme</th>
                        <th>Ensemble</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ages.map((age, index) => (
                        <tr key={index}>
                          <td>{age.classe}</td>
                          <td className={styles.numberCell}>{age.hommes}</td>
                          <td className={styles.numberCell}>{age.femmes}</td>
                          <td className={styles.numberCell}>{age.hommes + age.femmes}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className={styles.totalRow}>
                        <td>Total</td>
                        <td className={styles.numberCell}>{totalAges.hommes}</td>
                        <td className={styles.numberCell}>{totalAges.femmes}</td>
                        <td className={styles.numberCell}>{totalAges.hommes + totalAges.femmes}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </section>
            </div>
          ) : (
            <section className={styles.exportSection}>
              <h2>Rapports exportables</h2>
              <div className={styles.exportPlaceholder}>
                <button 
                  className={styles.exportBtn} 
                  onClick={generatePDF}
                  disabled={isGeneratingPDF}
                >
                  {isGeneratingPDF ? 'Génération en cours...' : 'Générer PDF'}
                </button>
                <button className={styles.exportBtn} disabled={isGeneratingPDF}>
                  Exporter CSV
                </button>
                
                <div className={styles.printNote}>
                  <p>Conseils pour une meilleure qualité d'export PDF :</p>
                  <ul>
                    <li>Utilisez l'orientation portrait pour une meilleure continuité</li>
                    <li>Évitez les transformations CSS qui pourraient affecter le rendu</li>
                    <li>Vérifiez que tous les tableaux sont visibles avant l'export</li>
                  </ul>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default StatRapport;
