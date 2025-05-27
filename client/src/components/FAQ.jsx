import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
const faqs = [
  {
    question: "Where is Aaron licensed to practice architecture?",
    answer:
      "Aaron is a registered architect in the state of New York and has experience working on projects across the U.S. and internationally.",
  },
  {
    question: "What types of projects does Aaron specialize in?",
    answer:
      "He works on both residential and commercial projects, including custom homes, mixed-use developments, and interior renovations.",
  },
  {
    question: "How does Aaron approach client collaboration?",
    answer:
      "Aaron is consultative and collaborative. He listens carefully to his clients’ needs but isn’t afraid to offer his own ideas and design rationale to spark thoughtful dialogue.",
  },
  {
    question: "Is Aaron experienced with sustainable or energy-efficient design?",
    answer:
      "Yes. Aaron continuously educates himself on sustainable practices and global design innovations, and he integrates these ideas into his work where appropriate.",
  },
  {
    question: "Where is Aaron currently based?",
    answer:
      "He currently runs his own architecture practice in Rochester, NY.",
  },
];


export default function Example() {
  return (
    <div className="bg-primary">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl justify-left">
            Frequently asked questions
          </h2>
          <dl className="mt-16 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure key={faq.question} as="div" className="py-6 first:pt-0 last:pb-0">
                <dt>
                  <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                    <span className="text-base/7 font-semibold">{faq.question}</span>
                    <span className="ml-6 flex h-7 items-center">
                      <PlusSmallIcon aria-hidden="true" className="size-6 group-data-[open]:hidden" />
                      <MinusSmallIcon aria-hidden="true" className="size-6 group-[&:not([data-open])]:hidden" />
                    </span>
                  </DisclosureButton>
                </dt>
                <DisclosurePanel as="dd" className="mt-2 pr-12">
                  <p className="text-base/7 text-gray-600">{faq.answer}</p>
                </DisclosurePanel>
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
