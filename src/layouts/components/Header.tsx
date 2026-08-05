import { Link } from 'react-router';
import MoodIcon from '@/components/display/icons/Mood';
import SearchIcon from '@/components/display/icons/Search';
import { useRef } from 'react';
import SunnyIcon from '@/components/display/icons/day-period/Sunny';
import SignInIcon from '@/components/display/icons/SignIn';

const Header = () => {
  const isMouseDown = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    isMouseDown.current = true;

    const rect = e.currentTarget.getBoundingClientRect();

    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    e.currentTarget.style.transition = 'none';
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLElement>) => {
    isMouseDown.current = false;

    e.currentTarget.style.transition = 'top 0.3s ease-out, left 0.3s ease-out';
  };

  const handleDrag = (e: React.MouseEvent<HTMLElement>) => {
    if (!isMouseDown.current) return;

    const x = e.clientX - offset.current.x;
    const y = e.clientY - offset.current.y;

    e.currentTarget.style.left = `${x}px`;
    e.currentTarget.style.top = `${y}px`;
  };

  return (
    <div
      className="c-header scale-in-center"
      onMouseDown={handleMouseDown}
      onMouseMove={handleDrag}
      onMouseUp={handleMouseUp}
    >
      <header className="c-header__header">
        <div className="c-header__header__left-side">
          <Link className="c-header__header__left-side__logo-wrapper" to="/">
            <div className="c-header__header__left-side__logo-wrapper__logo">
              <div className="c-header__header__left-side__logo-wrapper__logo__img-wrapper">
                <img src="/mascot.svg" />
              </div>
              <div className="c-header__header__left-side__logo-wrapper__logo__appname">
                Yoko!
              </div>
            </div>
          </Link>
        </div>
        <div className="c-header__header__middle">
          {/* eslint-disable @typescript-eslint/no-empty-function */}
          <button
            className="c-header__header__right-side__search"
            type="button"
            onClick={() => {}}
            aria-label="Open mood selector"
            title="Mood selector"
          >
            <MoodIcon />
          </button>
          <button
            className="c-header__header__right-side__theme"
            type="button"
            onClick={() => {}}
            aria-label="Switch theme"
            title="Theme"
          >
            <SunnyIcon />
          </button>
        </div>
        <div className="c-header__header__right-side">
          <button
            className="c-header__header__right-side__search"
            type="button"
            onClick={() => {}}
            aria-label="Search"
            title="Search"
          >
            <SearchIcon />
          </button>
          <button
            className="c-header__header__right-side__theme"
            type="button"
            onClick={() => {}}
            aria-label="Sign in"
            title="Sign in"
          >
            <SignInIcon />
          </button>
          {/* eslint-enable @typescript-eslint/no-empty-function */}
        </div>
      </header>
      <span className="c-header__period">Good morning</span>
    </div>
  );
};

export default Header;
