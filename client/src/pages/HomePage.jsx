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
        className="absolute inset-0 w-full h-full object-cover opacity-10"
      />
      <div className="absolute inset-0 bg-neutral-400/10 mix-blend-multiply " />

      {/* Centered text */}
      <div className="relative z-10 mx-auto max-w-2xl px-6 lg:px-8 text-center space-y-4">
      <div className="relative inline-block overflow-hidden">
  <h1
    className="
      text-4xl sm:text-6xl
      font-bold
      bg-gradient-to-b from-accent via-zinc-400 to-secondary
      bg-clip-text text-transparent shiny-text pb-4 pt-40
    "
  >
    Recognizing the need is the primary condition for design.
  </h1>
  <span className="shine-overlay" />
</div>



        <p className="mt-2 text-2xl font-medium text-secondary">
          — Charles Eames
        </p>
      </div>
    </section>
  );
}
