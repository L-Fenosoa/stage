// src/pages/Admin/AdminIdentification/AdminIdentification.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import styles from './AdminIdentification.module.css';

const AdminIdentification: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: ici appeler votre API pour vérifier `user` / `pass`
    // Si OK :
    login(user, 'admin');
    navigate('/admin/statrapport');
  };

  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={() => navigate('/')}>
        Retour
      </button>

      <div className={styles.card}>
        <h3 className={styles.title}>Administration – Identification</h3>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            Identifiant :
            <input
              className={styles.input}
              type="text"
              value={user}
              onChange={e => setUser(e.target.value)}
              autoComplete="username"
              required
            />
          </label>
          <label className={styles.label}>
            Mot de passe :
            <input
              className={styles.input}
              type="password"
              value={pass}
              onChange={e => setPass(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>
          <button className={styles.submitBtn} type="submit">
            Suivant
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminIdentification;
