# Contact form integration

The contact form (`src/components/ui/ContactFormPanel.tsx`) submits a JSON
payload via `fetch` to the URL in `VITE_CONTACT_ENDPOINT`
(default `/api/contact`).

## Payload shape

```json
{
  "name": "string",
  "email": "string",
  "company": "string",
  "website": "string",
  "service": "string",
  "budget": "string",
  "timeline": "string",
  "description": "string"
}
```

## Wiring up Resend

Drop a serverless function (Vercel, Netlify, Cloudflare Workers, etc.) at the
endpoint URL. Minimal Resend example (Node):

```ts
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const data = await req.json();
  await resend.emails.send({
    from: "Gridhouse <intake@gridhouse.digital>",
    to: ["hello@gridhouse.digital"],
    subject: `New project intake — ${data.name}`,
    text: JSON.stringify(data, null, 2),
  });
  return new Response(null, { status: 204 });
}
```

## Wiring up Postmark

```ts
import { ServerClient } from "postmark";
const client = new ServerClient(process.env.POSTMARK_TOKEN!);

export async function POST(req: Request) {
  const data = await req.json();
  await client.sendEmail({
    From: "intake@gridhouse.digital",
    To: "hello@gridhouse.digital",
    Subject: `New project intake — ${data.name}`,
    TextBody: JSON.stringify(data, null, 2),
  });
  return new Response(null, { status: 204 });
}
```

## Notes

- No keys ship in the client bundle — `VITE_CONTACT_ENDPOINT` is just a URL.
- Until the endpoint exists, the form will surface a clear error state to the
  user; the rest of the site continues to work.
- For spam protection, add Cloudflare Turnstile / hCaptcha to the function
  before forwarding to Resend / Postmark.
