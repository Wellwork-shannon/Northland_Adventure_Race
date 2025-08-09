import React, { useState } from 'react'

export default function App() {
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState('')
  const FORMSPREE_ENDPOINT = 'DEMO'  // replace later with real endpoint

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
  }

  return (
    <div>
      <h1>Northland Adventure Race</h1>
      <form onSubmit={handleSubmit}>
        <input name="Name" placeholder="Your name" required />
        <input name="Email" type="email" placeholder="Email" required />
        <button type="submit" disabled={sending}>
          {sending ? 'Sending…' : 'Send enquiry'}
        </button>
      </form>
      {status && <p>{status}</p>}
    </div>
  )
}
