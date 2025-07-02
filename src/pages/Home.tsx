import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import logo from '../assets/logo.png';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.homePage}>
      <div className={styles.pageTitleContainer}>
        <div className={styles.titleRow}>
          <img src={logo} alt="Logo" className={styles.logo} />
          <h1 className={styles.pageTitle}>
            Maison de L’Emploi et de la Formation <br />
            dans la Région Haute-Matsiatra
          </h1>
        </div>
      </div>

      <div className={styles.contentRow}>
        <div className={styles.textBlock}>
          <ul>
            <li>
              Une passerelle fiable et moderne entre les établissements professionnels et les
              travailleurs malagasy.
            </li><br />
            <li>Facilitez la diffusion d’offres d’emploi.</li><br />
            <li>Simplifiez la déclaration d’activités.</li><br /><br />
          </ul>
          <p className={styles.justifiedText}>
            Notre plateforme a été conçue pour fluidifier les échanges entre les différents acteurs
            du monde professionnel à Madagascar. Elle permet de réduire les délais administratifs,
            centraliser les démarches essentielles et offrir un point d’accès unique aux
            informations clés pour chacun.
          </p>
        </div>

        <fieldset className={styles.accessField}>
          <legend className={styles.legend}>Accéder aux divers espaces :</legend>
          <div className={styles.cards}>
            <div className={styles.card}>
              <button
                className={styles.cardBtn}
                onClick={() => navigate('/etablissementhome')}
              >
                Espace Établissement
              </button>
              <p className={styles.cardDesc}>
                Gérez facilement vos déclarations d'activité et publiez vos offres d’emploi
                directement depuis votre espace dédié.
              </p>
            </div>

            <div className={styles.card}>
              <button
                className={styles.cardBtn}
                onClick={() => navigate('/travailleurhome')}
              >
                Espace Travailleur
              </button>
              <p className={styles.cardDesc}>
                Accédez à des offres personnalisées, postulez en quelques clics et suivez l’évolution
                de votre parcours professionnel.
              </p>
            </div>
          </div>
        </fieldset>
      </div>

      <div className={styles.adminLink}>
        <a href="/adminidentification">Administration</a>
      </div>
    </div>
  );
};

export default Home;
