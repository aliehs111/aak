// client/src/components/ProjectCard.jsx
export default function ProjectCard({ title, description, imageUrl }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-40 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

