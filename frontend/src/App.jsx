import react from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Onboarding from "./pages/Onboarding";
import GettingStarted from "./pages/GettingStarted";
import PetRegistrationForm from "./pages/PetRegistrationForm";
import UserPets from "./pages/UserPets";
import ScheduleService from "./pages/ScheduleService";
import ScheduledAppointments from "./pages/ScheduledAppointments";
import AdminHome from "./pages/AdminHome";
import AdminScheduledAppointments from "./pages/AdminScheduledAppointments";
import UpcomingAppointments from "./pages/UpcomingAppointments";
import AdminUpcomingAppointments from "./pages/AdminUpcomingAppointments";
import AdminUnfinishedAppointments from "./pages/AdminAccessUnfinished";
import AdminRegisteredPets from "./pages/AdminRegisteredPets";
import AdminProfiles from "./pages/AdminProfiles";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/pet-registration" 
          element={
          <ProtectedRoute>
            <PetRegistrationForm />
          </ProtectedRoute>} 
          />
        <Route 
          path="/user-pets" 
          element={
          <ProtectedRoute>
            <UserPets />
          </ProtectedRoute>} 
          />
        <Route 
          path="/schedule-services"
          element={
            <ProtectedRoute>
              <ScheduleService />
            </ProtectedRoute>
          }
        />
        <Route
          path="/scheduled-appointments"
          element={
            <ProtectedRoute>
              <ScheduledAppointments />
            </ProtectedRoute>
          } 
        />
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/getting-started" element={<GettingStarted />} />

        <Route 
          path="/admin-home" 
          element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>} 
        />
        <Route 
          path="/admin-scheduled-services" 
          element={
          <ProtectedRoute>
            <AdminScheduledAppointments />
          </ProtectedRoute>} 
        />
        <Route
          path="/upcoming-appointments"
          element={
            <ProtectedRoute>
              <UpcomingAppointments />
            </ProtectedRoute> 
          }
        />
        <Route
          path="/admin-upcoming-appointments"
          element={
            <ProtectedRoute>
              <AdminUpcomingAppointments />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/admin-unfinished-appointments"
          element={
            <ProtectedRoute>
              <AdminUnfinishedAppointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-pets"
          element={
            <ProtectedRoute>
              <AdminRegisteredPets />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/admin-profiles"
          element={
            <ProtectedRoute>
              <AdminProfiles />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
