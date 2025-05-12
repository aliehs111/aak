// client/src/pages/HomePage.jsx
import stamp from "../assets/stamp.jpg";

export default function HomePage() {
  return (
    <section
      className="
        relative
        w-full flex-grow flex items-center justify-center 
        overflow-hidden
      "
    >
      {/* Full-screen background */}
      <img
        src={stamp}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-neutral-400/10 mix-blend-multiply" />

      {/* Centered text */}
      <div className="relative z-10 mx-auto max-w-2xl px-6 lg:px-8 text-center space-y-4">
        <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
          Aaron Kirchhoff, Architect
        </h1>
        <p className="text-lg font-medium text-secondary sm:text-xl">
          Seasoned. Sustainable. Collaborative.
        </p>
      </div>
    </section>
  );
}



   
   
   
