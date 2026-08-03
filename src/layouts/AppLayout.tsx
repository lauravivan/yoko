import Footer from '@/layouts/components/Footer';
import Header from '@/layouts/components/Header';
import { Outlet } from 'react-router';

const AppLayout = () => {
  return (
    <div className={`app light`}>
      {/* eslint-disable @typescript-eslint/no-empty-function */}
      <Header
        toggleTheme={() => {}}
        handleTitle={() => {}}
        handleSearch={() => {}}
        search={''}
        openModal={() => {}}
      />
      {/* eslint-enable @typescript-eslint/no-empty-function */}
      <div className="app__outlet" id="app-outlet">
        <Outlet />
        <img src="/mascot.svg" />
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
