import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './InscriptionListAdmin.module.css';
import AdminSidebar from '../../../components/AdminSidebar/AdminSidebar';

const MOCK_INSCRIPTIONS = [
  { id: 'T1', nom: 'Rakoto', prenom: 'Jean' },
  { id: 'T2', nom: 'Randria', prenom: 'Fanja' },
];

const InscriptionListAdmin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles.layout}>
      <AdminSidebar currentPath={location.pathname} />
      <div className={styles.container}>
        <div className={styles.card}>
          <h4 className={styles.title}>Liste des inscriptions des travailleurs</h4>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_INSCRIPTIONS.map(i => (
                  <tr key={i.id}>
                    <td>{i.id}</td>
                    <td>{i.nom}</td>
                    <td>{i.prenom}</td>
                    <td>
                      <button
                        className={styles.detail}
                        onClick={() => navigate(`/admin/inscriptiondetailsadmin/${i.id}`)}
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

export default InscriptionListAdmin;
