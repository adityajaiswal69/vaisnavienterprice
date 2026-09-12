"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { products } from "@/data/products";
import { company } from "@/data/site";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Enquiry form posting to /api/enquiry.
 *
 * `compact` renders the short supplier-directory style form (message first,
 * then the minimum contact details). The full form adds product, quantity and
 * phone and is used on the contact page.
 */
export default function EnquiryForm({ compact = false }: { compact?: boolean }) {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("product") ?? "";
  const preselectedName = products.find((p) => p.slug === preselected)?.name;
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setMessage("");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !body.ok) {
        throw new Error(body.error ?? "Could not send the enquiry.");
      }

      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const field =
    "w-full rounded-sm border border-steel-300 bg-white px-4 py-3 text-[0.95rem] text-navy-900 transition placeholder:text-navy-400 focus:border-navy-600 focus:outline-none";
  const label = "block text-[0.95rem] font-medium text-navy-900";

  if (status === "sent") {
    return (
      <div className="rounded-sm border border-gold-300 bg-gold-200/25 p-8">
        <h3 className="text-2xl font-semibold text-navy-900">Enquiry received</h3>
        <p className="mt-3 text-sm leading-relaxed text-navy-700">
          Thank you. Your details have been recorded. For anything urgent, calling is still the
          fastest route to an answer.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={company.phoneHref}
            className="rounded-sm bg-navy-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy-600"
          >
            {company.phone}
          </a>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="rounded-sm border border-navy-600 px-5 py-3 text-sm font-semibold text-navy-800 transition hover:bg-white"
          >
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  const messageField = (
    <div>
      <label className={label} htmlFor="message">
        Your Message
      </label>
      <textarea
        id="message"
        name="message"
        required
        rows={compact ? 4 : 5}
        className={`${field} mt-2 resize-y`}
        defaultValue={preselectedName ? `I am interested in ${preselectedName}. ` : ""}
        placeholder="Describe your requirement in detail: grade, specification, monthly quantity and delivery location."
      />
    </div>
  );

  const errorBox =
    status === "error" ? (
      <p role="alert" className="rounded-sm bg-red-50 px-4 py-3 text-sm text-red-700">
        {message} You can also email us directly at{" "}
        <a href={company.emailHref} className="font-semibold underline">
          {company.email}
        </a>
        .
      </p>
    ) : null;

  const honeypot = (
    // Honeypot: real users never see or fill this.
    <div className="hidden" aria-hidden>
      <label htmlFor="website">Website</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );

  const submit = (
    <button
      type="submit"
      disabled={status === "sending"}
      className="inline-flex min-w-48 items-center justify-center rounded-sm bg-navy-700 px-10 py-3.5 text-lg font-medium text-white transition hover:bg-navy-600 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {status === "sending" ? "Sending…" : compact ? "Submit" : "Send enquiry"}
    </button>
  );

  if (compact) {
    return (
      <form onSubmit={onSubmit} className="space-y-5">
        {messageField}
        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label className={label} htmlFor="name">
              Name
            </label>
            <input id="name" name="name" type="text" required autoComplete="name" className={`${field} mt-2`} />
          </div>
          <div>
            <label className={label} htmlFor="companyName">
              Company
            </label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              required
              autoComplete="organization"
              className={`${field} mt-2`}
            />
          </div>
          <div>
            <label className={label} htmlFor="email">
              Email
            </label>
            <input id="email" name="email" type="email" required autoComplete="email" className={`${field} mt-2`} />
          </div>
        </div>
        <input type="hidden" name="product" value={preselected} />
        {honeypot}
        {errorBox}
        {submit}
      </form>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {messageField}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="name">
            Your name <span className="text-gold-600">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={`${field} mt-2`}
            placeholder="Full name"
          />
        </div>
        <div>
          <label className={label} htmlFor="companyName">
            Company <span className="text-gold-600">*</span>
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            required
            autoComplete="organization"
            className={`${field} mt-2`}
            placeholder="Company name"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="email">
            Email <span className="text-gold-600">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={`${field} mt-2`}
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label className={label} htmlFor="phone">
            Phone
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={`${field} mt-2`} placeholder="+91" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="product">
            Product of interest
          </label>
          <select id="product" name="product" defaultValue={preselected} className={`${field} mt-2`}>
            <option value="">Select a product</option>
            {products.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
            <option value="other">Something else</option>
          </select>
        </div>
        <div>
          <label className={label} htmlFor="quantity">
            Approx. monthly quantity
          </label>
          <input
            id="quantity"
            name="quantity"
            type="text"
            className={`${field} mt-2`}
            placeholder="e.g. 20 MT / month"
          />
        </div>
      </div>

      {honeypot}
      {errorBox}
      {submit}

      <p className="text-xs leading-relaxed text-navy-500">
        We use your details only to respond to this enquiry.
      </p>
    </form>
  );
}
