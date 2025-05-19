import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/projects/${id}`) // Updated to /api/projects
      .then((res) => setProject(res.data))
      .catch((err) => setError(err.response?.data?.detail || err.message));
  }, [id]);

  if (error) return <p className="p-8 text-red-600">Error: {error}</p>;
  if (!project) return <p className="p-8">Loading…</p>;

  const img = project.images[0];
  let imageUrl = "";
  if (img) {
    if (img.s3_key.startsWith("uploads/")) {
      imageUrl = `${import.meta.env.VITE_API_URL}/${img.s3_key}`;
    } else {
      imageUrl = `https://${import.meta.env.VITE_S3_BUCKET}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/${img.s3_key}`;
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-6">
      <Link to="/projects" className="text-sm text-primary hover:underline">
        ← Back to Inspiration
      </Link>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={project.title}
          className="w-full aspect-video object-cover rounded-lg shadow"
        />
      )}
      <h1 className="text-3xl font-semibold">{project.title}</h1>
      <p className="text-gray-700">{project.description}</p>
    </div>
  );
}

