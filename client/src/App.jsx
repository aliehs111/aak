// client/src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactForm from "./components/ContactForm";
import Contact from "./pages/Contact";
import About from "./pages/About"

export default function App() {
  return (
    <BrowserRouter>
     <div className="flex flex-col min-h-screen">
      <Navbar />
    
      <main className="flex flex-col flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
      </div>
    </BrowserRouter>
  );
}





