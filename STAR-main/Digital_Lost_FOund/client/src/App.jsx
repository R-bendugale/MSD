import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardLayout from './pages/DashboardLayout';
import UserDashboardPage from './pages/UserDashboardPage';
import ReportLostItemPage from './pages/ReportLostItemPage';
import ReportFoundItemPage from './pages/ReportFoundItemPage';
import LostItemsPage from './pages/LostItemsPage';
import FoundItemsPage from './pages/FoundItemsPage';
import ClaimRequestsPage from './pages/ClaimRequestsPage';
import MyClaimsPage from './pages/MyClaimsPage';
import ReturnedItemsPage from './pages/ReturnedItemsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import RegisteredUsersPage from './pages/RegisteredUsersPage';
import ProfilePage from './pages/ProfilePage';
import NotificationsPage from './pages/NotificationsPage';
import ProjectFlowPage from './pages/ProjectFlowPage';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Landing & Auth Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<UserDashboardPage />} />
              <Route path="report-lost" element={<ReportLostItemPage />} />
              <Route path="report-found" element={<ReportFoundItemPage />} />
              <Route path="lost-items" element={<LostItemsPage />} />
              <Route path="found-items" element={<FoundItemsPage />} />
              <Route path="claim-requests" element={<ClaimRequestsPage />} />
              <Route path="my-claims" element={<MyClaimsPage />} />
              <Route path="returned-items" element={<ReturnedItemsPage />} />
              <Route path="admin" element={<AdminDashboardPage />} />
              <Route path="users" element={<RegisteredUsersPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="flow" element={<ProjectFlowPage />} />
            </Route>

            {/* Fallback redirect to Home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
