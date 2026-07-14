import Divider from '@/components/utils/Divider';

const Footer = () => {
  return (
    <footer className="c-footer">
      <div>
        <img src="/mascot.svg" />
        <Divider />
        <div>
          <div className="c-footer__copyright">
            <div>
              <img src="/mascot.svg" />
            </div>
            <span>&copy; Yoko! 2024. All rights reserved.</span>
          </div>
          <span className="c-footer__version">v 1.0.0</span>
          <div className="c-footer__data">
            <span>Export all my data</span>
            <span>Import my data</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
