import { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/projects`)
      .then(res => setProjects(res.data))
      .catch(console.error);
  }, []);
  return (
    <div className="p-8 grid grid-cols-3 gap-6">
      {projects.map(p => <ProjectCard key={p.id} {...p} />)}
    </div>
  );
}
