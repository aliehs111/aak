import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: "What are your qualifications?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
{
    question: "Do you provide interior design services?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "Do you charge for the first consultation?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "How long does it take to produce design documents ready for builder",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
]

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
