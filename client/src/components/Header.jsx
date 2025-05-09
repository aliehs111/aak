import stamp from '../assets/stamp.jpg';

export default function Header() {
  return (
    <section className="relative w-full h-screen min-h-[400px] overflow-hidden">
      {/* Background image */}
      <img
        src={stamp}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-10"
      />

      {/* Color tint overlay (optional) */}
      <div className="absolute inset-0 bg-neutral-300/30 mix-blend-multiply" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <h2 className="text-5xl font-semibold tracking-tight sm:text-7xl">
          Aaron Kirchhoff, Architect
        </h2>
        <p className="mt-4 max-w-xl text-lg font-medium text-secondary sm:text-xl/8">
          Seasoned.  Sustainable.  Collaborative.
        </p>
      </div>
    </section>
  );
}


