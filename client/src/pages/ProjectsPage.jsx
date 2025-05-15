// client/src/pages/ProjectsPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";

export default function ProjectsPage({ auth }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/projects`, { auth })
      .then((res) => {
        const list = res.data.map((p) => {
          // take the first image, if present
          const img = p.images[0];

          let url = null;
          if (img) {
            if (img.s3_key.startsWith("uploads/")) {
              // local fallback
              url = `${import.meta.env.VITE_API_URL}/${img.s3_key}`;
            } else if (
              import.meta.env.VITE_S3_BUCKET &&
              import.meta.env.VITE_AWS_REGION
            ) {
              // S3 URL
              url = `https://${import.meta.env.VITE_S3_BUCKET}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/${img.s3_key}`;
            }
          }

          return {
            id:          p.id,
            title:       p.title,
            description: p.description,
            imageUrl:    url,
          };
        });
        setProjects(list);
      })
      .catch(console.error);
  }, [auth]);

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((p) => (
        <ProjectCard
          key={p.id}
          title={p.title}
          description={p.description}
          imageUrl={p.imageUrl}
        />
      ))}
    </div>
  );
}






