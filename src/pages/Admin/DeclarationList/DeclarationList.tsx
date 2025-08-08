import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../../../components/AdminSidebar/AdminSidebar';
import styles from './DeclarationList.module.css';
import DeclarationDetails from '../DeclarationDetails/DeclarationDetails';

interface DeclarationItem {
  id: string;
  type: 'Ouverture' | 'Réouverture' | 'Fermeture';
  nomEtablissement: string;
  date?: string;
}

interface Etablissement {
  id: string;
  nom: string;
  statut: 'ouvert' | 'ferme';
}

const MOCK_DECLARATIONS: DeclarationItem[] = [
  { id: '1', type: 'Ouverture', nomEtablissement: 'Société XYZ', date: '2025-06-01' },
  { id: '2', type: 'Réouverture', nomEtablissement: 'Entreprise ABC', date: '2025-06-10' },
  { id: '3', type: 'Fermeture', nomEtablissement: 'Usine 123', date: '2025-06-15' },
  { id: '4', type: 'Ouverture', nomEtablissement: 'Atelier Bleu', date: '2025-06-17' },
  { id: '5', type: 'Fermeture', nomEtablissement: 'Magasin Vert', date: '2025-06-20' },
];

const MOCK_ETABLISSEMENTS: Etablissement[] = [
  { id: 'E1', nom: 'Société XYZ', statut: 'ouvert' },
  { id: 'E2', nom: 'Entreprise ABC', statut: 'ouvert' },
  { id: 'E3', nom: 'Usine 123', statut: 'ferme' },
  { id: 'E4', nom: 'Atelier Bleu', statut: 'ouvert' },
  { id: 'E5', nom: 'Magasin Vert', statut: 'ferme' },
];

const DeclarationList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDeclaration, setSelectedDeclaration] = useState<string | null>(null);

  // Calculs des compteurs
  const countOuverture = MOCK_DECLARATIONS.filter(d => d.type === 'Ouverture').length;
  const countReouverture = MOCK_DECLARATIONS.filter(d => d.type === 'Réouverture').length;
  const countFermeture = MOCK_DECLARATIONS.filter(d => d.type === 'Fermeture').length;
  const totalOuverts = MOCK_ETABLISSEMENTS.filter(e => e.statut === 'ouvert').length;
  const totalFermes = MOCK_ETABLISSEMENTS.filter(e => e.statut === 'ferme').length;

  const handleProceedClick = (id: string) => {
    setSelectedDeclaration(id);
  };

  return (
    <div className={styles.layout}>
      <Sidebar currentPath={location.pathname} />

      <div className={styles.container}>
        {/* Top counters */}
        <div className={styles.topStats}>
          <div className={styles.leftStats}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>{countOuverture}</div>
              <div className={styles.statLabel}>Ouvertures</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>{countReouverture}</div>
              <div className={styles.statLabel}>Réouvertures</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>{countFermeture}</div>
              <div className={styles.statLabel}>Fermetures</div>
            </div>
          </div>

          <div className={styles.rightStats}>
            <div className={styles.statCardAlt}>
              <div className={styles.statNumberAlt}>{totalOuverts}</div>
              <div className={styles.statLabelAlt}>Établissements ouverts</div>
            </div>
            <div className={styles.statCardAlt}>
              <div className={styles.statNumberAlt}>{totalFermes}</div>
              <div className={styles.statLabelAlt}>Établissements fermés</div>
            </div>
          </div>
        </div>

        {/* Tableau */}
        <div className={styles.card}>
          <h4 className={styles.title}>Liste des déclarations</h4>

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Nom de l'établissement</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {MOCK_DECLARATIONS.map(d => (
                  <tr key={d.id}>
                    <td>{d.id}</td>
                    <td>{d.type}</td>
                    <td>{d.nomEtablissement}</td>
                    <td>{d.date ?? '—'}</td>
                    <td>
                      <button
                        className={styles.detail}
                        onClick={() => handleProceedClick(d.id)}
                      >
                        Procéder
                      </button>
                    </td>
                  </tr>
                ))}
                {MOCK_DECLARATIONS.length === 0 && (
                  <tr>
                    <td colSpan={5} className={styles.emptyRow}>Aucune déclaration trouvée.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal pour les détails */}
      {selectedDeclaration && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <DeclarationDetails 
              id={selectedDeclaration} 
              onClose={() => setSelectedDeclaration(null)} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DeclarationList;