// src/routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

import Home from "../pages/Home";
import LiveMonitor from "../pages/LiveMonitor";
import IncidentLog from "../pages/IncidentLog";
import DeviceManagement from "../pages/DeviceManagement";

import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPass";
import Notification from "../pages/NotificationPage";
import Profile from "../pages/Profile";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Không có Header */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Có Header + Footer */}
        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />} />

          <Route path="/live-monitor" element={<LiveMonitor />} />

          <Route path="/incident-log" element={<IncidentLog />} />

          <Route path="/device-management" element={<DeviceManagement />} />

          <Route path="/notifications" element={<Notification />} />

          <Route path="/profile" element={<Profile />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;