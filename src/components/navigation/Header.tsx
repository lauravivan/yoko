import { type AppType } from '@/types/app';
import { type ModalContentType } from '@/types/modal';
import { type ThemeType } from '@/types/theme';
import QueryManager from '@/util/query';
import React, { type ChangeEvent, useState } from 'react';
import { BsSearch, BsX } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router';
// import SignOutIcon from './icons/SignOut';
// import SignInIcon from './icons/SignIn';
import DefaultLogo from '@/components/display/DefaultLogo';
import getTimeOfDay from '@/util/time/getTimeOfDay';
import StopWatchIcon from '@/components/display/icons/StopWatch';
// import Grid from '../Grid';
// import { paths } from '@/contants/paths';
// import TaskIcon from './icons/Task';
// import { useGeneral } from '@/context/GeneralContext';
import ToggleButton from '@/components/action/ToggleButton';
import MenuIcon from '@/components/display/icons/Menu';
import Divider from '@/components/utils/Divider';
import ClockIcon from '@/components/display/icons/Clock';
import navigation from '@/navigation';

interface HeaderProps {
  theme: ThemeType;
  toggleTheme: () => void;
  app: AppType;
  openModal: (type: ModalContentType) => void;
  handleTitle?: (title: string) => void;
  handleSearch: (search: string) => void;
  toggleApp: () => void;
  search: string;
}

const MenuItem = ({
  icon,
  children,
  href,
}: {
  children: string;
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  href?: string;
}) => {
  return (
    <li>
      <a href="#">
        <div>
          <div>{icon}</div>
          <span>{children}</span>
        </div>
        <Divider />
      </a>
    </li>
  );
};

const Header = ({
  theme,
  toggleTheme,
  handleSearch,
  app,
  toggleApp,
  search,
}: HeaderProps) => {
  const timeOfDay = getTimeOfDay();
  const queryManager = new QueryManager();
  // const navigate = useNavigate();
  // const { user, signOut } = useAuth();
  // const { toggleTask } = useGeneral();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    queryManager.query({ search: value });
    handleSearch(value);
  };

  const cleanSearch = () => {
    handleSearch('');
    queryManager.cleanQuery();
  };

  // useEffect(() => {
  //   const fetchData = async (): Promise<void> => {
  //     if (app === 'countdown') {
  //       await navigate(paths.home);
  //     } else {
  //       await navigate(paths.actions);
  //     }
  //   };

  //   void fetchData();
  // }, [app]);

  const handleMenu = () => setMenuOpen((open) => !open);

  return (
    <header className="c-header">
      <div className="c-header__logo-wrapper">
        <div>
          <div>
            <Link style={{ all: 'unset', cursor: 'pointer' }} to="/">
              <DefaultLogo />
            </Link>
            <ToggleButton type="button" onClick={toggleTheme}>
              {timeOfDay.icon()}
            </ToggleButton>
          </div>
          <span>
            {timeOfDay.phrase}. It's {timeOfDay.time}
          </span>
        </div>
      </div>
      <form className="c-header__search" method="get">
        <input
          placeholder="Search for a specific date..."
          onChange={handleChange}
          id="search"
          name="search"
          value={search}
        />
        {search.length > 0 ? (
          <button type="button" onClick={cleanSearch}>
            <BsX />
          </button>
        ) : (
          <BsSearch />
        )}
      </form>
      <div className="c-header__options">
        <div className="c-header__options__menu">
          <button type="button" onClick={handleMenu}>
            <MenuIcon />
          </button>
          {menuOpen && (
            <ul>
              <MenuItem icon={<StopWatchIcon />}>My recurring actions</MenuItem>
              <MenuItem icon={<ClockIcon />}>My events</MenuItem>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
