import React, { useEffect, useRef, useState } from "react";

/**
 * Northland Adventure Race – One-page React component
 * Minimal changes: cleaner copy, spacing, focus states, CTA discipline, a11y status
 * Web3Forms native POST kept the same
 */

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "f8b31566-8614-4321-9b57-09f40a9a2387";

export default function App() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");
  const redirectRef = useRef(null);

  // On mount, if we returned from Web3Forms with #sent, show success UI
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.hash === "#sent") {
        setSent(true);
        setStatus("Thanks. Your enquiry was sent. We will be in touch within one business day.");
        history.replaceState(null, "", window.location.pathname);
      }
      const url = window.location.origin + window.location.pathname + "#sent";
      if (redirectRef.current) redirectRef.current.value = url;
    }
  }, []);

  function handleNativeSubmit() {
    setSending(true);
    setStatus("");
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a href="#hero" className="font-semibold tracking-tight">Northland Adventure Race</a>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#styles" className="hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 rounded">Race styles</a>
            <a href="#inclusions" className="hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 rounded">Inclusions</a>
            <a href="#locations" className="hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 rounded">Locations</a>
            <a href="#contact" className="hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 rounded">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="#contact" className="inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2 text-white text-sm font-semibold shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600">
              Get a quote
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              2-hour Amazing Race for teams in Whangārei
            </h1>
            <p className="mt-4 text-lg text-slate-700 max-w-prose">
              On-foot challenges that get people moving, thinking, and working together. Routes around the Town Basin or Northland by arrangement.
            </p>
            <div className="mt-8 flex gap-3 flex-wrap">
              <a href="#styles" className="inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-white font-semibold shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600">
                See race styles
              </a>
              <a href="#locations" className="inline-flex items-center rounded-xl border border-slate-300 px-5 py-3 font-semibold hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600">
                View locations
              </a>
            </div>
            <p className="mt-6 text-slate-800 font-semibold">Pricing</p>
            <p className="text-slate-700">NZD $110 per person. Minimum 10 participants.</p>
            <p className="text-slate-600 text-sm">Add-ons are optional and charged in addition to the base price.</p>
          </div>

          {/* Image panel: uses /publichero.jpg */}
          <div
            className="aspect-[4/3] rounded-3xl shadow-xl bg-cover bg-center"
            style={{ backgroundImage: "url('/publichero.jpg')" }}
            role="img"
            aria-label="Teams racing through Whangārei Town Basin during a checkpoint challenge"
          />
        </div>
      </section>

      {/* Styles */}
      <section id="styles" className="bg-white border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Two race styles</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold tracking-tight">Adventure Race — Town Basin</h3>
              <ul className="mt-4 space-y-2 text-slate-700 list-disc pl-5">
                <li>Physical, mental, and creative challenges</li>
                <li>Bonus points for best photo, team spirit, or time</li>
                <li>Great for team days and end-of-year functions</li>
              </ul>
              <a href="#contact" className="mt-6 inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2 text-white text-sm font-semibold hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600">Book this</a>
            </article>
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold tracking-tight">The Curious Case of the Compass Rose</h3>
              <ul className="mt-4 space-y-2 text-slate-700 list-disc pl-5">
                <li>Puzzle-based checkpoints and riddles</li>
                <li>No Google Maps. Lose points if you try</li>
                <li>Hidden clues lead to a final location and codeword</li>
                <li>Ideal for leadership teams and puzzle lovers</li>
              </ul>
              <a href="#contact" className="mt-6 inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2 text-white text-sm font-semibold hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600">Book this</a>
            </article>
          </div>
        </div>
      </section>

      {/* Inclusions and Add-ons */}
      <section id="inclusions" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Included</h2>
            <ul className="mt-4 space-y-2 text-slate-700 list-disc pl-5">
              <li>2 hours of tailored challenges</li>
              <li>Race facilitation and support from our coordinator</li>
              <li>Maps, clues, props, and challenge gear</li>
              <li>Light refreshments</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Add-ons</h2>
            <ul className="mt-4 space-y-2 text-slate-700 list-disc pl-5">
              <li>Catering</li>
              <li>Medals and awards</li>
              <li>Photography or videography</li>
              <li>Team merchandise</li>
              <li>Bespoke custom race</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Locations and Audience */}
      <section id="locations" className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Locations</h2>
            <ul className="mt-4 space-y-2 text-slate-700 list-disc pl-5">
              <li>Whangārei Town Basin loop with easy parking</li>
              <li>Northland wide by arrangement</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Who it is for</h2>
            <ul className="mt-4 space-y-2 text-slate-700 list-disc pl-5">
              <li>Corporate teams wanting to bond, energise, or celebrate</li>
              <li>Staff planning days or end-of-year functions</li>
              <li>Youth leadership groups or intermediate students</li>
              <li>Any group ready to explore, compete, and laugh</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact and Quote form */}
      <section id="contact" className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Ready to race</h2>
          <p className="mt-2 text-slate-700 max-w-prose">
            Tell us about your team and preferred date. We tailor the experience and send a quote.
          </p>

          <div className="mt-2 text-slate-700 text-sm">
            Prefer to talk? Call <a href="tel:64225155501" className="underline">022 515 5501</a> or email{" "}
            <a href="mailto:kiaora@northlandadventurerace.co.nz" className="underline">kiaora@northlandadventurerace.co.nz</a>.
          </div>

          {/* live region for status messages */}
          <p className="sr-only" aria-live="polite">{status}</p>

          <form
            action={WEB3FORMS_ENDPOINT}
            method="POST"
            onSubmit={handleNativeSubmit}
            className="mt-6 grid grid-cols-1 gap-4"
          >
            {/* Required for Web3Forms */}
            <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
            {/* Redirect back to this page with #sent */}
            <input ref={redirectRef} type="hidden" name="redirect" value="" />
            {/* Subject for your inbox */}
            <input type="hidden" name="subject" value="New Northland Adventure Race enquiry" />
            {/* Honeypot. Must remain unchecked and hidden */}
            <input type="checkbox" name="botcheck" tabIndex={-1} className="hidden" aria-hidden="true" />

            <div className="grid md:grid-cols-2 gap-4">
              <Input name="Name" label="Your name" required />
              <Input name="Company" label="Company or group" />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <Input type="email" name="email" label="Email" required />
              <Input name="Phone" label="Phone" />
              <Input
                name="GroupSize"
                label="Approx. group size"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <Select name="RaceStyle" label="Race style">
                <option value="Adventure Race">Adventure Race</option>
                <option value="Compass Rose">Compass Rose</option>
                <option value="Help me choose">Help me choose</option>
              </Select>
              <Input type="date" name="PreferredDate" label="Preferred date" />
              <Input name="Location" label="Location" placeholder="Whangārei or Northland" />
            </div>

            <fieldset className="rounded-2xl border border-slate-200 p-4">
              <legend className="px-2 text-sm">Add-ons (additional cost)</legend>
              <div className="grid md:grid-cols-3 gap-3 mt-2">
                {["Catering","Medals/Awards","Photography or Videography","Team Merch","Bespoke Custom Race"].map((label) => (
                  <label key={label} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" name="addons" value={label} />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <Textarea
              name="Message"
              label="Anything else we should know"
              placeholder="Goals, timing, accessibility needs, themes"
            />

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={sending || sent}
                className="inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-white font-semibold shadow hover:bg-emerald-700 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                {sending ? "Sending…" : sent ? "Sent ✓" : "Send enquiry"}
              </button>
              {status && (
                <p className={`text-sm ${sent ? "text-emerald-700" : "text-rose-700"}`}>
                  {status}
                </p>
              )}
            </div>

            <p className="mt-2 text-xs text-slate-500">
              We reply within one business day. Your details stay with us.
            </p>
          </form>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-600 flex items-center justify-between">
          <p>© {new Date().getFullYear()} Northland Adventure Race</p>
          <p>Whangārei | Northland wide</p>
        </div>
      </footer>
    </div>
  );
}

/* Small form helpers */
function Input({ label, className = "", ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-medium text-slate-800">{label}</span>
      <input
        {...props}
        className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
      />
    </label>
  );
}

function Textarea({ label, className = "", ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-medium text-slate-800">{label}</span>
      <textarea
        {...props}
        rows={5}
        className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
      />
    </label>
  );
}

function Select({ label, className = "", children, ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-medium text-slate-800">{label}</span>
      <select
        {...props}
        className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
      >
        {children}
      </select>
    </label>
  );
}
