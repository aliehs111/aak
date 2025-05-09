// client/src/components/Navbar.jsx
import { NavLink } from "react-router-dom";
import logo512 from '../assets/logo512.png';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 pb-4 bg-accent">
      <NavLink to="/" className="flex items-center">
        <img
          src={logo512}
          alt="ArchitectName logo"
          className="h-28 w-28 mr-3 object-contain"
        />
      
      </NavLink>
      <ul className="flex space-x-6 text-sm">
        <li>
          <NavLink
            to="/projects"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            Inspiration
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            Contact Me
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

