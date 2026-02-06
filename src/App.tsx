import { BrowserRouter, Route, Routes } from 'react-router';
import MainLayout from './layouts/MainLayout';
import EventsPage from './pages/Events';
import Login from './pages/login';
import { AuthProvider } from './context/AuthContext';
import LoginLayout from './layouts/LoginLayout';
import LoginRedirect from './pages/login/redirect';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<EventsPage />} />
            <Route path="/actions" element={<EventsPage />} />
          </Route>
          <Route path="/signin" element={<LoginLayout />}>
            <Route index element={<Login />} />
            <Route path="redirect" element={<LoginRedirect />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
