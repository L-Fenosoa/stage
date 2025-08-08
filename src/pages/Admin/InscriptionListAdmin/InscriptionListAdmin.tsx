import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import AdminSidebar from '../../../components/AdminSidebar/AdminSidebar';
import InscriptionDetailsAdmin from '../InscriptionDetailsAdmin/InscriptionDetailsAdmin';
import styles from './InscriptionListAdmin.module.css';

interface Inscription {
  id: string;
  nom: string;
  prenom: string;
  date?: string;
  // autres champs possibles...
}

/* MOCK — remplacer par fetch réel depuis l'API */
const MOCK_INSCRITS: Inscription[] = [
  { id: 'T1', nom: 'Rakoto', prenom: 'Jean', date: '2024-11-12' },
  { id: 'T3', nom: 'Rabe', prenom: 'Miora', date: '2025-01-08' },
];

const MOCK_EN_ATTENTE: Inscription[] = [
  { id: 'T2', nom: 'Randria', prenom: 'Fanja', date: '2025-06-02' },
  { id: 'T4', nom: 'Andry', prenom: 'Hery', date: '2025-06-10' },
];

const InscriptionListAdmin: React.FC = () => {
  const location = useLocation();

  const [active, setActive] = useState<'inscrits' | 'attente'>('inscrits');
  const [modalId, setModalId] = useState<string | null>(null);

  // dans la vraie application on récupèrera les arrays depuis l'API
  const inscrits = useMemo(() => MOCK_INSCRITS, []);
  const attente = useMemo(() => MOCK_EN_ATTENTE, []);

  const countInscrits = inscrits.length;
  const countAttente = attente.length;

  const isPending = (id: string | null) =>
    !!id && !!attente.find(a => a.id === id);

  return (
    <div className={styles.layout}>
      <AdminSidebar currentPath={location.pathname} />

      <main className={styles.main}>
        {/* Top toggles */}
        <div className={styles.topControls}>
          <div className={styles.toggleGroup}>
            <button
              type="button"
              className={`${styles.toggleBtn} ${active === 'inscrits' ? styles.active : ''}`}
              onClick={() => setActive('inscrits')}
              aria-pressed={active === 'inscrits'}
            >
              <span className={styles.count}>{countInscrits}</span>
              <span className={styles.label}>Travailleurs inscrits</span>
            </button>

            <button
              type="button"
              className={`${styles.toggleBtn} ${active === 'attente' ? styles.active : ''}`}
              onClick={() => setActive('attente')}
              aria-pressed={active === 'attente'}
            >
              <span className={styles.count}>{countAttente}</span>
              <span className={styles.label}>Inscriptions en attente</span>
            </button>
          </div>
        </div>

        {/* Contenu principal */}
        <section className={styles.content}>
          {active === 'inscrits' ? (
            <div className={styles.card}>
              <h4 className={styles.title}>Travailleurs inscrits</h4>

              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {inscrits.map(i => (
                      <tr key={i.id}>
                        <td>{i.id}</td>
                        <td>{i.nom}</td>
                        <td>{i.prenom}</td>
                        <td>{i.date ?? '—'}</td>
                        <td className={styles.actionsCell}>
                          <button
                            className={styles.actionBtn}
                            onClick={() => setModalId(i.id)}
                            aria-label={`Détails ${i.id}`}
                          >
                            Détails
                          </button>
                        </td>
                      </tr>
                    ))}
                    {inscrits.length === 0 && (
                      <tr>
                        <td colSpan={5} className={styles.empty}>Aucun travailleur inscrit.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className={styles.card}>
              <h4 className={styles.title}>Inscriptions en attente</h4>

              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {attente.map(i => (
                      <tr key={i.id} className={styles.pendingRow}>
                        <td>{i.id}</td>
                        <td>{i.nom}</td>
                        <td>{i.prenom}</td>
                        <td>{i.date ?? '—'}</td>
                        <td className={styles.actionsCell}>
                          <button
                            className={styles.proceedBtn}
                            onClick={() => setModalId(i.id)}
                            aria-label={`Procéder ${i.id}`}
                          >
                            Procéder
                          </button>
                        </td>
                      </tr>
                    ))}
                    {attente.length === 0 && (
                      <tr>
                        <td colSpan={5} className={styles.empty}>Aucune inscription en attente.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Modal */}
      {modalId && (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          onClick={() => setModalId(null)}
        >
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <InscriptionDetailsAdmin
              id={modalId}
              isPending={isPending(modalId)}
              onClose={() => setModalId(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InscriptionListAdmin;
