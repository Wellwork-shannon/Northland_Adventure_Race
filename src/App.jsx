import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Northland Adventure Race - One-page React component
 * Web3Forms + native POST (no JS fetch), no SEO text, no estimate
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
        setStatus("Thanks, your enquiry was sent. We will be in touch.");
        // Clear the hash so a refresh does not keep showing it
        history.replaceState(null, "", window.location.pathname);
      }
      // Fill redirect so Web3Forms sends the user back here with #sent
      const url = window.location.origin + window.location.pathname + "#sent";
      if (redirectRef.current) redirectRef.current.value = url;
    }
  }, []);

  // SEO and structured data injection (no UI changes)
  useEffect(() => {
    if (typeof document === "undefined") return;

    const title =
      "Northland Adventure Race | Team building in Whangārei and Northland";
    const description =
      "Amazing Race style team building in Whangārei and Northland. A two-hour on-foot adventure race for corporate teams, leadership groups, and Christmas parties.";
    const canonical = "https://www.northlandadventurerace.co.nz/";
    const ogImage = "/og.jpg";

    // helper to create or update tags
    function upsert(tag, attrs) {
      const selector = Object.entries(attrs)
        .map(([k, v]) => `[${k}="${v}"]`)
        .join("");
      let el =
        document.head.querySelector(`${tag}${selector}`) ||
        document.createElement(tag);
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      if (!el.parentNode) document.head.appendChild(el);
      return el;
    }

    document.title = title;
    upsert("link", { rel: "canonical", href: canonical });

    // Basic meta
    let metaDesc = document.head.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // Open Graph
    upsert("meta", { property: "og:type", content: "website" });
    upsert("meta", { property: "og:url", content: canonical });
    upsert("meta", { property: "og:title", content: title });
    upsert("meta", { property: "og:description", content: description });
    upsert("meta", { property: "og:image", content: ogImage });

    // Twitter
    upsert("meta", { name: "twitter:card", content: "summary_large_image" });
    upsert("meta", { name: "twitter:title", content: title });
    upsert("meta", { name: "twitter:description", content: description });
    upsert("meta", { name: "twitter:image", content: ogImage });

    // Keywords to help initial discovery (Google largely ignores, but harmless)
    const keywords =
      "Northland team building, Northland adventure, northland race, northland adventure race, Whangarei race, Whangarei Christmas party, Whangarei Christmas do, adventure race, amazing race northland, amazing race new zealand, fun christmas do";
    let metaKeywords = document.head.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute("content", keywords);

    // LocalBusiness JSON-LD with region-level address (no street address shown)
    const ld = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Northland Adventure Race",
      url: canonical,
      image: canonical + "og.jpg",
      telephone: "+64 22 515 5501",
      email: "kiaora@northlandadventurerace.co.nz",
      description:
        "Amazing Race style team building in Whangārei and Northland. Two-hour on-foot adventure race for corporate teams and Christmas parties.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Whangārei",
        addressRegion: "Northland",
        addressCountry: "NZ",
      },
      areaServed: ["Whangārei", "Northland", "New Zealand"],
    };

    let ldScript = document.getElementById("ld-localbusiness");
    if (!ldScript) {
      ldScript = document.createElement("script");
      ldScript.type = "application/ld+json";
      ldScript.id = "ld-localbusiness";
      document.head.appendChild(ldScript);
    }
    ldScript.textContent = JSON.stringify(ld);

    // Cleanup not required since we want tags persistent across route changes
  }, []);

  // When the form is submitted, we let the browser do a normal POST.
  // We only flip the button to "Sending…" immediately so the user gets feedback.
  function handleNativeSubmit() {
    setSending(true);
    setStatus("");
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

          <div className="mt-2 text-slate-700 text-sm">
            Prefer to talk? Call <a href="tel:64225155501" className="underline">022 515 5501</a> or email <a href="mailto:Kiaora@northlandadventurerace.co.nz" className="underline">Kiaora@northlandadventurerace.co.nz</a>.
          </div>

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
                className="inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-white font-medium shadow hover:bg-emerald-700 disabled:opacity-60"
              >
                {sending ? "Sending…" : sent ? "Sent ✓" : "Send enquiry"}
              </button>
              {status && (
                <p className={`text-sm ${sent ? "text-emerald-700" : "text-rose-700"}`}>
                  {status}
                </p>
              )}
            </div>
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
        className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
        className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
        className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        {children}
      </select>
    </label>
  );
}
