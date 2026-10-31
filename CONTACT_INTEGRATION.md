# Contact form integration

The form posts JSON to `VITE_CONTACT_ENDPOINT` (default `/api/contact`). The
included Vercel function at `api/contact.js` validates the request, rejects
cross-origin submissions, applies a small per-instance throttle and honeypot,
then delivers the message through Resend.

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

## Production settings

Configure `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL` as
server-only Vercel environment variables. The sender must use a domain verified
in Resend. `CONTACT_ALLOWED_ORIGINS` can add comma-separated preview origins.

## Notes

- No keys ship in the client bundle — `VITE_CONTACT_ENDPOINT` is just a URL.
- Run `npm run test:contact` for the validation, honeypot, and delivery-path check.
- A live delivery test requires the production Resend credentials and verified sender.
