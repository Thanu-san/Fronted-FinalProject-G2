"use client";

import * as React from "react";
import Button from "@/components/ui/Button";

const FIELD_CLASSES =
  "w-full rounded-xl border border-lavender bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted/50 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500";

const LABEL_CLASSES = "mb-1.5 block text-sm font-semibold text-ink";

/**
 * Contact form UI only — there is no backend behind it yet.
 */
export default function ContactForm() {
  // TODO: Wire this form to an API endpoint (e.g. POST /api/contact) once a
  // backend exists. For now we just stop the browser's default navigation.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="contact-name" className={LABEL_CLASSES}>
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your name"
          className={FIELD_CLASSES}
        />
      </div>

      <div>
        <label htmlFor="contact-email" className={LABEL_CLASSES}>
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={FIELD_CLASSES}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className={LABEL_CLASSES}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          placeholder="How can we help?"
          className={FIELD_CLASSES}
        />
      </div>

      <Button type="submit" variant="primary" size="md">
        Send message
      </Button>
    </form>
  );
}