import assert from "node:assert/strict";
import handler from "../api/contact.js";

function response() {
  return {
    statusCode: 200, headers: {}, body: null,
    status(code) { this.statusCode = code; return this; },
    setHeader(name, value) { this.headers[name] = value; return this; },
    json(body) { this.body = body; return this; },
    end() { return this; },
  };
}

async function request(body, ip) {
  const res = response();
  await handler({ method: "POST", body, headers: { origin: "https://gridhouse.digital", host: "gridhouse.digital", "x-forwarded-for": ip }, socket: {} }, res);
  return res;
}

process.env.RESEND_API_KEY = "test-key";
process.env.CONTACT_FROM_EMAIL = "Gridhouse <intake@example.com>";
process.env.CONTACT_TO_EMAIL = "hello@example.com";
globalThis.fetch = async () => ({ ok: true });

assert.equal((await request({ name: "Test", email: "bad", description: "too short" }, "192.0.2.1")).statusCode, 400);
assert.equal((await request({ _website: "spam" }, "192.0.2.2")).statusCode, 204);
assert.equal((await request({ name: "Test Person", email: "test@example.com", description: "A sufficiently detailed project request." }, "192.0.2.3")).statusCode, 204);
const foreign = response();
await handler({ method: "POST", body: {}, headers: { origin: "https://example.net", host: "gridhouse.digital" }, socket: {} }, foreign);
assert.equal(foreign.statusCode, 403);
for (let attempt = 0; attempt < 5; attempt += 1) await request({ _website: "spam" }, "192.0.2.4");
assert.equal((await request({ _website: "spam" }, "192.0.2.4")).statusCode, 429);
console.log("contact API checks passed");
