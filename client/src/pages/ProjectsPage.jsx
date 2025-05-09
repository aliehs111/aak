import { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";

// import pavilionImg from "../assets/glass-pavilion.jpg";
// // …then in your mock:
// imageUrl: pavilionImg,

const MOCK_PROJECTS = [
  {
    id: 1,
    title: "Glass Pavilion",
    description: "A minimalist glass house overlooking the lake.",
    imageUrl: "/assets/glass-pavilion.jpg",
  },
  {
    id: 2,
    title: "Urban Loft Retrofit",
    description: "Converting an old warehouse into a modern living space.",
    imageUrl: "/assets/urban-loft.jpg",
  },
  {
    id: 3,
    title: "Rooftop Garden",
    description: "Green roof with native plantings and seating nooks.",
    imageUrl: "/assets/rooftop-garden.jpg",
  },
];
{projects.map(p => (
  <ProjectCard
    key={p.id}
    title={p.title}
    description={p.description}
    imageUrl={p.imageUrl}
  />
))}

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
