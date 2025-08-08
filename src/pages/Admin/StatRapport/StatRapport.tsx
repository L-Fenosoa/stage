import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AdminSidebar from '../../../components/AdminSidebar/AdminSidebar';
import styles from './StatRapport.module.css';

interface KPIData {
  totalInscriptions: number;
  totalOffres: number;
}
interface MetierData {
  metier: string;
  count: number;
}
interface SecteurData {
  secteur: string;
  percent: number;
}

const StatRapport: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'statistiques' | 'rapports'>('statistiques');
  const [kpi, setKpi] = useState<KPIData>({ totalInscriptions: 0, totalOffres: 0 });
  const [topMetiers, setTopMetiers] = useState<MetierData[]>([]);
  const [secteurs, setSecteurs] = useState<SecteurData[]>([]);

  useEffect(() => {
    // TODO : remplacer par de vrais appels API
    setKpi({ totalInscriptions: 1245, totalOffres: 367 });
    setTopMetiers([
      { metier: 'Dév. Full Stack', count: 45 },
      { metier: 'Technicien BTP', count: 37 },
    ]);
    setSecteurs([
      { secteur: 'Services', percent: 45 },
      { secteur: 'BTP', percent: 25 },
      { secteur: 'Industrie', percent: 15 },
      { secteur: 'Santé', percent: 10 },
      { secteur: 'Logistique', percent: 5 },
    ]);
  }, []);

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
            <>
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
                <h2>2. Demandeurs d’emploi</h2>
                <div className={styles.chartsRow}>
                  <div className={styles.chartPlaceholder}><h3>Répartition par sexe</h3></div>
                  <div className={styles.chartPlaceholder}><h3>Tranches d’âge</h3></div>
                  <div className={styles.chartPlaceholder}><h3>Niveau de diplôme</h3></div>
                </div>
              </section>

              <section className={styles.statsSection}>
                <h2>3. Offres d’emploi</h2>
                <div className={styles.chartsRow}>
                  <div className={styles.chartPlaceholder}>
                    <h3>Top métiers</h3>
                    <ol className={styles.topList}>
                      {topMetiers.map((m, i) => (
                        <li key={i}>{m.metier} ({m.count})</li>
                      ))}
                    </ol>
                  </div>
                  <div className={styles.chartPlaceholder}><h3>Répartition secteurs</h3></div>
                </div>
              </section>
            </>
          ) : (
            <section className={styles.exportSection}>
              <h2>Rapports exportables</h2>
              <div className={styles.exportPlaceholder}>
                <button className={styles.exportBtn}>Générer PDF</button>
                <button className={styles.exportBtn}>Exporter CSV</button>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default StatRapport;
