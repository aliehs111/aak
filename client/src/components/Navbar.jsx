// client/src/components/Navbar.jsx
import { NavLink } from "react-router-dom";
import logo512 from "../assets/logo512.png";

export default function Navbar({ isAdmin, onLogout }) {
  return (
    <nav className="flex items-center justify-between p-4 bg-accent">
      {/* Logo + Title */}
      <NavLink to="/" className="flex items-center space-x-3 group">
  <img src={logo512} alt="Logo" className="h-16 w-16" />
  <div className="relative">
    {/* Large name with gradient and tracking */}
    <h1
      className="
        text-3xl 
        font-extrabold 
        tracking-wide 
        bg-clip-text 
        text-transparent 
        bg-gradient-to-r 
        from-stone-800 
        to-stone-300
        transition-colors 
        group-hover:from-cyan-600 
        group-hover:to-amber-700
      "
    >
      Aaron Kirchhoff
    </h1>
    {/* Subtitle sits neatly under, lighter & uppercase */}
    <p className="mt-1 text-sm uppercase font-light text-gray-400">
      Architect
    </p>
    {/* A little underline accent on hover */}
    <span
      className="
        absolute 
        left-0 
        bottom-[-2px] 
        w-10 
        h-0.5 
        bg-teal-400 
        opacity-0 
        group-hover:opacity-100 
        transition-opacity
      "
    />
  </div>
</NavLink>


      {/* Navigation Links */}
      <ul className="flex items-center space-x-6 text-sm">
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            Ethos
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

        {/* Admin Links */}
        {isAdmin && (
          <>
            <li>
              <NavLink
                to="/admin"
                className="font-medium text-secondary hover:text-primary"
              >
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
