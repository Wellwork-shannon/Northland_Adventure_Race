import React, { useState } from 'react'

export default function App() {
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState('')
  const FORMSPREE_ENDPOINT = 'DEMO' // replace with your Formspree endpoint when ready

  async function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    const form = e.currentTarget
    const data = new FormData(form)

    // Demo mode so you can see a success message now
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
          <a href="#hero" className="font-sem
