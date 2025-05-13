// client/src/pages/ProjectsPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";

export default function ProjectsPage({ auth }) {
  const [projects, setProjects] = useState([]);
  const [error, setError]       = useState(null);

  useEffect(() => {
    // Fetch from your FastAPI backend
    axios
      .get(`${import.meta.env.VITE_API_URL}/projects`, {
        // if your endpoint is public you can omit auth here
        auth, 
      })
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => {
        console.error("Failed to load projects:", err);
        setError("Could not load projects");
      });
  }, [auth]);

  if (error) {
    return <div className="p-8 text-red-600">{error}</div>;
  }

  if (!projects.length) {
    return <div className="p-8">No projects yet.</div>;
  }

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((p) => {
        // if your API returns images array with s3_key:
        const imageUrl = p.images?.[0]?.s3_key
          ? `${import.meta.env.VITE_API_URL}/uploads/${p.images[0].s3_key}`
          : null;

        return (
          <ProjectCard
            key={p.id}
            title={p.title}
            description={p.description}
            imageUrl={imageUrl}
          />
        );
      })}
    </div>
  );
}


