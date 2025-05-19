import { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

const COL_SPANS = [
  "lg:col-span-4",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-4",
];

export default function ProjectsPage({ auth }) {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const base = import.meta.env.VITE_API_URL || "";
    axios
      .get(`${base}/api/projects`)
      .then((res) => {
        console.log("API /api/projects response:", res.data);
        if (!Array.isArray(res.data) || res.data.length === 0) {
          console.error("Empty or invalid response:", res.data);
          setError("No projects found");
          setProjects([]);
          setRedirect(true);
        } else {
          const list = res.data.map((p) => {
            const img = p.images[0];
            let url = null;
            if (img) {
              if (img.s3_key.startsWith("uploads/")) {
                url = `${base}/${img.s3_key}`;
              } else if (
                import.meta.env.VITE_S3_BUCKET &&
                import.meta.env.VITE_AWS_REGION
              ) {
                url = `https://${import.meta.env.VITE_S3_BUCKET}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/${img.s3_key}`;
              }
            }
            return {
              id: p.id,
              title: p.title,
              description: p.description,
              imageUrl: url,
            };
          });
          setProjects(list);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("API /api/projects error:", err.response || err);
        setError("Failed to load projects: " + (err.response?.data?.detail || err.message));
        setProjects([]);
        setRedirect(true);
        setLoading(false);
      });
  }, []);

  if (redirect) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return <div className="bg-secondary py-12 sm:py-24">Loading...</div>;
  }

  if (error) {
    return (
      <div className="bg-secondary py-12 sm:py-24">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <p className="text-2xl font-semibold text-primary">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-secondary py-12 sm:py-24">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <p className="max-w-lg text-2xl font-semibold tracking-tight text-primary sm:text-5xl text-justify-left">
          Inspiration
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          {projects.length === 0 ? (
            <p className="text-primary">No projects available</p>
          ) : (
            projects.map((proj, idx) => {
              const span = COL_SPANS[idx] || "lg:col-span-2";
              return (
                <div
                  key={proj.id}
                  className={`flex p-px ${span} opacity-0 animate-floatIn`}
                  style={{ animationDelay: `${idx * 600}ms` }}
                >
                  <div className="flex flex-col overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15">
                    {proj.imageUrl && (
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        className="h-80 w-full object-cover"
                      />
                    )}
                    <div className="flex-grow p-10 flex flex-col">
                      <h3 className="text-sm/4 font-semibold text-gray-400">
                        {proj.title}
                      </h3>
                      <p className="mt-2 text-lg font-medium tracking-tight text-white line-clamp-3">
                        {proj.description}
                      </p>
                      <div className="mt-auto">
                        <Link
                          to={`/projects/${proj.id}`}
                          className="inline-block mt-4 text-indigo-300 hover:underline font-medium"
                        >
                          Read more →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}






