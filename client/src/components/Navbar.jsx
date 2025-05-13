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
          className="h-20 w-20 mr-3 object-contain"
        />
        <p className="text-3xl font-semibold text-secondary">Aaron Kirchhoff</p>
      
      </NavLink>
      <ul className="flex space-x-6 text-sm">
        <li>
        <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            About
          </NavLink>
          </li>
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
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

