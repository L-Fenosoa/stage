// src/pages/Travailleur/TravailleurHome/TravailleurHome.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import styles from './TravailleurHome.module.css';

const TravailleurHome: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();             // ← on récupère login()
  const [showModal, setShowModal] = useState(false);
  const [identifiant, setIdentifiant] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  const handleIdentification = () => {
    if (!identifiant || !motDePasse) {
      alert('Veuillez remplir les champs requis.');
      return;
    }
    // on « loggue » l’utilisateur avec rôle travailleur
    login(identifiant, 'travailleur');
    // puis on navigue
    navigate('/travailleur/dashboardtrav');
  };

  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={() => navigate('/')}>
        ← Retour
      </button>
      <header className={styles.hero}>
        <h2 className={styles.title}>Espace Travailleur</h2>
        <p className={styles.description}>
          Accédez facilement à vos services personnels. Identifiez-vous pour gérer vos démarches ou inscrivez-vous si vous êtes nouveau.
        </p>
      </header>
      <div className={styles.buttons}>
        <div className={styles.card}>
          <button
            className={styles.buttonIdentification}
            onClick={() => setShowModal(true)}
          >
            Identification
          </button>
          <p className={styles.btnDesc}>
            Connectez-vous rapidement et en toute sécurité à votre compte.
          </p>
        </div>
        <div className={styles.card}>
          <button
            className={styles.buttonInscription}
            onClick={() => navigate('/travailleur/inscriptiontrav')}
          >
            Inscription
          </button>
          <p className={styles.btnDesc}>
            Créez un nouveau compte pour accéder à tous les services.
          </p>
        </div>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Identification</h3>
            <label>
              Identifiant :
              <input
                type="text"
                value={identifiant}
                onChange={(e) => setIdentifiant(e.target.value)}
              />
            </label>
            <label>
              Mot de passe :
              <input
                type="password"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
              />
            </label>
            <div className={styles.modalActions}>
              <button onClick={handleIdentification}>Valider</button>
              <button onClick={() => setShowModal(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravailleurHome;
