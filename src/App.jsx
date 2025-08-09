import React, { useState } from "react";

export default function App() {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    // demo success so the page works even before wiring a real endpoint
    await new Promise((r) => setTimeout(r, 400));
    setStatus("Thanks. This is a demo. Your submission was simulated.");
    e.currentTarget.reset();
    setSending(false);
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a href="#hero" className="font-semibold">Northland Adventure Race</a>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#about" className="hover:text-emerald-600">About</a>
            <a href="#styles" className="hover:text-emerald-600">Race Styles</a>
            <a href="#addons" className="hover:text-emerald-600">Add-ons</a>
            <a href="#locations" className="hover:text-emerald-600">Locations</a>
            <a href="#contact" className="hover:text-emerald-600">Contact</a>
          </nav>
          <a href="#contact" className="ml-4 inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2 text-white text-sm font-medium shadow hover:bg-emerald-700">
            Plan your race
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Corporate Team Building, Reimagined</h1>
            <p className="mt-4 text-lg text-slate-700">Whangārei and Northland wide | Tailored 2 hour foot races</p>
            <p className="mt-6 text-slate-700">
              Get your team outdoors, thinking, laughing, and moving with immersive races that build connection and friendly competition.
            </p>
            <div className="mt-8 flex gap-3">
              <a href="#styles" className="inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-white font-medium shadow hover:bg-emerald-700">
                See race styles
              </a>
              <a href="#contact" className="inline-flex items-center rounded-xl border border-slate-300 px-5 py-3 font-medium hover:bg-white">
                Request a quote
              </a>
            </div>
          </div>

          {/* Image panel: uses /public/publichero.jpg if present, falls back to a gradient if not */}
          <div
            className="aspect-[4/3] rounded-3xl shadow-xl bg-cover bg-center"
            style={{
              backgroundImage:
                "url('/publichero.jpg'), linear-gradient(135deg, #d1fae5 0%, #bfdbfe 100%)",
            }}
            aria-label="Northland scenery"
          />
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl md:text-3xl font-bold">Who it is for</h2>
          <ul className="mt-6 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Corporate teams",
              "Planning days and end of year",
              "Youth leadership or intermediate",
              "Any group keen to explore",
            ].map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-slate-200 bg-white p-4 text-slate-700 shadow-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Simple styles block to prove navigation */}
      <section id="styles" className="bg-white border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl md:text-3xl font-bold">Two signature race styles</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Adventure Race — Whangārei Town Basin</h3>
              <ul className="mt-4 space-y-2 text-slate-700 list-disc pl-5">
                <li>Physical, mental, and creative challenges</li>
                <li>Bonus points for best photo, team spirit, or time</li>
                <li>Ideal for corporate teams and work socials</li>
              </ul>
              <a href="#contact" className="mt-6 inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2 text-white text-sm font-medium hover:bg-emerald-700">
                Book this
              </a>
            </article>
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">The Curious Case of the Compass Rose</h3>
              <ul className="mt-4 space-y-2 text-slate-700 list-disc pl-5">
                <li>Puzzle based checkpoints and riddles</li>
                <li>No Google Maps allowed. Lose points if you try</li>
                <li>Hidden clues lead to a final location and codeword</li>
              </ul>
              <a href="#contact" className="mt-6 inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2 text-white text-sm font-medium hover:bg-emerald-700">
                Book this
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold">Ready to race</h2>
          <p className="mt-2 text-slate-700">Tell us about your team and preferred date. We tailor the experience and send a quote.</p>
          <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-4">
            <input name="Name" placeholder="Your name" className="border p-2 rounded" required />
            <input name="Email" type="email" placeholder="Email" className="border p-2 rounded" required />
            <button
              type="submit"
              disabled={sending}
              className="rounded-xl bg-emerald-600 px-5 py-3 text-white font-medium shadow hover:bg-emerald-700 disabled:opacity-60"
            >
              {sending ? "Sending..." : "Send enquiry"}
            </button>
            {status && <p className="text-sm mt-2 text-emerald-700">{status}</p>}
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
