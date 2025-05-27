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
    <div className="bg-primary py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-primary mb-10">Inspiration</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 auto-rows-[320px] gap-6">
          {projects.length === 0 ? (
            <p className="text-primary">No projects available</p>
          ) : (
            projects.map((proj, idx) => {
              const span = COL_SPANS[idx % COL_SPANS.length] || "lg:col-span-2";
  
              return (
                <div
                  key={proj.id}
                  className={`relative rounded-2xl overflow-hidden bg-gray-800 shadow-md ring-1 ring-white/10 transition-all duration-300 ease-in-out hover:shadow-lg ${span} opacity-0 animate-floatIn`}
                  style={{ animationDelay: `${idx * 200}ms` }}
                >
                  {proj.imageUrl && (
                    <img
                      src={proj.imageUrl}
                      alt={proj.title}
                      className="absolute inset-0 w-full h-full object-cover object-[center_30%] opacity-60"
                    />
                  )}
                  <div className="relative z-10 flex flex-col justify-between h-full p-6">
                    <div>
                      <h3 className="text-white text-xl font-semibold mb-2">
                        {proj.title}
                      </h3>
                      <p className="text-sm text-gray-200 line-clamp-3">
                        {proj.description}
                      </p>
                    </div>
                    <div className="mt-4">
                      <Link
                        to={`/projects/${proj.id}`}
                        className="inline-block text-indigo-300 hover:text-indigo-200 text-sm font-medium"
                      >
                        Read more →
                      </Link>
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