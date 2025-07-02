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

// Espace Travailleur
import TravailleurHome from './pages/Travailleur/TravailleurHome';
import IdentificationTrav from './pages/Travailleur/IdentificationTrav';
import DashboardTrav from './pages/Travailleur/DashboardTrav';
import MiseAJourInfos from './pages/Travailleur/MiseAJourInfos';
import OffreList from './pages/Travailleur/OffreList';
import OffreDetails from './pages/Travailleur/OffreDetails';
import InscriptionTrav from './pages/Travailleur/InscriptionTrav';

// Espace Admin
import AdminIdentification from './pages/Admin/AdminIdentification';
import AdminDashboard from './pages/Admin/AdminDashboard';
import DeclarationList from './pages/Admin/DeclarationList';
import DeclarationDetails from './pages/Admin/DeclarationDetails';
import RensList from './pages/Admin/RensList';
import RensDetails from './pages/Admin/RensDetails';
import OffreListAdmin from './pages/Admin/OffreListAdmin';
import OffreDetailsAdmin from './pages/Admin/OffreDetailsAdmin';
import InscriptionListAdmin from './pages/Admin/InscriptionListAdmin';
import InscriptionDetailsAdmin from './pages/Admin/InscriptionDetailsAdmin';
import StatRapport from './pages/Admin/StatRapport'; // ✅ AJOUT ICI

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
      <Route path="etablissement/dashboard" element={<Dashboard />}>
        <Route index element={<p style={{ color: 'gray' }}>Bienvenue sur le tableau de bord de votre établissement.</p>} />
        <Route path="offreemploiform" element={<OffreEmploiForm />} />
        <Route path="renseignementsperiodiquesform" element={<RenseignementsPeriodiquesForm />} />
        <Route path="reouvertureform" element={<ReouvertureForm />} />
        <Route path="fermetureform" element={<FermetureForm />} />
      </Route>

      {/* Espace Travailleur */}
      <Route path="travailleurhome" element={<TravailleurHome />} />
      <Route path="travailleur/identificationtrav" element={<IdentificationTrav />} />
      <Route path="travailleur/dashboardtrav" element={<DashboardTrav />} />
      <Route path="travailleur/miseajourinfos" element={<MiseAJourInfos />} />
      <Route path="travailleur/offrelist" element={<OffreList />} />
      <Route path="travailleur/offredetails/:id" element={<OffreDetails />} />
      <Route path="travailleur/inscriptiontrav" element={<InscriptionTrav />} />

      {/* Espace Admin */}
      <Route path="adminidentification" element={<AdminIdentification />} />
      <Route path="admin/admindashboard" element={<AdminDashboard />} />
      <Route path="admin/declarationlist" element={<DeclarationList />} />
      <Route path="admin/declarationdetails/:id" element={<DeclarationDetails />} />
      <Route path="admin/renslist" element={<RensList />} />
      <Route path="admin/rensdetails/:id" element={<RensDetails />} />
      <Route path="admin/offrelistadmin" element={<OffreListAdmin />} />
      <Route path="admin/offredetailsadmin/:id" element={<OffreDetailsAdmin />} />
      <Route path="admin/inscriptionlistadmin" element={<InscriptionListAdmin />} />
      <Route path="admin/inscriptiondetailsadmin/:id" element={<InscriptionDetailsAdmin />} />
      <Route path="admin/statrapport" element={<StatRapport />} /> {/* ✅ Route ajoutée */}

      {/* 404 */}
      <Route path="*" element={<h2>Page non trouvée</h2>} />
    </Routes>
  </BrowserRouter>
);

export default App;
