import React, { useEffect, useRef, useState } from "react";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "f8b31566-8614-4321-9b57-09f40a9a2387";

export default function App() {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const redirectRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#sent") {
      setStatus("Thanks. We received your enquiry. We will be in touch.");
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setStatus("");

    const fd = new FormData(e.currentTarget);

    const addons = fd.getAll("AddOns[]");
    if (addons.length) fd.set("AddOnsSummary", addons.join(", "));
    else fd.set("AddOnsSummary", "None");

    fd.set("access_key", WEB3FORMS_ACCESS_KEY);
    fd.set("subject", "New Northland Adventure Race enquiry");
    if (!fd.get("email")) fd.set("email", fd.get("Email") || "");
    fd.set("from_name", fd.get("Name") || "Website Visitor");
    fd.set("replyto", fd.get("Email") || "");

    try {
      const resp = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      });

      const data = await resp.json();

      if (!data.success) {
        throw new Error(data.message || "Send failed. Please try again.");
      }

      setStatus("Thanks. We received your enquiry. We will be in touch.");
      e.currentTarget.reset();
      setGroupSize("");
      if (redirectRef.current) {
        redirectRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (err) {
      setStatus(
        (err && err.message) ||
          "Sorry, something went wrong. Please try again or call 022 515 5501."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="min-h-screen font-sans text-slate-800">
      {/* Hero */}
      <header className="px-6 py-12 text-center bg-white">
        <h1 className="text-4xl font-semibold">Northland Adventure Race</h1>
        <p className="mt-3 text-lg">
          Two-hour Amazing Race style team event across Whangārei and Northland.
        </p>
      </header>

      {/* About */}
      <section className="px-6 py-10 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold">What you get</h2>
        <ul className="mt-4 space-y-2 list-disc list-inside">
          <li>Physical, mental, and creative challenges</li>
          <li>Custom routes for your group</li>
          <li>Simple scoring and a clear winner</li>
          <li>Optional add-ons for a fuller experience</li>
        </ul>
      </section>

      {/* Pricing */}
      <section className="px-6 py-10 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold">Pricing</h2>
        <p className="mt-2">NZD $110 per person. Minimum 10 participants.</p>
        <p className="mt-1">Add-ons available at additional cost.</p>
      </section>

      {/* Ready to race */}
      <section className="px-6 py-10 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold">Ready to race?</h2>
        <p className="mt-2">
          Prefer to talk? Call 022 515 5501 or email info@northlandadventurerace.co.nz
        </p>
      </section>

      {/* Enquiry form */}
      <section className="px-6 py-10 max-w-4xl mx-auto" ref={redirectRef}>
        <h2 className="text-2xl font-semibold">Send an enquiry</h2>

        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col">
              <span className="mb-1">Name</span>
              <input
                name="Name"
                required
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Jane Doe"
              />
            </label>
            <label className="flex flex-col">
              <span className="mb-1">Email</span>
              <input
                name="Email"
                required
                className="border rounded px-3 py-2"
                type="email"
                placeholder="you@example.com"
              />
            </label>
          </div>

          <label className="flex flex-col">
            <span className="mb-1">Company or group</span>
            <input
              name="Company"
              className="border rounded px-3 py-2"
              type="text"
              placeholder="Your organisation"
            />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col">
              <span className="mb-1">Preferred date</span>
              <input
                name="PreferredDate"
                className="border rounded px-3 py-2"
                type="date"
              />
            </label>

            <label className="flex flex-col">
              <span className="mb-1">Estimated group size</span>
              <input
                name="GroupSize"
                className="border rounded px-3 py-2"
                type="number"
                min="10"
                value={groupSize}
                onChange={(e) => setGroupSize(e.target.value)}
                placeholder="e.g., 20"
              />
            </label>
          </div>

          <fieldset className="mt-2">
            <legend className="font-medium">Add-ons (optional)</legend>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" name="AddOns[]" value="Catering" />
                <span>Catering</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="AddOns[]" value="Medals" />
                <span>Medals</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="AddOns[]" value="Branded clothing" />
                <span>Branded clothing</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="AddOns[]" value="Merchandise" />
                <span>Merchandise</span>
              </label>
            </div>
          </fieldset>

          <label className="flex flex-col">
            <span className="mb-1">Message</span>
            <textarea
              name="Message"
              rows={5}
              className="border rounded px-3 py-2"
              placeholder="Tell us about your team, location preferences, or timing."
            />
          </label>

          <button
            type="submit"
            disabled={sending}
            className="inline-flex items-center justify-center rounded-lg px-5 py-3 bg-emerald-600 text-white hover:opacity-95 disabled:opacity-60"
          >
            {sending ? "Sending..." : "Send enquiry"}
          </button>

          {/* Status / errors */}
          {status ? (
            <p className="mt-2 text-sm" aria-live="polite">
              {status}
            </p>
          ) : null}
        </form>
      </section>

      <footer className="px-6 py-10 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Northland Adventure Race
      </footer>
    </main>
  );
}
