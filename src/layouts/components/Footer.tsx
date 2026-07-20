const Footer = () => {
  return (
    <footer className="c-footer">
      <img src="/mascot.svg" />
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
    </footer>
  );
};

export default Footer;
