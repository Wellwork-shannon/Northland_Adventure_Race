import React, { useMemo, useState } from "react";

/**
 * Northland Adventure Race - One-page React component
 * - Add-ons clarified as additional cost
 * - No bold in pricing or SEO helper text
 * - Contact number and email beside the enquiry form
 * - Locations button in header and hero
 * - Uses current hero image at /publichero.jpg
 */

// Price helper with tests
export function computeEstimateStrict(n) {
  const nn = Number(n);
  if (!Number.isFinite(nn)) return null;
  const billable = Math.max(10, Math.floor(nn));
  return billable * 110;
}

// Inline tests
try {
  console.assert(computeEstimateStrict(0) === 1100, "0 -> min 10 => 1100");
  console.assert(computeEstimateStrict(7) === 1100, "7 -> min 10 => 1100");
  console.assert(computeEstimateStrict(10) === 1100, "10 -> 1100");
  console.assert(computeEstimateStrict(12) === 1320, "12 -> 1320");
  console.assert(computeEstimateStrict("15") === 1650, "'15' -> 1650");
  console.assert(computeEstimateStrict(NaN) === null, "NaN -> null");
} catch (_) {}

export default function Site() {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");
  const [groupSize, setGroupSize] = useState("");

  const estimate = useMemo(() => {
    const n = Number.parseInt(groupSize || "", 10);
    if (!Number.isFinite(n) || n <= 0) return null;
    return computeEstimateStrict(n);
  }, [groupSize]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);

    const fd = new FormData(e.currentTarget);
    const addons = fd.getAll("AddOns[]");

    const summary = [
      `Name: ${fd.get("Name") || ""}`,
      `Company: ${fd.get("Company") || ""}`,
      `Email: ${fd.get("Email") || ""}`,
      `Phone: ${fd.get("Phone") || ""}`,
      `Group size: ${fd.get("GroupSize") || ""}`,
      `Race style: ${fd.get("RaceStyle") || ""}`,
      `Preferred date: ${fd.get("PreferredDate") || ""}`,
      `Location: ${fd.get("Location") || ""}`,
      `Add-ons: ${addons.join(", ") || "None"}`,
      estimate ? `Estimated total (min 10, excludes add-ons): $${estimate} NZD` : "Estimated: ask for quote",
      `Message: ${fd.get("Message") || ""}`,
    ].join("\n");

    // Demo success for now; replace with POST to your endpoint later.
    await new Promise((r) => setTimeout(r, 500));
    console.log(summary);
    setStatus("Thanks. We received your enquiry. We will be in touch.");
    e.currentTarget.reset();
    setGroupSize("");
    setSending(false);
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a href="#hero" className="font-semibold">Northland Adventure Race</a>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#styles" className="hover:text-emerald-600">Race Styles</a>
            <a href="#inclusions" className="hover:text-emerald-600">Inclusions</a>
            <a href="#locations" className="hover:text-emerald-600">Locations</a>
            <a href="#contact" className="hover:text-emerald-600">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="#locations" className="inline-flex items-center rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-white">Locations</a>
            <a href="#contact" className="inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2 text-white text-sm font-medium shadow hover:bg-emerald-700">Plan your race</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Corporate team building, reimagined</h1>
            <p className="mt-4 text-lg text-slate-700">Whangārei and Northland wide | Tailored 2 hour foot races</p>
            <p className="mt-6 text-slate-700">Get your team outdoors, thinking, laughing, and moving with immersive races that build connection and friendly competition.</p>
            <div className="mt-8 flex gap-3 flex-wrap">
              <a href="#styles" className="inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-white font-medium shadow hover:bg-emerald-700">See race styles</a>
              <a href="#locations" className="inline-flex items-center rounded-xl border border-slate-300 px-5 py-3 font-medium hover:bg-white">View locations</a>
              <a href="#contact" className="inline-flex items-center rounded-xl border border-slate-300 px-5 py-3 font-medium hover:bg-white">Request a quote</a>
            </div>
            <p className="mt-4 text-slate-700">Pricing: $110 per person. Minimum 10 participants. Smaller teams may be available on request.</p>
            <p className="text-slate-600 text-sm">Add-ons are optional and charged in addition to the base price.</p>
          </div>

          {/* Image panel: uses /public/publichero.jpg */}
          <div
            className="aspect-[4/3] rounded-3xl shadow-xl bg-cover bg-center"
            style={{ backgroundImage: "url('/publichero.jpg')" }}
            aria-label="Northland scenery"
          />
        </div>
      </section>

      {/* Styles */}
      <section id="styles" className="bg-white border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl md:text-3xl font-bold">Two signature race styles</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Adventure Race - Whangārei Town Basin</h3>
              <ul className="mt-4 space-y-2 text-slate-700 list-disc pl-5">
                <li>Physical, mental, and creative challenges</li>
                <li>Bonus points for best photo, team spirit, or time</li>
                <li>Ideal for corporate teams and work socials</li>
              </ul>
              <a href="#contact" className="mt-6 inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2 text-white text-sm font-medium hover:bg-emerald-700">Book this</a>
            </article>
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">The Curious Case of the Compass Rose</h3>
              <ul className="mt-4 space-y-2 text-slate-700 list-disc pl-5">
                <li>Puzzle based checkpoints and riddles</li>
                <li>No Google Maps allowed. Lose points if you try</li>
                <li>Hidden clues lead to a final location and codeword</li>
                <li>Perfect for leadership teams, adult school groups, and puzzle lovers</li>
              </ul>
              <a href="#contact" className="mt-6 inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2 text-white text-sm font-medium hover:bg-emerald-700">Book this</a>
            </article>
          </div>
        </div>
      </section>

      {/* Inclusions and Add-ons */}
      <section id="inclusions" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold">Included in every race</h2>
            <ul className="mt-4 space-y-2 text-slate-700 list-disc pl-5">
              <li>2 hours of tailored challenges</li>
              <li>Race facilitation and support from our coordinator</li>
              <li>Maps, clues, props, and challenge gear</li>
              <li>Light refreshments</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold">Add-ons (additional cost)</h2>
            <ul className="mt-4 space-y-2 text-slate-700 list-disc pl-5">
              <li>Catering</li>
              <li>Medals/Awards</li>
              <li>Photography or Videography</li>
              <li>Team Merch</li>
              <li>Bespoke Custom Race</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Locations and Audience */}
      <section id="locations" className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Locations</h2>
            <ul className="mt-4 space-y-2 text-slate-700 list-disc pl-5">
              <li>Whangārei Town Basin loop with easy parking</li>
              <li>Northland wide by arrangement</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Who it is for</h2>
            <ul className="mt-4 space-y-2 text-slate-700 list-disc pl-5">
              <li>Corporate teams wanting to bond, energise, or celebrate</li>
              <li>Staff planning days or end of year functions</li>
              <li>Youth leadership groups or intermediate students</li>
              <li>Any group ready to explore, compete, and laugh</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact and Quote form */}
      <section id="contact" className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold">Ready to race</h2>
          <p className="mt-2 text-slate-700">Tell us about your team and preferred date. We tailor the experience and send a quote.</p>

          {/* live estimate */}
          <p className="mt-3 text-slate-700">Pricing: $110 per person. Minimum 10 participants. Smaller teams may be available on request.{estimate ? (<><span> | Estimated total (excludes add-ons): ${estimate} NZD</span></>) : null}</p>

          {/* quick contact alongside the form */}
          <div className="mt-2 text-slate-700 text-sm">Prefer to talk? Call <a href="tel:64225155501" className="underline">022 515 5501</a> or email <a href="mailto:Kiaora@northlandadventurerace.co.nz" className="underline">Kiaora@northlandadventurerace.co.nz</a>.</div>

          <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input name="Name" label="Your name" required />
              <Input name="Company" label="Company or group" />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <Input type="email" name="Email" label="Email" required />
              <Input name="Phone" label="Phone" />
              <Input name="GroupSize" label="Approx. group size" inputMode="numeric" pattern="[0-9]*" onChange={(e) => setGroupSize(e.target.value)} />
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
                    <input type="checkbox" name="AddOns[]" value={label} />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <Textarea name="Message" label="Anything else we should know" placeholder="Goals, timing, accessibility needs, themes" />

            <div className="flex items-center gap-3">
              <button type="submit" disabled={sending} className="inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-white font-medium shadow hover:bg-emerald-700 disabled:opacity-60">{sending ? "Sending…" : "Send enquiry"}</button>
              {status && <p className="text-sm text-emerald-700">{status}</p>}
            </div>
          </form>

          {/* SEO helper text, no bold */}
          <p className="mt-6 text-slate-600 text-sm">Looking for an adventure race or Amazing Race Northland experience? We run team building races in Whangārei and across Northland. Search terms people use: adventure race Northland, team building Northland, Whangārei team building.</p>
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

// Small form helpers
function Input({ label, className = "", ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-medium text-slate-800">{label}</span>
      <input {...props} className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
    </label>
  );
}

function Textarea({ label, className = "", ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-medium text-slate-800">{label}</span>
      <textarea {...props} rows={5} className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
    </label>
  );
}

function Select({ label, className = "", children, ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-medium text-slate-800">{label}</span>
      <select {...props} className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">{children}</select>
    </label>
  );
}
