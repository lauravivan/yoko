import { BrowserRouter, Route, Routes } from 'react-router';
import MainLayout from './layouts/MainLayout';
import EventsPage from './pages/Events';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<EventsPage />} />
          <Route path="/actions" element={<EventsPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
