export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-extrabold mb-4">Aaron Kirchhoff, Architect </h1>
      <p className="text-lg max-w-xl text-center">
        Seasoned. Sustainable. Collaborative.
      </p>
      <div className="mt-8 flex space-x-4">
        <a
          href="/projects"
          className="px-6 py-3 bg-primary rounded-lg hover:bg-primary/90 transition"
        >
          Inspiration
        </a>
        <a
          href="/contact"
          className="px-6 py-3 bg-primary rounded-lg hover:bg-primary/90 transition"
        >
          Contact Form
        </a>
      </div>
    </div>
  );
}
