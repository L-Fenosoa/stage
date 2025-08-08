import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar/Navbar';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import Home from './pages/Home/Home';

// Établissement
import EtablissementHome from './pages/Etablissement/EtablissementHome/EtablissementHome';
import Identification from './pages/Etablissement/Identification/Identification';
import OuvertureForm from './pages/Etablissement/OuvertureForm/OuvertureForm';
import Dashboard from './pages/Etablissement/Dashboard/Dashboard';
import OffreEmploiForm from './pages/Etablissement/OffreEmploiForm/OffreEmploiForm';
import RenseignementsPeriodiquesForm from './pages/Etablissement/RenseignementsPeriodiquesForm/RenseignementsPeriodiquesForm';
import ReouvertureForm from './pages/Etablissement/ReouvertureForm/ReouvertureForm';
import FermetureForm from './pages/Etablissement/FermetureForm/FermetureForm';

// Travailleur
import TravailleurHome from './pages/Travailleur/TravailleurHome/TravailleurHome';
import IdentificationTrav from './pages/Travailleur/IdentificationTrav/IdentificationTrav';
import DashboardTrav from './pages/Travailleur/DashboardTrav/DashboardTrav';
import MiseAJourInfos from './pages/Travailleur/MiseAJourInfos/MiseAJourInfos';
import OffreList from './pages/Travailleur/OffreList/OffreList';
import OffreDetails from './pages/Travailleur/OffreDetails/OffreDetails';
import InscriptionTrav from './pages/Travailleur/InscriptionTrav/InscriptionTrav';

// Admin
import AdminIdentification from './pages/Admin/AdminIdentification/AdminIdentification';
import AdminEtablissementDashboard from './pages/Admin/AdminEtablissementDashboard/AdminEtablissementDashboard';
import DeclarationList from './pages/Admin/DeclarationList/DeclarationList';
import DeclarationDetails from './pages/Admin/DeclarationDetails/DeclarationDetails';
import RensList from './pages/Admin/RensList/RensList';
import RensDetails from './pages/Admin/RensDetails/RensDetails';
import OffreListAdmin from './pages/Admin/OffreListAdmin/OffreListAdmin';
import OffreDetailsAdmin from './pages/Admin/OffreDetailsAdmin/OffreDetailsAdmin';
import InscriptionListAdmin from './pages/Admin/InscriptionListAdmin/InscriptionListAdmin';
import InscriptionDetailsAdmin from './pages/Admin/InscriptionDetailsAdmin/InscriptionDetailsAdmin';
import StatRapport from './pages/Admin/StatRapport/StatRapport';

// Auth
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

const App: React.FC = () => (
  <AuthProvider>
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Établissement */}
        <Route path="/etablissement/identification" element={<Identification />} />
        <Route path="/etablissementhome" element={<EtablissementHome />} />
        <Route path="/etablissement/ouvertureform" element={<OuvertureForm />} />

        <Route
          path="/etablissement/dashboard/*"
          element={
            <ProtectedRoute requiredRole="etablissement">
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<p>Bienvenue sur votre tableau de bord établissement.</p>} />
          <Route path="offreemploiform" element={<OffreEmploiForm />} />
          <Route path="renseignementsperiodiquesform" element={<RenseignementsPeriodiquesForm />} />
          <Route path="reouvertureform" element={<ReouvertureForm />} />
          <Route path="fermetureform" element={<FermetureForm />} />
        </Route>

        {/* Travailleur */}
        <Route path="/travailleur/identificationtrav" element={<IdentificationTrav />} />
        <Route path="/travailleurhome" element={<TravailleurHome />} />
        <Route path="/travailleur/inscriptiontrav" element={<InscriptionTrav />} />

        <Route
          path="/travailleur/dashboardtrav"
          element={
            <ProtectedRoute requiredRole="travailleur">
              <DashboardTrav />
            </ProtectedRoute>
          }
        />
        <Route
          path="/travailleur/miseajourinfos"
          element={
            <ProtectedRoute requiredRole="travailleur">
              <MiseAJourInfos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/travailleur/offrelist"
          element={
            <ProtectedRoute requiredRole="travailleur">
              <OffreList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/travailleur/offredetails/:id"
          element={
            <ProtectedRoute requiredRole="travailleur">
              <OffreDetails />
            </ProtectedRoute>
          }
        />

        {/* Admin identification */}
        <Route path="/adminidentification" element={<AdminIdentification />} />

        {/* Admin */}
        <Route
          path="/admin/statrapport"
          element={
            <ProtectedRoute requiredRole="admin">
              <StatRapport />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/adminetablissementdashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminEtablissementDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/declarationlist"
          element={
            <ProtectedRoute requiredRole="admin">
              <DeclarationList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/declarationdetails/:id"
          element={
            <ProtectedRoute requiredRole="admin">
              <DeclarationDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/renslist"
          element={
            <ProtectedRoute requiredRole="admin">
              <RensList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/rensdetails/:id"
          element={
            <ProtectedRoute requiredRole="admin">
              <RensDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/offrelistadmin"
          element={
            <ProtectedRoute requiredRole="admin">
              <OffreListAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/offredetailsadmin/:id"
          element={
            <ProtectedRoute requiredRole="admin">
              <OffreDetailsAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/travailleur/inscriptionlistadmin"
          element={
            <ProtectedRoute requiredRole="admin">
              <InscriptionListAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/inscriptiondetailsadmin/:id"
          element={
            <ProtectedRoute requiredRole="admin">
              <InscriptionDetailsAdmin />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
