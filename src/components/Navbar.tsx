import { Link } from 'react-router-dom';
import { useState } from 'react';
import { TextBulletListLtr24Filled } from '@fluentui/react-icons';
import '../styles/Navbar.css';

function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <nav className="navigation">
      <Link to="/" className='name'>Azure resource naming</Link>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        <TextBulletListLtr24Filled/>
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <ul>
          <li>
             <Link to="/" className='link'>Home</Link>
          </li>
          <li>
             <Link to="/docs" className='link'>Documentation</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
