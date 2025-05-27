import mirrors from "../assets/mirrors.jpeg";

export default function HomePage() {
  return (
    <section
      className="relative w-full flex-grow flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <img
        src={mirrors}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-95"
      />
      <div className="absolute inset-0 bg-neutral-400/10 mix-blend-multiply" />

      {/* ✨ Twinkle stars overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => {
          const top = `${Math.random() * 90}%`;
          const left = `${Math.random() * 90}%`;
          const delay = `${Math.random() * 3}s`;
          const duration = `${2 + Math.random() * 2}s`;
          return (
            <div
              key={i}
              className="twinkle-star"
              style={{
                top,
                left,
                animationDelay: delay,
                animationDuration: duration,
              }}
            />
          );
        })}
      </div>
    </section>
  );
}

