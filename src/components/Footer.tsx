import { Link } from 'react-router-dom';
import '../styles/Footer.css';

function Footer({ version }: any) {
  return (
    <footer className="footer">
      To report a bug or suggest an improvement, please, use this{' '}
      <a
        href="https://github.com/ianagg/azure-resource-naming/issues"
        target="_blank"
        rel="noopener noreferrer"
      >
        link
      </a>
      .
      <br />
      <Link to="/" className="siteName">
        Azure resource naming
      </Link>{' '}
      | {version && version}
    </footer>
  );
}

export default Footer;
