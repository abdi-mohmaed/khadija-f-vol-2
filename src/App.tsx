import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import MainSite from './components/MainSite';

function App() {
  return (
    <BrowserRouter basename="/khadija-f-vol-2">
      <Routes>
        <Route path="/admin/login" element={<LoginPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/*" element={<MainSite />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
