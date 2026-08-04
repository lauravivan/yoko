import QueryManager from '@/helpers/query';
import React, { type ChangeEvent, useState } from 'react';
import { BsSearch, BsX } from 'react-icons/bs';
import { Link } from 'react-router';
import DefaultLogo from '@/components/display/DefaultLogo';
import ToggleButton from '@/components/action/ToggleButton';
import MenuIcon from '@/components/display/icons/Menu';
import Divider from '@/components/utils/Divider';
import ClockIcon from '@/components/display/icons/views/Clock';
import navigation from '@/navigation';
import useClickOutside from '@/hooks/useClickOutside';
import TaskIcon from '@/components/display/icons/Task';
import NoteIcon from '@/components/display/icons/Note';
import MoodIcon from '@/components/display/icons/Mood';

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
      <Link to={href ?? '/'}>
        <div>
          <div>{icon}</div>
          <span>{children}</span>
        </div>
        <Divider />
      </Link>
    </li>
  );
};

const Header = ({
  toggleTheme,
  handleSearch,
  search,
}: {
  toggleTheme: () => void;
  openModal: () => void;
  handleTitle?: (title: string) => void;
  handleSearch: (search: string) => void;
  search: string;
}) => {
  const queryManager = new QueryManager();
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

  const modalRef = useClickOutside<HTMLUListElement>(() => {
    setMenuOpen(false);
  });

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
              <div></div>
            </ToggleButton>
          </div>
        </div>
      </div>
      <span className="c-header__period">Hey there.</span>
      <div className="c-header__right-side">
        <form className="c-header__right-side__search" method="get">
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
        <div className="c-header__right-side__options">
          <div className="c-header__right-side__options__menu">
            <button type="button" onClick={handleMenu}>
              <MenuIcon />
            </button>
            {menuOpen && (
              <ul ref={modalRef}>
                <MenuItem
                  href={navigation.navigateToOccurrences().pathname}
                  icon={<ClockIcon />}
                >
                  Occurrences
                </MenuItem>
                <MenuItem icon={<NoteIcon />}>Notes</MenuItem>
                <MenuItem icon={<TaskIcon />}>Tasks</MenuItem>
                <MenuItem icon={<MoodIcon />}>Mood history</MenuItem>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
