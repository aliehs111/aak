// client/src/InnerApp.jsx
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import Contact from "./pages/Contact";
import About from "./pages/About";
import AdminDashboard from "./pages/AdminDashboard";

export default function InnerApp() {
  const [auth, setAuth]     = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleAdminClick = async () => {
    const username = window.prompt("Admin username:");
    if (!username) return;
    const password = window.prompt("Admin password:");
    if (!password) return;

    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/admin`, {
        auth: { username, password },
      });
      setAuth({ username, password });
      setIsAdmin(true);
      navigate("/admin");
    } catch (err) {
      console.error("Login failed:", err.response || err);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex flex-col flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage auth={auth} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          {isAdmin && (
            <Route path="/admin" element={<AdminDashboard auth={auth} />} />
          )}
        </Routes>
      </main>

      <Footer onAdminClick={handleAdminClick} />
    </div>
  );
}
