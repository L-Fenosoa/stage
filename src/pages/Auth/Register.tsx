import React from 'react';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Inscription</h2>
      {/* Formulaire d’inscription ici */}
      <p>Formulaire à implémenter...</p>
      <button onClick={() => navigate('/')}>Retour</button>
    </div>
  );
};

export default Register;
