module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const secretKey = (process.env.STRIPE_SECRET_KEY || "").trim();
    const siteUrl = (process.env.SITE_URL || "").trim().replace(/\/$/, "");
    if (!secretKey) return res.status(500).json({ error: "Missing STRIPE_SECRET_KEY." });
    if (!siteUrl) return res.status(500).json({ error: "Missing SITE_URL." });

    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const pack = body.pack === "3" ? "3" : "1";
    const price = pack === "3" ? process.env.STRIPE_PRICE_3 : process.env.STRIPE_PRICE_1;
    if (!price) return res.status(500).json({ error: `Missing STRIPE_PRICE_${pack}.` });

    const params = new URLSearchParams();
    params.append("mode", "payment");
    params.append("line_items[0][price]", price.trim());
    params.append("line_items[0][quantity]", "1");
    params.append("success_url", `${siteUrl}?checkout=success&pack=${pack}`);
    params.append("cancel_url", `${siteUrl}?checkout=cancelled`);
    params.append("allow_promotion_codes", "true");
    params.append("billing_address_collection", "auto");
    params.append("metadata[credits]", pack);

    const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params.toString()
    });

    const text = await stripeRes.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { error: { message: text } }; }
    if (!stripeRes.ok) {
      return res.status(stripeRes.status).json({ error: data?.error?.message || "Stripe checkout failed." });
    }

    return res.status(200).json({ url: data.url });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Failed to create checkout session." });
  }
};
