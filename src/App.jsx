import React, { useState } from 'react'

export default function App() {
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState('')
  const FORMSPREE_ENDPOINT = 'DEMO' // replace with your Formspree endpoint

  async function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    const form = e.currentTarget
    const data = new FormData(form)

    if (FORMSPREE_ENDPOINT === 'DEMO') {
      await new Promise(r => setTimeout(r, 500))
      setStatus('Thanks. This is a demo. Your submission was simulated.')
      form.reset()
      setSending(false)
      return
    }

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('Thanks. Your enquiry has been sent. We will be in touch.')
      form.reset()
    } catch {
      const params = new URLSearchParams({
        subject: 'Northland Adventure Race enquiry',
        body: Array.from(data.entries()).map(([k, v]) => `${k}: ${v}`).join('\n'),
      }).toString()
      window.location.href = `mailto:Kiaora@Northlandadventurerace.nz?${params}`
      setStatus('Tried to open your email app as a backup. If nothing opened, email Kiaora@Northlandadventurerace.nz')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen">
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
          <a href="#contact" className="ml-4 inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2 text-white text-sm font-medium shadow hover:bg-emerald-700">Plan your race</a>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Corporate Team Building, Reimagined</h1>
            <p className="mt-4 text-lg text-slate-700">Whangārei and Northland-wide | Tailored 2-hour foot races</p>
            <p className="mt-6 text-slate-700">Get your team outdoors, thinking, laughing, and moving with immersive races that build connection and spark friendly competition.</p>
            <div className="mt-8 flex gap-3">
              <a href="#styles" className="inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-white font-medium shadow hover:bg-emerald-700">See race styles</a>
              <a href="#contact" className="inline-flex items-center rounded-xl border border-slate-300 px-5 py-3 font-medium hover:bg-white">Request a quote</a>
            </div>
          </div>
          <div className="aspect-[4/3] rounded-3xl bg-slate-200 grid place-items-center shadow-xl">
            <div className="text-slate-600 text-center px-6">
              <p className="font-medium">Hero image placeholder</p>
              <p className="text-sm">Add your Northland photo later</p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl md:text-3xl font-bold">Who it is for</h2>
          <ul className="mt-6 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {['Corporate teams','Planning days and end-of-year','Youth leadership or intermediate','Any group keen to explore'].map(item => (
              <li key={item} className="rounded-2xl border border-slate-200 bg-white p-4 text-slate-700 shadow-sm">{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Race Styles */}
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
              <a href="#contact" className="mt-6 inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2 text-white text-sm font-medium hover:bg-emerald-700">Book this</a>
            </article>
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">The Curious Case of the Compass Rose</h3>
              <ul className="mt-4 space-y-2 text-slate-700 list-disc pl-5">
                <li>Puzzle-based checkpoints and riddles</li>
                <li>No Google Maps allowed. Lose points if you try</li>
                <li>Hidden clues lead to a final location and codeword</li>
                <li>Perfect for leadership teams, adult school groups, and puzzle fans</li>
              </ul>
              <a href="#contact" className="mt-6 inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2 text-white text-sm font-medium hover:bg-emerald-700">Book this</a>
            </article>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section id="addons" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl md:text-3xl font-bold">Add-ons available</h2>
          <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {['Catering or picnic packages','Branded tees, medals, merch','Custom awards','Photography or video','Themed dress-up','Puzzle packs'].map(item => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-slate-800">{item}</div>
            ))}
          </div>
          <p className="mt-6 text-slate-700">Have a theme or goal in mind? We can design a bespoke adventure to match.</p>
        </div>
      </section>

      {/* Locations */}
      <section id="locations" className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Locations</h2>
            <ul className="mt-4 space-y-2 text-slate-700 list-disc pl-5">
              <li>Based in Whangārei Town Basin with easy parking and a scenic loop</li>
              <li>Travel across Northland by arrangement</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">What is included</h2>
            <ul className="mt-4 space-y-2 text-slate-700 list-disc pl-5">
              <li>Full event setup, facilitation, and scorekeeping</li>
              <li>Professional coordinator or race host</li>
              <li>Printable or digital race maps with clues</li>
              <li>All props, puzzle materials, and challenge gear</li>
              <li>Light refreshments</li>
              <li>A great atmosphere that inspires connection, creativity, and collaboration</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-white border-t border-slate-200">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold">Ready to race</h2>
          <p className="mt-2 text-slate-700">Tell us about your team and preferred date. We will tailor the experience and send a quote.</p>
          <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input name="Name" label="Your name" required />
              <Input name="Company" label="Company or group" />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <Input type="email" name="Email" label="Email" required />
              <Input name="Phone" label="Phone" />
              <Input name="GroupSize" label="Approx. group size" />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <Select name="RaceStyle" label="Race style">
                <option value="Adventure Race">Adventure Race</option>
                <option value="Compass Rose">Compass Rose</option>
                <option value="Unsure">Help me choose</option>
              </Select>
              <Input type="date" name="PreferredDate" label="Preferred date" />
              <Input name="Location" label="Location" placeholder="Whangārei or Northland" />
            </div>
            <Textarea name="Message" label="Anything else we should know" placeholder="Goals, timing, accessibility needs, themes" />
            <div className="flex items-center gap-3">
              <button type="submit" disabled={sending} className="inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-white font-medium shadow hover:bg-emerald-700 disabled:opacity-60">
                {sending ? 'Sending...' : 'Send enquiry'}
              </button>
              <p className="text-sm text-slate-600">
                Or email <a href="mailto:Kiaora@Northlandadventurerace.nz" className="underline">Kiaora@Northlandadventurerace.nz</a>
              </p>
            </div>
            {status && <p className="text-sm mt-2 text-emerald-700">{status}</p>}
          </form>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-600 flex items-center justify-between">
          <p>© {new Date().getFullYear()} Northland Adventure Race</p>
          <p>Whangārei | Northland-wide</p>
        </div>
      </footer>
    </div>
  )
}

function Input({ label, className = '', ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-medium text-slate-800">{label}</span>
      <input {...props} className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
    </label>
  )
}

function Textarea({ label, className = '', ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-medium text-slate-800">{label}</span>
      <textarea {...props} rows={5} className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
    </label>
  )
}

function Select({ label, className = '', children, ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-medium text-slate-800">{label}</span>
      <select {...props} className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">{children}</select>
    </label>
  )
}
