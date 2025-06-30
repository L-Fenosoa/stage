// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages génériques
import Home from './pages/Home';

// Espace Établissement
import EtablissementHome from './pages/Etablissement/EtablissementHome';
import Identification from './pages/Etablissement/Identification';
import OuvertureForm from './pages/Etablissement/OuvertureForm';
import Dashboard from './pages/Etablissement/Dashboard';
import OffreEmploiForm from './pages/Etablissement/OffreEmploiForm';
import RenseignementsPeriodiquesForm from './pages/Etablissement/RenseignementsPeriodiquesForm';
import ReouvertureForm from './pages/Etablissement/ReouvertureForm';
import FermetureForm from './pages/Etablissement/FermetureForm';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      {/* Page d'accueil */}
      <Route path="/" element={<Home />} />

      {/* Espace Établissement */}
      <Route path="etablissementhome" element={<EtablissementHome />} />
      <Route path="etablissement/identification" element={<Identification />} />
      <Route path="etablissement/identification/:context" element={<Identification />} />
      <Route path="etablissement/ouvertureform" element={<OuvertureForm />} />
      <Route path="etablissement/dashboard" element={<Dashboard />} />
      <Route path="etablissement/offreemploiform" element={<OffreEmploiForm />} />
      <Route path="etablissement/renseignementsperiodiquesform" element={<RenseignementsPeriodiquesForm />} />
      <Route path="etablissement/reouvertureform" element={<ReouvertureForm />} />
      <Route path="etablissement/fermetureform" element={<FermetureForm />} />

      {/* 404 */}
      <Route path="*" element={<h2>Page non trouvée</h2>} />
    </Routes>
  </BrowserRouter>
);

export default App;
