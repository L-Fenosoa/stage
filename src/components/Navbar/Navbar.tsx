// src/components/Navbar/Navbar.tsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../assets/logo.png';

const Navbar: React.FC = () => {
  const { isAuthenticated, name, role, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleDashboardRedirect = () => {
    if (role === 'travailleur') {
      navigate('/travailleur/dashboardtrav');
    } else if (role === 'etablissement') {
      navigate('/etablissement/dashboard');
    } else if (role === 'admin') {
      navigate('/admin/statrapport');
    }
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <img
          src={logo}
          alt="Logo"
          className={styles.logo}
          onClick={() => navigate('/')}
        />
      </div>

      <div
        className={styles.right}
        onMouseLeave={() => setDropdownOpen(false)}
      >
        {isAuthenticated ? (
          <>
            <button
              onMouseEnter={() => setDropdownOpen(true)}
              className={styles.link}
            >
              {name} ({role}) ⌵
            </button>
            {dropdownOpen && (
              <div className={styles.authDropdown}>
                <button
                  onClick={handleDashboardRedirect}
                  className={styles.authBtn}
                >
                  Mon tableau de bord
                </button>
                <button
                  onClick={handleLogout}
                  className={styles.authAdmin}
                >
                  Se déconnecter
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <button
              onMouseEnter={() => setDropdownOpen(true)}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={styles.link}
            >
              S’enregistrer / S’identifier ⌵
            </button>
            {dropdownOpen && (
              <div className={styles.authDropdown}>
                <p className={styles.authText}>
                  S’enregistrer ou s’identifier en tant que :
                </p>
                <button
                  className={styles.authBtn}
                  onClick={() => {
                    navigate('/travailleurhome');
                    setDropdownOpen(false);
                  }}
                >
                  Travailleur
                </button>
                <p className={styles.authOr}>ou</p>
                <button
                  className={styles.authBtn}
                  onClick={() => {
                    navigate('/etablissementhome');
                    setDropdownOpen(false);
                  }}
                >
                  Établissement
                </button>
                <button
                  className={styles.authAdmin}
                  onClick={() => {
                    navigate('/adminidentification');
                    setDropdownOpen(false);
                  }}
                >
                  Administrateur
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
}; // ← <== il manquait cette accolade pour fermer le composant

export default Navbar;
