import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './RensList.module.css';
import Sidebar from '../../../components/AdminSidebar/AdminSidebar';

interface RensItem {
  id: string;
  nomEtablissement: string;
  date: string;
}

const MOCK_RENS: RensItem[] = [
  { id: 'A', nomEtablissement: 'Société XYZ', date: '2025-06-01' },
  { id: 'B', nomEtablissement: 'Entreprise ABC', date: '2025-03-15' },
];

const RensList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles.layout}>
      <Sidebar currentPath={location.pathname} />
      <div className={styles.container}>

        <div className={styles.card}>
          <h4 className={styles.title}>Liste des renseignements périodiques</h4>

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom de l’établissement</th>
                  <th>Année</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_RENS.map(r => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.nomEtablissement}</td>
                    <td>{r.date.slice(0, 4)}</td>
                    <td>
                      <button
                        className={styles.detail}
                        onClick={() => navigate(`/admin/rensdetails/${r.id}`)}
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

export default RensList;
