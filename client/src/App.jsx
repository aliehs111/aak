import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactForm from "./components/ContactForm";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Home page at the root */}
        <Route path="/" element={<HomePage />} />

        {/* Your other pages */}
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactForm />} />

        {/* Optional: redirect any unknown URL back to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}



