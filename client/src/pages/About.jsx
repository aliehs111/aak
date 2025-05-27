import aaronsnow from "../assets/aaronsnow.jpg";
import stamp from "../assets/stamp.jpg";
import FAQ from "../components/FAQ";
import aarontrain from "../assets/aarontrain.jpeg";

export default function About() {
  return (
    <div className="relative isolate overflow-hidden bg-primary">

      {/* ✨ Stamp background image */}
      <img
  src={stamp}
  alt="Stamp background"
  className="fixed top-0 left-0 w-full h-full object-cover opacity-30 mix-blend-overlay pointer-events-none z-0"
/>


      {/* ✨ Optional color overlay (if needed to tint it more) */}
      <div className="absolute inset-0 bg-primary/90 pointer-events-none" />

      {/* 🔹 Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-2 pb-4 sm:pt-4 sm:pb-10 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-x-16 lg:gap-y-8">
          {/* Text block */}
          <div className="lg:pr-8 pt-8">
  <h1 className="text-4xl font-semibold tracking-tight text-accent sm:text-5xl">
    Meet Aaron Kirchhoff
  </h1>
  <p className="mt-6 font-mono text-sm leading-6 tracking-tight text-zinc-900 max-w-xl">

    Aaron Kirchhoff is a registered architect with over a decade of experience designing residential and commercial spaces. After earning his architecture degree from the New York Institute of Technology, Aaron began his career in Manhattan and has since built a diverse professional experience that spans across New York, Japan, California, and Virginia.
  </p>
  <p className="mt-6 font-mono text-sm leading-6 tracking-tight text-zinc-900 max-w-xl">

    His approach blends thoughtful consultation with strong creative direction. Aaron believes in listening closely to his clients’ goals while also offering his own ideas backed by design principles and real-world expertise. With a hands-on background in design-build architecture and on-site construction management, he brings both technical detail craftsmanship and artistic intuition to each project.
  </p>
  <p className="mt-6 font-mono text-sm leading-6 tracking-tight text-zinc-900 max-w-xl">

  Aaron focuses on sustainable design and keeps up to date with innovations in architecture and real estate development around the world. He recently returned to his hometown of Rochester, NY, where he established his own architectural practice. Outside of work, he plays in a local men’s hockey league and stays busy traveling to tournaments in Canada with his two young sons, who both play youth hockey. He lives in Rochester with his wife, an artist, children’s book author, and music teacher.
  </p>
  <p className="mt-6 font-mono text-sm leading-6 tracking-tight text-zinc-900 max-w-xl">

    Fun fact: Aaron’s favorite Teenage Mutant Ninja Turtle is Leonardo, the tactical leader—just like him.
  </p>
</div>


          {/* Image */}
          <div className="mt-6 lg:mt-0">
            <img
              src={aarontrain}
              alt="Aaron in the snow"
              className="aspect-[4/5] w-full max-w-lg lg:max-w-none rounded-2xl object-cover object-[center_20%]"
            />
          </div>
        </div>
      </div>

      <FAQ />
    </div>
  );
}

