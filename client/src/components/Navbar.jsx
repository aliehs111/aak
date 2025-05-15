// client/src/components/Navbar.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo512 from "../assets/logo512.png";

export default function Navbar({ isAdmin, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const baseLinkClasses = ({ isActive }) =>
    isActive
      ? "text-amber-300"
      : "text-primary hover:text-primary transition-colors";

  return (
    <nav className="flex items-center justify-between p-4 bg-accent relative z-10">
      {/* Logo + Title */}
      <NavLink to="/" className="flex items-center space-x-3 group">
        <img src={logo512} alt="Logo" className="h-16 w-16" />
        <div className="relative">
          <h1
            className="
              text-3xl 
              font-extrabold 
              tracking-wide 
              bg-clip-text 
              text-transparent 
              bg-gradient-to-r from-stone-300 to-amber-200 
              transition-colors 
              group-hover:from-lime-600 
              group-hover:to-amber-300
            "
          >
            Aaron Kirchhoff
          </h1>
          <p className="mt-1 text-sm uppercase font-light text-amber-200">
            Architect
          </p>
          <span
            className="
              absolute 
              left-0 
              bottom-[-2px] 
              w-10 
              h-0.5 
              bg-lime-800 
              opacity-0 
              group-hover:opacity-100 
              transition-opacity
            "
          />
        </div>
      </NavLink>

      {/* Desktop nav */}
      <ul className="hidden sm:flex items-center space-x-6 text-sm">
        <li>
          <NavLink to="/about" className={baseLinkClasses}>
            Ethos
          </NavLink>
        </li>
        <li>
          <NavLink to="/projects" className={baseLinkClasses}>
            Inspiration
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={baseLinkClasses}>
            Contact
          </NavLink>
        </li>
        {isAdmin && (
          <>
            <li>
              <NavLink
                to="/admin"
                className="font-medium text-primary hover:text-amber-300 transition-colors"
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <button
                onClick={onLogout}
                className="text-primary hover:text-amber-300 transition-colors"
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>

      {/* Mobile toggle */}
      <button
        className="sm:hidden p-2 text-primary"
        onClick={() => setMobileOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      {/* Mobile overlay menu */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-accent p-6 flex flex-col space-y-4 z-50 sm:hidden">
          <button
            className="self-end p-2 text-primary"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
          <NavLink
            to="/about"
            onClick={() => setMobileOpen(false)}
            className={baseLinkClasses}
          >
            Ethos
          </NavLink>
          <NavLink
            to="/projects"
            onClick={() => setMobileOpen(false)}
            className={baseLinkClasses}
          >
            Inspiration
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className={baseLinkClasses}
          >
            Contact
          </NavLink>

          {isAdmin && (
            <>
              <NavLink
                to="/admin"
                onClick={() => setMobileOpen(false)}
                className="font-medium text-primary hover:text-amber-300 transition-colors"
              >
                Dashboard
              </NavLink>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onLogout();
                }}
                className="text-primary hover:text-amber-300 transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

