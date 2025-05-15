// client/src/components/ProjectCard.jsx
export default function ProjectCard({ title, description, imageUrl }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Square image box */}
      <div className="w-full aspect-square bg-gray-100">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full"
        />
      ) : null}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}




