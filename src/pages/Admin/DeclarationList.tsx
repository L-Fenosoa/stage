import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './DeclarationList.module.css';
import Sidebar from '../../components/AdminSidebar';

interface DeclarationItem {
  id: string;
  type: 'Ouverture' | 'Réouverture' | 'Fermeture';
  nomEtablissement: string;
}

const MOCK_DECLARATIONS: DeclarationItem[] = [
  { id: '1', type: 'Ouverture', nomEtablissement: 'Société XYZ' },
  { id: '2', type: 'Réouverture', nomEtablissement: 'Entreprise ABC' },
  { id: '3', type: 'Fermeture', nomEtablissement: 'Usine 123' },
];

const DeclarationList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles.layout}>
      <Sidebar currentPath={location.pathname} />
      <div className={styles.container}>

        <div className={styles.card}>
          <h4 className={styles.title}>Liste des déclarations</h4>

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Nom de l’établissement</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {MOCK_DECLARATIONS.map(d => (
                  <tr key={d.id}>
                    <td>{d.id}</td>
                    <td>{d.type}</td>
                    <td>{d.nomEtablissement}</td>
                    <td>
                      <button
                        className={styles.detail}
                        onClick={() => navigate(`/admin/declarationdetails/${d.id}`)}
                      >
                        Procéder
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

export default DeclarationList;
