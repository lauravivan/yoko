import { Outlet } from 'react-router';

const LoginLayout = () => {
  return (
    <main className="login">
      <div>
        <img src="/mascot.svg" />

        <Outlet />
      </div>
    </main>
  );
};

export default LoginLayout;
