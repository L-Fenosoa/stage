import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext'; // ✅ Import du contexte
import styles from './EtablissementHome.module.css';

const actions = [
  {
    label: 'Identification',
    to: '/etablissement/identification', // ← seulement utilisé si pas de modal
    description: 'Commencez par identifier votre établissement pour accéder aux services.',
  },
  {
    label: 'Ouverture',
    to: '/etablissement/ouvertureform',
    description: 'Soumettez un formulaire d’ouverture d’établissement rapidement.',
  },
];

const EtablissementHome: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Accès au contexte
  const [showModal, setShowModal] = useState(false);
  const [identifiant, setIdentifiant] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  const handleIdentification = () => {
    if (identifiant && motDePasse) {
      login(identifiant, 'etablissement'); // ✅ Connexion via contexte
      navigate('/etablissement/dashboard'); // ✅ Redirection
    } else {
      alert('Veuillez remplir les champs requis.');
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={() => navigate('/')}>
        ← Retour
      </button>

      <header className={styles.hero}>
        <h2 className={styles.title}>
          Espace Établissement<br />
          Gérez vos déclarations et formulaires en toute simplicité
        </h2>
      </header>

      <div className={styles.actions}>
        {actions.map((act, i) => (
          <div key={i} className={styles.card}>
            <button
              className={styles.btn}
              onClick={() => {
                if (act.label === 'Identification') {
                  setShowModal(true);
                } else {
                  navigate(act.to);
                }
              }}
            >
              {act.label}
            </button>
            <p className={styles.desc}>{act.description}</p>
          </div>
        ))}
      </div>

      {/* MODAL D'IDENTIFICATION */}
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

export default EtablissementHome;
