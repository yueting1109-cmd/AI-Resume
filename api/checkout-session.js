async function supabaseRpc(functionName, body) {
  const url = (process.env.SUPABASE_URL || "").trim().replace(/\/$/, "");
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
  if (!url || !key) throw new Error("Missing Supabase server configuration.");

  const response = await fetch(`${url}/rest/v1/rpc/${functionName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": key,
      "Authorization": `Bearer ${key}`
    },
    body: JSON.stringify(body)
  });

  const text = await response.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!response.ok) throw new Error(data?.message || data?.error || text || "Supabase request failed.");
  return data;
}

module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const secretKey = (process.env.STRIPE_SECRET_KEY || "").trim();
    if (!secretKey) return res.status(500).json({ error: "Missing STRIPE_SECRET_KEY." });

    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const sessionId = String(body.sessionId || "").trim();
    if (!sessionId.startsWith("cs_")) return res.status(400).json({ error: "Invalid checkout session." });

    const stripeRes = await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`, {
      headers: { "Authorization": `Bearer ${secretKey}` }
    });
    const session = await stripeRes.json();
    if (!stripeRes.ok) {
      return res.status(stripeRes.status).json({ error: session?.error?.message || "Unable to verify checkout." });
    }

    const email = String(session.customer_details?.email || session.customer_email || session.metadata?.email || "").trim().toLowerCase();
    const purchasedCredits = Number(session.metadata?.credits || 0);
    if (session.payment_status === "paid" && email && purchasedCredits > 0) {
      await supabaseRpc("add_user_credits", {
        p_email: email,
        p_credits: purchasedCredits,
        p_stripe_session_id: session.id,
        p_amount_total: session.amount_total || null,
        p_currency: session.currency || null,
        p_status: session.payment_status || session.status || null
      });
    }

    const credits = email ? Number(await supabaseRpc("get_user_credits", { p_email: email }) || 0) : 0;
    return res.status(200).json({ email, credits, purchasedCredits, paid: session.payment_status === "paid" });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Unable to verify checkout." });
  }
};
