// client/src/pages/About.jsx
import aaronsnow from "../assets/aaronsnow.jpg";
import FAQ from "../components/FAQ";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
export default function About() {
  return (
   
      <div className="relative isolate overflow-hidden bg-primary ">
   
        <div className="mx-auto max-w-7xl px-6 py-8 sm:py-20 lg:px-8">
          {/* 1-column on mobile; 2-columns on lg+ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-x-16 lg:gap-y-8">
            
            {/* — Text block on the left — */}
            <div className="lg:pr-8 pt-8">
              <h1 className="text-4xl font-semibold tracking-tight text-accent sm:text-5xl">
                Meet Aaron Kirchhoff
              </h1>
              <p className="mt-6 max-w-xl text-lg font-medium text-gray-500 sm:text-xl/8">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
                cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
                cupidatat commodo.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <a href="/contact" className="text-sm font-semibold text-gray-900">
                  Contact Me <span aria-hidden="true">→</span>
                </a>
                <a href="/projects" className="text-sm font-semibold text-gray-900">
                  Inspiration Page <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            {/* — Image on the right — */}
            <div className="mt-6 lg:mt-0">
              <img
                src={aaronsnow}
                alt="Aaron in the snow"
                className="aspect-[6/5] w-full max-w-lg lg:max-w-none rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
<FAQ />
    
      </div>
 
  );
}

