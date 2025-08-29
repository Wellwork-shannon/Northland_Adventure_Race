async function handleSubmit(e) {
  e.preventDefault();
  setSending(true);
  setStatus("");

  const fd = new FormData(e.currentTarget);

  // Build a nice AddOns summary (Web3Forms stores all fields as key/value)
  const addons = fd.getAll("AddOns[]");
  if (addons.length) fd.set("AddOnsSummary", addons.join(", "));
  else fd.set("AddOnsSummary", "None");

  // Web3Forms required + helpful fields
  fd.set("access_key", WEB3FORMS_ACCESS_KEY);
  fd.set("subject", "New Northland Adventure Race enquiry");
  // Ensure they have a plain "email" + reply-to
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
      // Surface the exact message Web3Forms returns
      throw new Error(data.message || "Send failed. Please try again.");
    }

    setStatus("Thanks. We received your enquiry. We will be in touch.");
    e.currentTarget.reset();
    setGroupSize("");
  } catch (err) {
    setStatus(
      (err && err.message) ||
        "Sorry, something went wrong. Please try again or call 022 515 5501."
    );
  } finally {
    setSending(false);
  }
}
