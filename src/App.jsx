"use client";

import React, { useState } from "react";

/**
 * Northland Adventure Race - One-page React component
 * Web3Forms version (no estimated total, success UI, SEO text removed)
 */

// Web3Forms
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "f8b31566-8614-4321-9b57-09f40a9a2387";

export default function Site() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState("");
  const [statusKind, setStatusKind] = useState("idle"); // "idle" | "success" | "error"

  async function handleSubmit(e) {
    e.preventDefault();
    setSent(false);
    setStatus("");
    setStatusKind("idle");
    setSending(true);

    try {
      const fd = new FormData(e.currentTarget);

      // Honeypot
      if (fd.get("botcheck")) throw new Error("Spam detected");

      // Ensure access key is present for safety
      if (!fd.get("access_key")) fd.append("access_key", WEB3FORMS_ACCESS_KEY);

      // Helpful aliases
      fd.append("subject", "New Northland Adventure Race enquiry");
      fd.append("from_name", fd.get("Name") || "");
      fd.append("from_email", fd.get("email") || "");

      // Add-ons summary
      const addons = fd.getAll("addons");
      fd.append("AddOnsSummary", addons.join(", "));

      // Human summary (no estimate line)
      const note = [
        `Name: ${fd.get("Name") || ""}`,
        `Company: ${fd.get("Company") || ""}`,
        `Email: ${fd.get("email") || ""}`,
        `Phone: ${fd.get("Phone") || ""}`,
        `Group size: ${fd.get("GroupSize") || ""}`,
        `Race style: ${fd.get("RaceStyle") || ""}`,
        `Preferred date: ${fd.get("PreferredDate") || ""}`,
        `Location: ${fd.get("Location") || ""}`,
        `Add-ons: ${addons.join(", ") || "None"}`,
        `Message: ${fd.get("Message") || ""}`,
      ].join("\n");
      fd.append("Summary", note);

      const resp = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });

      const raw = await resp.text();
      let json = null;
      try { json = JSON.parse(raw); } catch { /* non-JSON is fine if HTTP is OK */ }

      const ok = resp.ok && (json?.success !== false);
      if (!ok) {
        const msg = json?.message || json?.body?.message || `Submit failed. HTTP ${resp.status}`;
        throw new Error(msg);
      }

      setSent(true);
      setStatusKind("success");
      setStatus("Thanks, your enquiry was sent. We will be in touch.");
      e.currentTarget.reset();
    } catch (err) {
      console.error("Form submit error:", err);
      setStatusKind("error");
      setStatus(
        err instanceof Error && err.message
          ? err.message
          : "Sorry, something went wrong. Please try again or call 022 515 5501."
      );
    } finally {
      setSending(false);
    }
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
      </head
