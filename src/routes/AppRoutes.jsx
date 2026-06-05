// src/routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

//import Home from "../pages/Home";
import IncidentLog from "../pages/IncidentLog";
//import Dashboard from "../pages/Dashboard";
import HealthTrends from "../pages/HealthTrends";
import LiveMonitor from "../pages/LiveMonitor";
import DeviceManagement from "../pages/DeviceManagement";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import ForgotPassword from "../pages/ForgotPass.jsx";
import Notification from "../pages/NotificationPage.jsx";
function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={
            <MainLayout>
              <Routes>
                <Route path="/" element={<LiveMonitor />} />
                <Route path="/incident" element={<IncidentLog />} />
                <Route path="/health" element={<HealthTrends />} />
                <Route path="/devices" element={<DeviceManagement />} />
                <Route path="/chat" element={<Notification />} />
              </Routes>
            </MainLayout>
          } />
        </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;