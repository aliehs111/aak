// client/src/pages/Contact.jsx
export default function Contact() {
  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Contact the Architect</h2>
      <p className="mb-6">
        Have images or sketches to share? Just email them directly:
      </p>
      <a
        href="mailto:architect@example.com?subject=New%20Design%20Inquiry"
        className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
      >
        Email the Architect
      </a>
    </div>
  );
}
