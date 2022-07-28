import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Azure resource naming</h1>
       <div className="links">
          <Link to="/">Home</Link>
          <Link to="/docs">Documentation</Link>
       </div>
    </nav>
  )
}

export default Navbar
