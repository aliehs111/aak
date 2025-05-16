// client/src/components/ProjectCard.jsx
import { Link } from "react-router-dom";

export default function ProjectCard({ id, title, description, imageUrl }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
      <div className="relative w-full aspect-square bg-gray-100">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>
      <div className="p-4 flex-grow">
         <h3 className="text-xl font-semibold text-gray-900 mb-1">{title}</h3>

        <p className="text-gray-600 text-sm mb-4">{description}</p>
      </div>
      <div className="p-4 border-t">
        <Link
          to={`/projects/${id}`}
          className="text-primary hover:underline font-medium"
        >
          Read more →
        </Link>
      </div>
    </div>
  );
}





