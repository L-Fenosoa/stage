// src/pages/Admin/AdminEtablissementDashboard/AdminEtablissementDashboard.tsx
import React, { useState } from 'react';
import AdminSidebar from '../../../components/AdminSidebar/AdminSidebar';
import OffreListAdmin from '../OffreListAdmin/OffreListAdmin';
import DeclarationList from '../DeclarationList/DeclarationList';
import RensList from '../RensList/RensList';
import styles from './AdminEtablissementDashboard.module.css';

type Tab = 'offres' | 'declarations' | 'rens';

const AdminEtablissementDashboard: React.FC = () => {
  const currentPath = '/admin/etablissementdashboard';
  const [activeTab, setActiveTab] = useState<Tab>('offres');

  const renderContent = () => {
    switch (activeTab) {
      case 'offres':
        return <OffreListAdmin />;
      case 'declarations':
        return <DeclarationList />;
      case 'rens':
        return <RensList />;
    }
  };

  return (
    <div className={styles.layout}>
      <AdminSidebar currentPath={currentPath} />

      <main className={styles.container}>
        {/* Onglets */}
        <div className={styles.tabsWrapper}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'offres' ? styles.active : styles.inactive}`}
              onClick={() => setActiveTab('offres')}
            >
              Offres d'emploi
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'declarations' ? styles.active : styles.inactive}`}
              onClick={() => setActiveTab('declarations')}
            >
              Déclarations d'établissement
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'rens' ? styles.active : styles.inactive}`}
              onClick={() => setActiveTab('rens')}
            >
              Renseignements périodiques
            </button>
          </div>
        </div>

        {/* Contenu */}
        <section className={styles.content}>
          {renderContent()}
        </section>
      </main>
    </div>
  );
};

export default AdminEtablissementDashboard;
