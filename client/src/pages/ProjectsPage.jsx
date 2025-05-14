// client/src/pages/ProjectsPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/projects`)
      .then(res => {
        console.log("⛳️ fetched projects:", res.data);
        setProjects(res.data);
      })
      .catch(err => {
        console.error("❌ fetch error:", err);
      });
  }, []);

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(p => (
        <ProjectCard
          key={p.id}
          title={p.title}
          description={p.description}
          // if there’s no image yet, pass a placeholder or empty string:
          imageUrl={p.images[0]?.s3_key || ""}
        />
      ))}
    </div>
  );
}



