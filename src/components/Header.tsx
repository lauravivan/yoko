import useStore from '@/store/store';
import { type AppType } from '@/types/app';
import { type ModalContentType } from '@/types/modal';
import { type ThemeType } from '@/types/theme';
import { paths } from '@/util/constants';
import QueryManager from '@/util/query';
import { type ChangeEvent, useEffect } from 'react';
import {
  BsAlarm,
  BsBell,
  BsFillGridFill,
  BsFillMoonFill,
  BsFillSunFill,
  BsFilter,
  BsList,
  BsSearch,
  BsX,
} from 'react-icons/bs';
import { TbArrowsSort } from 'react-icons/tb';
import { useNavigate } from 'react-router';

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

const Header = ({
  theme,
  toggleTheme,
  openModal,
  handleTitle,
  handleSearch,
  app,
  toggleApp,
  search,
}: HeaderProps) => {
  const { toggleView, view } = useStore();
  const queryManager = new QueryManager();
  const navigate = useNavigate();

  const handleFilterModal = () => {
    openModal('filter');
    handleTitle?.('Filter');
  };

  const handleSortModal = () => {
    openModal('sort');
    handleTitle?.('Sort');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    queryManager.query({ search: value });
    handleSearch(value);
  };

  const cleanSearch = () => {
    handleSearch('');
    queryManager.cleanQuery();
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (app === 'countdown') {
        await navigate(paths.home);
      } else {
        await navigate(paths.actions);
      }
    };

    void fetchData();
  }, [app]);

  return (
    <header className="header">
      <div className="header__title-wrapper">
        <div className="header__title-wrapper__img-wrapper">
          <img src="/mascot.png" />
        </div>
        <div className="header__title-wrapper__title">Yoko!</div>
        <button className="toggle-btn" type="button" onClick={toggleTheme}>
          {theme === 'moon' ? <BsFillMoonFill /> : <BsFillSunFill />}
        </button>
      </div>
      <form method="get">
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
      <div className="header__menu">
        <button className="toggle-btn" type="button" onClick={toggleApp}>
          {app === 'actions' ? <BsAlarm /> : <BsBell />}
        </button>
        <button className="toggle-btn" type="button" onClick={toggleView}>
          {view === 'grid' ? <BsFillGridFill /> : <BsList />}
        </button>
        <button onClick={handleFilterModal} className="select-btn">
          <BsFilter />
        </button>
        <button onClick={handleSortModal} className="select-btn">
          <TbArrowsSort />
        </button>
      </div>
    </header>
  );
};

export default Header;
