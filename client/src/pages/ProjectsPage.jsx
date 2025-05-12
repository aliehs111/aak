// client/src/pages/ProjectsPage.jsx
import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";

// import your test images (with extensions!)
import spideyhouse from "../assets/spideyhouse.jpeg";
import bookstore   from "../assets/bookstore.jpeg";
import artgallery  from "../assets/artgallery.jpeg";
import sophie      from "../assets/sophie.jpeg";
import rink1       from "../assets/rink1.jpeg";

const MOCK_PROJECTS = [
  {
    id:         1,
    title:      "Custom Spidey House",
    description:"A house for Spiderman Enthusiasts.",
    imageUrl:   spideyhouse,
  },
  {
    id:         2,
    title:      "Children's Bookstore",
    description:"Modern bookstore for Children.",
    imageUrl:   bookstore,
  },
  {
    id:         3,
    title:      "Art Gallery",
    description:"Redesign of Art Gallery",
    imageUrl:   artgallery,
  },
  {
    id:         4,
    title:      "Dog House",
    description:"Modern Luxury for Modern Dogs",
    imageUrl:   sophie,
  },
  {
    id:         5,
    title:      "Ice Rink",
    description:"Converted a backyard into a professional ice rink",
    imageUrl:   rink1,
  },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // seed with mock data for now
    setProjects(MOCK_PROJECTS);

    // later, swap in your real API call:
    // axios
    //   .get(`${import.meta.env.VITE_API_URL}/projects`)
    //   .then(res => setProjects(res.data))
    //   .catch(console.error);
  }, []);

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((p) => (
        <ProjectCard
          key={p.id}
          title={p.title}
          description={p.description}
          imageUrl={p.imageUrl}    // matches the prop in ProjectCard
        />
      ))}
    </div>
  );
}

