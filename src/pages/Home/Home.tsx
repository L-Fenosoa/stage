// src/pages/Home/Home.tsx
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import logo from '../../assets/logo.png';
import imgIntro from '../../assets/home1.png';
import imgTrav from '../../assets/home2.png';
import imgEtab from '../../assets/home3.png';
import { useAuth } from '../../context/AuthContext';

type SectionKey = 'intro' | 'travailleur' | 'etablissement';

interface Section {
  key: SectionKey;
  title: string;
  text: string;
  img: string;
  hoverTitle: string;
  hoverText: string;
  actionLabel: string;
  actionTo: string;
}

const sections: Section[] = [
  {
    key: 'intro',
    title: 'Maison de L’Emploi et de la Formation Région Haute‑Matsiatra',
    text:
      'Bienvenue sur la plateforme qui dynamise l’emploi et la formation locale, pour un avenir prometteur de notre région.',
    img: imgIntro,
    hoverTitle:
      'Maison de L’Emploi et de la Formation dans la Région Haute‑Matsiatra',
    hoverText:
      'Une introduction concise sur l’objectif global de la plateforme, sa mission et son impact pour la région.',
    actionLabel: 'En savoir plus',
    actionTo: '/#',
  },
  {
    key: 'travailleur',
    title: 'Espace Travailleur',
    text:
      'Découvrez les offres d’emploi, postulez en un clic et suivez vos candidatures en temps réel.',
    img: imgTrav,
    hoverTitle: 'Espace Travailleur',
    hoverText:
      'Le travailleur peut accéder facilement à une plateforme dédiée à l’emploi dans sa région : consulter des offres, postuler, suivre ses candidatures.',
    actionLabel: 'S’enregistrer',
    actionTo: '/travailleurhome',
  },
  {
    key: 'etablissement',
    title: 'Espace Établissement',
    text:
      'Publiez vos offres, gérez vos candidatures et trouvez rapidement le profil idéal.',
    img: imgEtab,
    hoverTitle: 'Espace Établissement',
    hoverText:
      'L’établissement bénéficie d’une interface simple pour publier des offres, centraliser les candidatures et fluidifier les échanges.',
    actionLabel: 'S’enregistrer',
    actionTo: '/etablissementhome',
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const sectionRefs = useRef<HTMLDivElement[]>([]);
  const [active, setActive] = useState<SectionKey>('intro');
  const [authOpen, setAuthOpen] = useState(false);
  const { isAuthenticated, role, name, logout } = useAuth();

  // Intersection Observer to track section in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(e.target.getAttribute('data-key') as SectionKey);
          }
        });
      },
      { threshold: 0.6 }
    );
    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });

  const curr = sections.find((s) => s.key === active)!;

  const handleRedirectToDashboard = () => {
    if (role === 'travailleur') navigate('/travailleur/dashboardtrav');
    else if (role === 'etablissement') navigate('/etablissement/dashboard');
    else if (role === 'admin') navigate('/admin/admindashboard');
    setAuthOpen(false);
  };

  const handleLogout = () => {
    logout();
    setAuthOpen(false);
    navigate('/');
  };

  return (
    <div className={styles.homePage}>
      <header className={styles.navbar}>
        <div className={styles.left}>
          <img
            src={logo}
            alt="Logo"
            className={styles.logo}
            onClick={scrollToTop}
          />
        </div>
        <nav
          className={styles.right}
          onMouseLeave={() => setAuthOpen(false)}
        >
          {!isAuthenticated ? (
            <>
              <button
                onMouseEnter={() => setAuthOpen(true)}
                onClick={() => setAuthOpen(!authOpen)}
                className={styles.link}
              >
                S’enregistrer / S’identifier ⌵
              </button>
              {authOpen && (
                <div className={styles.authDropdown}>
                  <p className={styles.authText}>
                    S’enregistrer ou s’identifier en tant que :
                  </p>
                  <button
                    className={styles.authBtn}
                    onClick={() => {
                      navigate('/travailleurhome');
                      setAuthOpen(false);
                    }}
                  >
                    Travailleur
                  </button>
                  <p className={styles.authOr}>ou</p>
                  <button
                    className={styles.authBtn}
                    onClick={() => {
                      navigate('/etablissementhome');
                      setAuthOpen(false);
                    }}
                  >
                    Établissement
                  </button>
                  <button
                    className={styles.authAdmin}
                    onClick={() => {
                      navigate('/adminidentification');
                      setAuthOpen(false);
                    }}
                  >
                    Administrateur
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className={styles.connectedBox}>
              <span className={styles.welcome}>
                Bienvenue, {name} ({role})
              </span>
              <button
                className={styles.link}
                onClick={handleRedirectToDashboard}
              >
                Informations
              </button>
              <button
                className={styles.logout}
                onClick={handleLogout}
              >
                Déconnexion
              </button>
            </div>
          )}
        </nav>
      </header>

      <div className={styles.content}>
        <div className={styles.leftCol}>
          {sections.map((s, i) => (
            <div
              key={s.key}
              data-key={s.key}
              ref={(el) => (sectionRefs.current[i] = el!)}
              className={styles.section}
            >
              <h2 className={styles.title}>{s.title}</h2>
              <p className={styles.text}>{s.text}</p>
              <button
                onClick={() => navigate(s.actionTo)}
                className={styles.btn}
              >
                <span className={styles.btnLabel}>{s.actionLabel}</span>
                <span className={styles.tabArrow}>→</span>
              </button>
            </div>
          ))}
        </div>

        <div className={styles.rightCol}>
          <div className={styles.hoverWrapper}>
            <img
              key={curr.key}
              src={curr.img}
              alt={curr.key}
              className={styles.imageFade}
            />
            <div className={styles.hoverInfo}>
              <strong>{curr.hoverTitle}</strong>
              <p>{curr.hoverText}</p>
            </div>
          </div>
        </div>
      </div>

      <button
        className={styles.fab}
        onClick={scrollToTop}
        aria-label="Retour en haut"
      >
        ↑
      </button>
    </div>
  );
}

export default Home;
