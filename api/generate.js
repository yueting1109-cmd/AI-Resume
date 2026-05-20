module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Server is missing ANTHROPIC_API_KEY." });
  }

  try {
    const allowedOrigin = process.env.ALLOWED_ORIGIN;
    const requestOrigin = req.headers.origin;
    if (allowedOrigin && requestOrigin && requestOrigin !== allowedOrigin) {
      return res.status(403).json({ error: "Request origin is not allowed." });
    }

    const { payload, targetRole = "Professional" } = req.body || {};
    if (!payload || typeof payload !== "object") {
      return res.status(400).json({ error: "Missing resume payload." });
    }

    const prompt = `You are a world-class resume writer. Return ONLY valid JSON:
{"summary":"3-4 sentence professional summary","experience":[{"bullets":["4-5 achievement bullets per job"]}]}
Rules: Strong action verbs. Quantify impact. 15-22 words/bullet. Target: ${targetRole}.
Data: ${JSON.stringify(payload)}`;

    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || "claude-sonnet-4-20250514",
        max_tokens: 2000,
        messages: [{ role: "user", content: prompt }]
      })
    });

    const raw = await anthropicRes.text();
    if (!anthropicRes.ok) {
      return res.status(anthropicRes.status).json({
        error: `Anthropic API error ${anthropicRes.status}`,
        detail: raw.slice(0, 300)
      });
    }

    const data = JSON.parse(raw);
    const text = Array.isArray(data.content)
      ? data.content.filter((part) => part.type === "text").map((part) => part.text).join("")
      : "";
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) {
      return res.status(502).json({ error: "AI did not return valid JSON." });
    }

    const parsed = JSON.parse(match[0]);
    return res.status(200).json(parsed);
  } catch (error) {
    return res.status(500).json({ error: error.message || "Failed to generate resume." });
  }
};
