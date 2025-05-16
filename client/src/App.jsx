// client/src/App.jsx
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import Contact from "./pages/Contact";
import About from "./pages/About";
import AdminDashboard from "./pages/AdminDashboard";
import ProjectDetails from "./pages/ProjectDetails";
import FAQ from "./components/FAQ";

export default function App() {
  const [auth, setAuth]       = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate              = useNavigate();

  // on mount, restore admin creds if present
  useEffect(() => {
    const stored = localStorage.getItem("aak_admin");
    if (stored) {
      const creds = JSON.parse(stored);
      setAuth(creds);
      setIsAdmin(true);
    }
  }, []);

  const handleAdminClick = async () => {
    const username = window.prompt("Admin username:");
    if (!username) return;
    const password = window.prompt("Admin password:");
    if (!password) return;
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/admin`, {
        auth: { username, password },
      });
      // persist and set
      const creds = { username, password };
      localStorage.setItem("aak_admin", JSON.stringify(creds));
      setAuth(creds);
      setIsAdmin(true);
      navigate("/admin");
    } catch {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("aak_admin");
    setAuth(null);
    setIsAdmin(false);
    navigate("/"); // send them home
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar 
        isAdmin={isAdmin} 
        onAdminClick={handleAdminClick} 
        onLogout={handleLogout} 
      />

      <main className="flex flex-col flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage auth={auth} />} />
          <Route path= "/projects/:id" element={<ProjectDetails /> } />

          <Route path="/contact" element={<Contact />} />
          <Route path="/about"   element={<About />} />
          {isAdmin && (
            <Route path="/admin" element={<AdminDashboard auth={auth} />} />
          )}
        </Routes>
      </main>

      <Footer onAdminClick={handleAdminClick} />
    </div>
  );
}




