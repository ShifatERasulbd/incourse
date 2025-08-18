  import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Users from './pages/Users';
import Products from './pages/Products';
import Blogs from './pages/Blogs';
import WhyChooseUs from './pages/WhyChooseUs';
import Counters from './pages/Counters';
import Sliders from './pages/Sliders';
import AboutUsManagement from './pages/AboutUsManagement';
import Contacts from './pages/Contacts';
import Settings from './pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import Messages from './pages/Messages';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const queryClient = new QueryClient();

function AdminApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Routes>
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="products" element={<Products />} />
              <Route path="blogs" element={<Blogs />} />
              <Route path="why-choose-us" element={<WhyChooseUs />} />
              <Route path="counters" element={<Counters />} />
              <Route path="sliders" element={<Sliders />} />
              <Route path="about-us" element={<AboutUsManagement />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="messages" element={<Messages />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default AdminApp;
