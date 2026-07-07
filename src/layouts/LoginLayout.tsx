import { Outlet, useNavigate } from 'react-router';

const LoginLayout = () => {
  const navigate = useNavigate();
  return (
    <main className="login">
      <div>
        {/* <img src="/mascot.svg" onClick={() => navigate(paths.home)} /> */}

        <Outlet />
      </div>
    </main>
  );
};

export default LoginLayout;
