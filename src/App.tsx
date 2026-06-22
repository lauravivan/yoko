import { BrowserRouter, Route, Routes } from 'react-router';
import AppLayout from './layouts/AppLayout';
import EventsPage from './pages/Events';
import Login from './pages/login';
import { AuthProvider } from './context/AuthContext';
import LoginLayout from './layouts/LoginLayout';
import LoginRedirect from './pages/login/redirect';
import { paths } from './contants/paths';
import { GeneralProvider } from './context/GeneralContext';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GeneralProvider>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<EventsPage />} />
              <Route path={paths.actions} element={<EventsPage />} />
            </Route>
            <Route path={paths.auth.signin._} element={<LoginLayout />}>
              <Route index element={<Login />} />
              <Route
                path={paths.auth.signin.redirect}
                element={<LoginRedirect />}
              />
            </Route>
          </Routes>
        </GeneralProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
