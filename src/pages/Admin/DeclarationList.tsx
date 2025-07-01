// src/pages/Admin/DeclarationList.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DeclarationList.module.css';

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

  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={() => navigate('/admin/admindashboard')}>
        Retour
      </button>

      <div className={styles.card}>
        <h4 className={styles.title}>Liste des déclarations</h4>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Nom de l’établissement</th>
                <th>Action</th>
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
  );
};

export default DeclarationList;
