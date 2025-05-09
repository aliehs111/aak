// client/src/components/ContactForm.jsx
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

export default function ContactForm() {
  const [state, handleSubmit] = useForm("mldbljal");

  if (state.succeeded) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
        <p className="text-center text-lg font-medium text-green-600">
          Thanks for your message! The architect will be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow space-y-4"
    >
      <label className="block">
        <span className="text-gray-700">Email Address</span>
        <input
          id="email"
          type="email"
          name="email"
          required
          className="mt-1 block w-full rounded border-gray-300 focus:border-primary focus:ring-primary"
        />
      </label>
      <ValidationError
        prefix="Email"
        field="email"
        errors={state.errors}
        className="text-red-600 text-sm"
      />

      <label className="block">
        <span className="text-gray-700">Message</span>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="mt-1 block w-full rounded border-gray-300 focus:border-primary focus:ring-primary"
        />
      </label>
      <ValidationError
        prefix="Message"
        field="message"
        errors={state.errors}
        className="text-red-600 text-sm"
      />

      <button
        type="submit"
        disabled={state.submitting}
        className="w-full py-2 bg-primary text-white font-medium rounded hover:bg-primary/90 transition"
      >
        {state.submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

