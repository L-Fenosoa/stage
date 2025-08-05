import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [role, setRole] = useState<'travailleur' | 'etablissement' | 'admin'>('travailleur');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(name, role);
    if (role === 'travailleur') navigate('/travailleur/dashboardtrav');
    else if (role === 'etablissement') navigate('/etablissement/dashboard');
    else navigate('/admin/admindashboard');
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: '2rem auto' }}>
      <h2>Connexion</h2>
      <label>
        Nom :
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Rôle :
        <select value={role} onChange={e => setRole(e.target.value as any)}>
          <option value="travailleur">Travailleur</option>
          <option value="etablissement">Établissement</option>
          <option value="admin">Administrateur</option>
        </select>
      </label>
      <br />
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default Login;
