const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_BODY_BYTES = 12_000;
// ponytail: instance-local throttle; use a shared store or edge firewall if abuse needs durable cross-instance quotas.
const attempts = new Map();
const fields = { name: 100, email: 254, company: 150, website: 500, service: 150, budget: 50, timeline: 50, description: 5000 };

function send(res, status, body) {
  res.status(status).setHeader("Cache-Control", "no-store");
  return body ? res.json(body) : res.end();
}

function clean(value, max) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function allowedOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return true;
  const forwardedHost = req.headers["x-forwarded-host"];
  const host = Array.isArray(forwardedHost) ? forwardedHost[0] : forwardedHost || req.headers.host;
  const configured = (process.env.CONTACT_ALLOWED_ORIGINS || "").split(",").map((item) => item.trim()).filter(Boolean);
  try {
    return new URL(origin).host === host || configured.includes(origin);
  } catch {
    return false;
  }
}

function rateLimited(req) {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = (Array.isArray(forwarded) ? forwarded[0] : forwarded || req.socket?.remoteAddress || "unknown").split(",")[0].trim();
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return send(res, 405, { error: "Method not allowed" });
  }
  if (!allowedOrigin(req)) return send(res, 403, { error: "Origin not allowed" });
  if (Number(req.headers["content-length"] || 0) > MAX_BODY_BYTES) return send(res, 413, { error: "Request too large" });
  if (rateLimited(req)) return send(res, 429, { error: "Too many requests" });

  let raw;
  try {
    raw = req.body && typeof req.body === "object" ? req.body : typeof req.body === "string" ? JSON.parse(req.body) : {};
  } catch {
    return send(res, 400, { error: "Invalid JSON" });
  }
  if (clean(raw._website, 200)) return send(res, 204);
  const data = Object.fromEntries(Object.entries(fields).map(([key, max]) => [key, clean(raw[key], max)]));
  if (!data.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.description.length < 20) {
    return send(res, 400, { error: "Name, a valid email, and a project description are required" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !from || !to) return send(res, 503, { error: "Contact service unavailable" });

  const lines = [
    `Name: ${data.name}`, `Email: ${data.email}`, `Company: ${data.company || "Not provided"}`,
    `Website: ${data.website || "Not provided"}`, `Service: ${data.service || "Not provided"}`,
    `Budget: ${data.budget || "Not provided"}`, `Timeline: ${data.timeline || "Not provided"}`,
    "", "Project description:", data.description,
  ];
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "User-Agent": "gridhouse-digital-contact/1.0" },
      body: JSON.stringify({
        from, to: [to], reply_to: data.email,
        subject: `New project request — ${data.name.replace(/[\r\n]/g, " ")}`,
        text: lines.join("\n"),
      }),
    });
    return response.ok ? send(res, 204) : send(res, 502, { error: "Contact service unavailable" });
  } catch {
    return send(res, 502, { error: "Contact service unavailable" });
  }
}
