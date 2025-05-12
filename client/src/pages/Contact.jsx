// client/src/pages/Contact.jsx
import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { useForm, ValidationError } from "@formspree/react";

export default function Contact() {
  // ←– swap in your Formspree project ID
  const [state, handleSubmit] = useForm("mldbljal");

  // success message replaces the form when sent
  if (state.succeeded) {
    return (
      <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow mt-20">
        <p className="text-center text-lg font-medium text-green-600">
          Thanks for your message! I will be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <div className="relative isolate bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        {/* — Left: static contact info — */}
        <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            {/* Decorative background */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden 
                         bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2"
            >
              {/* …SVG pattern omitted for brevity… */}
            </div>

            <h2 className="text-pretty text-4xl font-semibold tracking-tight text-accent sm:text-5xl">
              Get in touch
            </h2>
            <p className="mt-6 text-lg/8 text-secondary">
              Proin volutpat consequat porttitor cras nullam gravida at. Orci
              molestie a eu arcu. Sed ut tincidunt integer elementum id sem.
            </p>
            <dl className="mt-10 space-y-4 text-base/7 text-gray-600">
              <div className="flex gap-x-4">
                {/* <dt className="flex-none">
                  <span className="sr-only">Address</span>
                  <BuildingOffice2Icon
                    aria-hidden="true"
                    className="h-7 w-6 text-gray-400"
                  />
                </dt> */}
                {/* <dd>
                  545 Mavis Island
                  <br />
                  Chicago, IL 99191
                </dd> */}
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Telephone</span>
                  <PhoneIcon
                    aria-hidden="true"
                    className="h-7 w-6 text-gray-400"
                  />
                </dt>
                <dd>
                  <a href="tel:+15552345678" className="hover:text-gray-900">
                    +1 (585) 212-3939
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <EnvelopeIcon
                    aria-hidden="true"
                    className="h-7 w-6 text-gray-400"
                  />
                </dt>
                <dd>
                  <a
                    href="mailto:aaron@kirchhoff.archi"
                    className="hover:text-gray-900"
                  >
                    aaron@kirchhoff.archi
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* — Right: Formspree-powered form — */}
        <form
          onSubmit={handleSubmit}
          className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48"
        >
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg space-y-6">
            {/* Email field */}
            <label className="block">
              <span className="text-gray-700 font-semibold">Email</span>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-2 block w-full rounded-md bg-white px-3.5 py-2
                           text-base text-gray-900 outline outline-1 outline-gray-300
                           placeholder:text-gray-400 focus:outline-indigo-600"
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
                className="text-red-600 text-sm mt-1"
              />
            </label>

            {/* Message field */}
            <label className="block">
              <span className="text-gray-700 font-semibold">Message</span>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="mt-2 block w-full rounded-md bg-white px-3.5 py-2
                           text-base text-gray-900 outline outline-1 outline-gray-300
                           placeholder:text-gray-400 focus:outline-indigo-600"
              />
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
                className="text-red-600 text-sm mt-1"
              />
            </label>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={state.submitting}
                className="rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold
                           text-white shadow-sm hover:bg-indigo-500 focus-visible:outline
                           focus-visible:outline-2 focus-visible:outline-offset-2
                           focus-visible:outline-indigo-600"
              >
                {state.submitting ? "Sending…" : "Send message"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

