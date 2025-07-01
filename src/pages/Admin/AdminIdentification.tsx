// src/pages/Admin/AdminIdentification.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminIdentification: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = () => {
    // TODO : authentification réelle
    navigate('/admin/admindashboard');
  };

  return (
    <div>
      <button onClick={() => navigate('/')}>Retour</button>
      <h3>Administration – Identification</h3>
      <div>
        <label>
          Identifiant :
          <input value={user} onChange={e => setUser(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Mot de passe :
          <input type="password" value={pass} onChange={e => setPass(e.target.value)} />
        </label>
      </div>
      <div>
        <button onClick={handleSubmit}>Suivant</button>
      </div>
    </div>
  );
};

export default AdminIdentification;
