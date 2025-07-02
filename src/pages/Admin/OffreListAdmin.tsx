import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './OffreListAdmin.module.css';
import AdminSidebar from '../../components/AdminSidebar';

const MOCK_OFFRES = [
  { id: 'X', titre: 'Dev Backend' },
  { id: 'Y', titre: 'Chef de projet' },
];

const OffreListAdmin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles.layout}>
      <AdminSidebar currentPath={location.pathname} />
      <div className={styles.container}>
        <div className={styles.card}>
          <h4 className={styles.title}>Liste des offres d’emploi</h4>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Titre</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_OFFRES.map(o => (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{o.titre}</td>
                    <td>
                      <button
                        className={styles.detail}
                        onClick={() => navigate(`/admin/offredetailsadmin/${o.id}`)}
                      >
                        Détails
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffreListAdmin;
