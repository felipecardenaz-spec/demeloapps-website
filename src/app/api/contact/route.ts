import { NextResponse } from "next/server";

export const runtime = "nodejs";

/* ═══════════════════════════════════════════════════════════════════
   Contact form submission endpoint.

   Receives JSON from the /contact page form. Validates required fields,
   silently drops bot submissions caught by the honeypot, and forwards
   the payload to your email/CRM service of choice.

   To wire up email delivery in production, plug in one of:
     - Resend     https://resend.com
     - SendGrid   https://sendgrid.com
     - Mailgun    https://mailgun.com
     - Postmark   https://postmarkapp.com
     - Loops      https://loops.so   (also handles ad-campaign sequences)

   Add the chosen provider's SDK + API key as an env var, then replace
   the `forwardSubmission` body with the appropriate send call.
   ═══════════════════════════════════════════════════════════════════ */

interface ContactPayload {
  // Contact
  name?: string;
  email?: string;
  phone?: string;
  // Company
  company?: string;
  role?: string;
  location?: string;
  // Project
  projectType?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  // Campaign tracking
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  referrer?: string;
  landingPage?: string;
  timeOnPageMs?: number;
  // Anti-bot
  honeypot?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(value: unknown, max = 2000): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

async function forwardSubmission(payload: ContactPayload) {
  // ──────────────────────────────────────────────────────────────
  //  Hook your email / CRM service in here.
  //
  //  Example with Resend:
  //
  //    import { Resend } from "resend";
  //    const resend = new Resend(process.env.RESEND_API_KEY);
  //    await resend.emails.send({
  //      from:    "contact@demeloapps.com",
  //      to:      "hello@demeloapps.com",
  //      subject: `New lead: ${payload.name} from ${payload.company ?? "—"}`,
  //      text:    JSON.stringify(payload, null, 2),
  //    });
  //
  //  Example with HubSpot / Pipedrive / etc. — POST the payload to
  //  their Forms API or CRM contact endpoint instead.
  // ──────────────────────────────────────────────────────────────

  // For now we log so submissions are visible during development.
  // Remove or downgrade to a structured logger in production.
  console.log("[CONTACT] new submission", {
    ...payload,
    receivedAt: new Date().toISOString(),
  });
}

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const body = raw as ContactPayload;

  // Honeypot — bots fill hidden fields. Silently accept so they think
  // they succeeded instead of probing for the validation rules.
  if (typeof body.honeypot === "string" && body.honeypot.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = sanitize(body.name, 120);
  const email = sanitize(body.email, 160);
  const message = sanitize(body.message, 5000);

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Invalid email address" },
      { status: 400 },
    );
  }

  const payload: ContactPayload = {
    name,
    email,
    phone: sanitize(body.phone, 60),
    company: sanitize(body.company, 160),
    role: sanitize(body.role, 120),
    location: sanitize(body.location, 160),
    projectType: sanitize(body.projectType, 80),
    budget: sanitize(body.budget, 80),
    timeline: sanitize(body.timeline, 80),
    message,
    utm_source: sanitize(body.utm_source, 120),
    utm_medium: sanitize(body.utm_medium, 120),
    utm_campaign: sanitize(body.utm_campaign, 200),
    utm_term: sanitize(body.utm_term, 160),
    utm_content: sanitize(body.utm_content, 200),
    gclid: sanitize(body.gclid, 200),
    fbclid: sanitize(body.fbclid, 200),
    referrer: sanitize(body.referrer, 500),
    landingPage: sanitize(body.landingPage, 500),
    timeOnPageMs:
      typeof body.timeOnPageMs === "number" && body.timeOnPageMs >= 0
        ? Math.min(body.timeOnPageMs, 1000 * 60 * 60 * 24)
        : undefined,
  };

  try {
    await forwardSubmission(payload);
  } catch (err) {
    console.error("[CONTACT] forward failed", err);
    return NextResponse.json(
      { ok: false, error: "Could not deliver message" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
