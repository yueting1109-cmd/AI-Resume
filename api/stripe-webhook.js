const crypto = require("crypto");

async function readRawBody(req) {
  if (Buffer.isBuffer(req.body)) return req.body;
  if (typeof req.body === "string") return Buffer.from(req.body);
  const chunks = [];
  for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  return Buffer.concat(chunks);
}

function verifyStripeSignature(rawBody, signatureHeader, secret) {
  if (!signatureHeader || !secret) return false;
  const parts = Object.fromEntries(
    signatureHeader.split(",").map((part) => {
      const [key, value] = part.split("=");
      return [key, value];
    })
  );
  if (!parts.t || !parts.v1) return false;

  const signedPayload = `${parts.t}.${rawBody.toString("utf8")}`;
  const expected = crypto.createHmac("sha256", secret).update(signedPayload).digest("hex");
  const expectedBuffer = Buffer.from(expected);
  const actualBuffer = Buffer.from(parts.v1);
  return expectedBuffer.length === actualBuffer.length && crypto.timingSafeEqual(expectedBuffer, actualBuffer);
}

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
  if (!response.ok) throw new Error(text || "Supabase request failed.");
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).send("Method not allowed");
  }

  try {
    const secret = (process.env.STRIPE_WEBHOOK_SECRET || "").trim();
    if (!secret) return res.status(500).send("Missing STRIPE_WEBHOOK_SECRET");

    const rawBody = await readRawBody(req);
    const signature = req.headers["stripe-signature"];
    if (!verifyStripeSignature(rawBody, signature, secret)) {
      return res.status(400).send("Invalid Stripe signature");
    }

    const event = JSON.parse(rawBody.toString("utf8"));
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const credits = Number(session.metadata?.credits || 0);
      const email = String(session.customer_details?.email || session.customer_email || session.metadata?.email || "").trim().toLowerCase();
      if (email && credits > 0) {
        await supabaseRpc("add_user_credits", {
          p_email: email,
          p_credits: credits,
          p_stripe_session_id: session.id,
          p_amount_total: session.amount_total || null,
          p_currency: session.currency || null,
          p_status: session.payment_status || session.status || null
        });
      }
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("stripe webhook failed:", error.message || error);
    return res.status(500).send(error.message || "Webhook failed");
  }
};
