// client/src/pages/ProjectsPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const COL_SPANS = [
  "lg:col-span-4", // item 0
  "lg:col-span-2", // item 1
  "lg:col-span-2", // item 2
  "lg:col-span-4", // item 3
  "lg:col-span-4", // item 4
  "lg:col-span-2", // item 5
  "lg:col-span-2", // item 6
  "lg:col-span-4", // item 7
  "lg:col-span-4", // item 8
  "lg:col-span-2", // item 9
  "lg:col-span-2", // item 10
  "lg:col-span-4", // item 11
  // ...add more if you have more projects
];

export default function ProjectsPage({ auth }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/projects`, { auth })
      .then((res) => {
        const list = res.data.map((p) => {
          const img = p.images[0];
          let url = null;
          if (img) {
            if (img.s3_key.startsWith("uploads/")) {
              url = `${import.meta.env.VITE_API_URL}/${img.s3_key}`;
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
      })
      .catch(console.error);
  }, [auth]);

  return (
    <div className="bg-secondary py-12 sm:py-24">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">

        <p className=" max-w-lg text-2xl font-semibold tracking-tight text-primary sm:text-5xl text-justify-left">
          Inspiration
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          {projects.map((proj, idx) => {
            const span = COL_SPANS[idx] || "lg:col-span-2";
            return (
              <div
                key={proj.id}
                /* ⬇️  add both the span classes and your animation */
                className={`flex p-px ${span} opacity-0 animate-floatIn`}
                style={{ animationDelay: `${idx * 600}ms` }}
             
              >
                <div className="flex flex-col overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15">
                  {/* Image */}
                  {proj.imageUrl && (
                    <img
                      src={proj.imageUrl}
                      alt={proj.title}
                      className="h-80 w-full object-cover"
                    />
                  )}

                  {/* Content */}
                  <div className="flex-grow p-10 flex flex-col">
                    <h3 className="text-sm/4 font-semibold text-gray-400">
                      {proj.title}
                    </h3>
                    <p className="mt-2 text-lg font-medium tracking-tight text-white line-clamp-3">
                      {proj.description}
                    </p>

                    {/* Spacer so “Read more” sits at bottom */}
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
          })}
        </div>
      </div>
    </div>
  );
}






