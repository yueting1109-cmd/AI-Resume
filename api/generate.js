module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = (process.env.ANTHROPIC_API_KEY || "").trim().replace(/^["']|["']$/g, "");
  if (!apiKey) {
    return res.status(500).json({ error: "Server is missing ANTHROPIC_API_KEY." });
  }

  try {
    const allowedOrigin = process.env.ALLOWED_ORIGIN;
    const requestOrigin = req.headers.origin;
    if (allowedOrigin && requestOrigin && requestOrigin !== allowedOrigin) {
      return res.status(403).json({ error: "Request origin is not allowed." });
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const { payload, targetRole = "Professional" } = body;
    if (!payload || typeof payload !== "object") {
      return res.status(400).json({ error: "Missing resume payload." });
    }

    const prompt = `You are an elite resume strategist for MNC, Fortune 500, Big Tech, consulting, banking, and competitive graduate hiring.
Return ONLY valid JSON in this exact shape:
{"summary":"3-4 sentence professional summary","experience":[{"bullets":["4-5 achievement bullets per job"]}]}

Hiring-manager rules:
- Write for a human HR screener first, then ATS: clear scope, role fit, measurable impact, and credible achievements.
- Use achievement bullets, not task lists. Prefer CAR/STAR structure: action + scope/context + method/tool + result.
- Start every bullet with a strong action verb. Avoid weak phrases like responsible for, assisted with, helped with.
- Integrate relevant ATS keywords from the target role, experience, skills, tools, certifications, and industry.
- Do NOT invent employers, degrees, certifications, dates, revenue, headcount, or exact metrics not provided.
- If exact metrics are missing, write credible outcome-oriented bullets without fake numbers; use scale words only when supported by input.
- Keep bullets concise, executive, and specific: 16-24 words each.
- Remove fluff, clichés, and generic traits. Show business value, technical depth, leadership, customer impact, risk reduction, speed, quality, or cost savings.
- Tailor tone to target role: ${targetRole}.

Candidate data:
${JSON.stringify(payload)}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);
    const model = (process.env.ANTHROPIC_MODEL || "claude-3-5-haiku-20241022").trim().replace(/^["']|["']$/g, "");
    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model,
        max_tokens: 1200,
        messages: [{ role: "user", content: prompt }]
      }),
      signal: controller.signal
    });
    clearTimeout(timeout);

    const raw = await anthropicRes.text();
    if (!anthropicRes.ok) {
      let detail = raw.slice(0, 500);
      try {
        const parsedError = JSON.parse(raw);
        detail = parsedError?.error?.message || parsedError?.message || detail;
      } catch {}
      return res.status(anthropicRes.status).json({
        error: `Anthropic API error ${anthropicRes.status}: ${detail}`,
        detail
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
    console.error("generate failed:", error.message || error);
    if (error.name === "AbortError") {
      return res.status(504).json({ error: "Anthropic request timed out. Please retry." });
    }
    return res.status(500).json({ error: error.message || "Failed to generate resume." });
  }
};
