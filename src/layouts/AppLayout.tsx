import Footer from '@/layouts/components/Footer';
import Header from '@/layouts/components/Header';
import { Link, Outlet } from 'react-router';
import ClockIcon from '@/components/display/icons/views/Clock';
import navigation from '@/navigation';
import TaskIcon from '@/components/display/icons/features/Task';
import NoteIcon from '@/components/display/icons/features/Note';
import MoodHistoryIcon from '@/components/display/icons/features/Mood';

const AppLayout = () => {
  return (
    <div className={`app light`}>
      <Header />
      <div className="app__main-wrapper">
        <div className="app__main-wrapper__outlet-wrapper">
          <aside className="app__main-wrapper__outlet-wrapper__aside">
            <ul>
              <li>
                <Link
                  title="Occurrences"
                  aria-label="Go to occurrences"
                  to={navigation.navigateToOccurrences().pathname}
                >
                  <ClockIcon />
                </Link>
              </li>
              <li>
                <Link title="Notes" aria-label="Go to notes" to="#">
                  <NoteIcon />
                </Link>
              </li>
              <li>
                <Link title="Tasks" aria-label="Go to tasks" to="#">
                  <TaskIcon />
                </Link>
              </li>
              <li>
                <Link
                  title="Mood history"
                  aria-label="Go to mood history"
                  to="#"
                >
                  <MoodHistoryIcon />
                </Link>
              </li>
            </ul>
          </aside>
          <div className="app__main-wrapper__outlet-wrapper__main">
            <div
              className="app__main-wrapper__outlet-wrapper__main__outlet"
              id="app-outlet"
            >
              <Outlet />
            </div>
            <Footer />
          </div>
        </div>
        <img src="/mascot.svg" />
      </div>
    </div>
  );
};

export default AppLayout;
