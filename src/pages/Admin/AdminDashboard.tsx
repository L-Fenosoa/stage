import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminDashboard.module.css';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={() => navigate('/adminidentification')}>
        Retour
      </button>

      <div className={styles.card}>
        <h3 className={styles.title}>Administration – Tableau de bord</h3>
      </div>
      
      <br />
      
      <div className={styles.card}>
        <div className={styles.section}>
          <button className={styles.offreItem} onClick={() => navigate('/admin/declarationlist')}>
            Déclarations
          </button>

          <button className={styles.offreItem} onClick={() => navigate('/admin/renslist')}>
            Renseignements
          </button>

          <button className={styles.offreItem} onClick={() => navigate('/admin/offrelistadmin')}>
            Offres d’emploi
          </button>

          <button className={styles.offreItem} onClick={() => navigate('/admin/inscriptionlistadmin')}>
            Inscriptions
          </button>

          {/* <button className={styles.offreItem} onClick={() => navigate('/admin/rapport')}>
            Rapport
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
