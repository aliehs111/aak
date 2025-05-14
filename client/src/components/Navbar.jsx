// client/src/components/Navbar.jsx
import { NavLink } from "react-router-dom";
import logo512 from '../assets/logo512.png';

export default function Navbar({ isAdmin, onLogout }) {
  return (
    <nav className="flex items-center justify-between p-4 bg-accent">
      <NavLink to="/" className="flex items-center">
        <img src={logo512} alt="Logo" className="h-12 w-12 mr-3" />
        <span className="text-2xl font-semibold text-secondary">Aaron Kirchhoff</span>
      </NavLink>

      <ul className="flex items-center space-x-6 text-sm">
        <li>
          <NavLink to="/about" className={({isActive}) => isActive ? "text-primary" : ""}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/projects" className={({isActive}) => isActive ? "text-primary" : ""}>
            Inspiration
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={({isActive}) => isActive ? "text-primary" : ""}>
            Contact
          </NavLink>
        </li>

        {isAdmin && (
          <>
            <li>
              <NavLink to="/admin" className="font-medium text-secondary hover:text-primary">
                Dashboard
              </NavLink>
            </li>
            <li>
              <button 
                onClick={onLogout}
                className="text-secondary hover:text-primary"
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

