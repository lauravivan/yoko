import { BrowserRouter, Route, Routes } from 'react-router';
import AppLayout from './layouts/AppLayout';
import EventsPage from './pages/Events';
import Login from './pages/login';
import LoginLayout from './layouts/LoginLayout';
import LoginRedirect from './pages/login/redirect';
import { paths } from './contants/paths';
import { GeneralProvider } from './context/GeneralContext';
import Homepage from './pages/Homepage';

const App = () => {
  return (
    <BrowserRouter>
      <GeneralProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Homepage />} />
            <Route path="" element={<EventsPage />} />
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
    </BrowserRouter>
  );
};

export default App;
