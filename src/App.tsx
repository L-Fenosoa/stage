// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages génériques
import Home from './pages/Home';

// Espace Établissement
import EtablissementHome from './pages/Etablissement/EtablissementHome';
import Identification from './pages/Etablissement/Identification';
import OuvertureForm from './pages/Etablissement/OuvertureForm';
import ReouvertureIdentification from './pages/Etablissement/ReouvertureIdentification';
import FermetureIdentification from './pages/Etablissement/FermetureIdentification';

// (À venir) Espace Travailleur
// import TravailleurHome from './pages/Travailleur/TravailleurHome';
// import IdentificationTrav from './pages/Travailleur/Identification';
// import OffreEmploiDetails from './pages/Travailleur/OffreEmploiDetails';

// (À venir) Espace Admin
// import AdminHome from './pages/Admin/AdminHome';
// import Rapport from './pages/Admin/Rapport';
// import OffresEmploiAdmin from './pages/Admin/OffresEmploiAdmin';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      {/* Page d'accueil */}
      <Route path="/" element={<Home />} />

      {/* Espace Établissement */}
      <Route path="etablissement" element={<EtablissementHome />} />
      <Route path="etablissement/identification" element={<Identification />} />
      <Route path="etablissement/ouverture" element={<OuvertureForm />} />
      <Route path="etablissement/reouverture" element={<ReouvertureIdentification />} />
      <Route path="etablissement/fermeture" element={<FermetureIdentification />} />

      {/* Espace Travailleur */}
      {/*
      <Route path="travailleur" element={<TravailleurHome />} />
      <Route path="travailleur/identification" element={<IdentificationTrav />} />
      <Route path="travailleur/offre-emploi/:id" element={<OffreEmploiDetails />} />
      */}

      {/* Espace Admin */}
      {/*
      <Route path="admin" element={<AdminHome />} />
      <Route path="admin/rapport" element={<Rapport />} />
      <Route path="admin/offres-emploi" element={<OffresEmploiAdmin />} />
      */}
    </Routes>
  </BrowserRouter>
);

export default App;
