import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AdminSidebar from '../../../components/AdminSidebar/AdminSidebar';
import OffreDetailsAdmin from '../OffreDetailsAdmin/OffreDetailsAdmin';
import styles from './OffreListAdmin.module.css';

interface Offre {
  id: string;
  titre: string;
  etablissement: string;
  validated: boolean;
}

const MOCK_OFFRES: Offre[] = [
  { id: 'A1', titre: 'Dev Backend', etablissement: 'Société XYZ', validated: false },
  { id: 'B2', titre: 'Chef de projet', etablissement: 'Entreprise ABC', validated: true },
  { id: 'C3', titre: 'UX Designer', etablissement: 'Agence 123', validated: false },
  { id: 'D4', titre: 'Data Scientist', etablissement: 'Usine 456', validated: true },
];

const OffreListAdmin: React.FC = () => {
  const location = useLocation();
  const [pending, setPending] = useState<Offre[]>([]);
  const [validated, setValidated] = useState<Offre[]>([]);
  const [modalId, setModalId] = useState<string | null>(null);

  useEffect(() => {
    setPending(MOCK_OFFRES.filter(o => !o.validated));
    setValidated(MOCK_OFFRES.filter(o => o.validated));
  }, []);

  const findOffre = (id: string) => {
    return [...pending, ...validated].find(o => o.id === id) || null;
  };

  /* Actions manipulant l'état local (simuler appels API ici) */
  const handleValidate = (id: string) => {
    const offer = findOffre(id);
    if (!offer) return;
    setPending(prev => prev.filter(p => p.id !== id));
    setValidated(prev => [{ ...offer, validated: true }, ...prev]);
    setModalId(null);
  };

  const handleRefuse = (id: string) => {
    // suppression (refusée)
    setPending(prev => prev.filter(p => p.id !== id));
    setModalId(null);
  };

  const handleInvalidate = (id: string) => {
    const offer = findOffre(id);
    if (!offer) return;
    setValidated(prev => prev.filter(v => v.id !== id));
    setPending(prev => [{ ...offer, validated: false }, ...prev]);
    setModalId(null);
  };

  const handleArchive = (id: string) => {
    // suppression (archivée)
    setValidated(prev => prev.filter(v => v.id !== id));
    setModalId(null);
  };

  return (
    <div className={styles.layout}>
      <AdminSidebar currentPath={location.pathname} />

      <main className={styles.main}>
        <div className={styles.counters}>
          <div className={styles.counterCard}>
            <span className={styles.count}>{pending.length}</span>
            <span className={styles.label}>En attente</span>
          </div>
          <div className={styles.counterCard}>
            <span className={styles.count}>{validated.length}</span>
            <span className={styles.label}>Validées</span>
          </div>
        </div>

        <div className={styles.lists}>
          <div className={styles.listSection}>
            <h4 className={styles.listTitle}>En attente</h4>
            <ul className={styles.list}>
              {pending.map(o => (
                <li key={o.id} className={styles.pendingItem}>
                  <span className={styles.offreText}>
                    {o.titre} — {o.etablissement}
                  </span>
                  <button
                    className={styles.eyeBtn}
                    onClick={() => setModalId(o.id)}
                    aria-label="Voir détails"
                    title="Voir détails"
                  >
                    {/* œil SVG */}
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                      <path fill="currentColor" d="M12 5c-7.6 0-12 6.5-12 6.5s4.4 6.5 12 6.5 12-6.5 12-6.5S19.6 5 12 5z"/>
                      <circle fill="currentColor" cx="12" cy="11.5" r="2.5"/>
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.listSection}>
            <h4 className={styles.listTitle}>Validées</h4>
            <ul className={styles.list}>
              {validated.map(o => (
                <li key={o.id} className={styles.validItem}>
                  <span className={styles.offreText}>
                    {o.titre} — {o.etablissement}
                  </span>
                  <button
                    className={styles.eyeBtn}
                    onClick={() => setModalId(o.id)}
                    aria-label="Voir détails"
                    title="Voir détails"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                      <path fill="currentColor" d="M12 5c-7.6 0-12 6.5-12 6.5s4.4 6.5 12 6.5 12-6.5 12-6.5S19.6 5 12 5z"/>
                      <circle fill="currentColor" cx="12" cy="11.5" r="2.5"/>
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      {/* Modal détails (centré à droite du sidebar et sous la navbar) */}
      {modalId && (
        <div className={styles.modalOverlay} onClick={() => setModalId(null)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            {/* on passe l'offre et handlers */}
            <OffreDetailsAdmin
              offre={findOffre(modalId)!}
              onClose={() => setModalId(null)}
              onValidate={() => handleValidate(modalId)}
              onRefuse={() => handleRefuse(modalId)}
              onInvalidate={() => handleInvalidate(modalId)}
              onArchive={() => handleArchive(modalId)}
            />
            <button
              className={styles.closeBtn}
              onClick={() => setModalId(null)}
              aria-label="Fermer"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OffreListAdmin;
