import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

/* ═══════════════════════════════════════════════════════════════════
   Contact form submission endpoint.

   Receives JSON from the /contact page form, validates required fields,
   silently drops bot submissions caught by the honeypot, and forwards
   the payload to your inbox via Resend.

   Required environment variables (set locally in .env.local AND in
   your host's environment panel for production):

     RESEND_API_KEY      Get one at https://resend.com/api-keys
     CONTACT_EMAIL_TO    Inbox that receives new lead notifications
     CONTACT_EMAIL_FROM  Sender address. Until you verify a custom
                         domain in Resend, use the sandbox sender:
                         "DeMelo Apps <onboarding@resend.dev>"
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

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string | undefined) {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:6px 14px 6px 0;color:#9ca3af;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;vertical-align:top;white-space:nowrap;">${esc(label)}</td>
      <td style="padding:6px 0;color:#0f172a;font-size:14px;vertical-align:top;">${esc(value)}</td>
    </tr>
  `;
}

function buildEmail(payload: ContactPayload) {
  const sourceBits = [
    payload.utm_source && `utm_source=${payload.utm_source}`,
    payload.utm_medium && `utm_medium=${payload.utm_medium}`,
    payload.utm_campaign && `utm_campaign=${payload.utm_campaign}`,
    payload.utm_term && `utm_term=${payload.utm_term}`,
    payload.utm_content && `utm_content=${payload.utm_content}`,
    payload.gclid && `gclid=${payload.gclid}`,
    payload.fbclid && `fbclid=${payload.fbclid}`,
  ].filter(Boolean) as string[];

  const html = `
<!DOCTYPE html>
<html><body style="margin:0;padding:24px;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
    <tr>
      <td style="padding:24px 28px;background:linear-gradient(135deg,#4f46e5 0%,#6366f1 60%,#818cf8 100%);">
        <div style="color:#c7d2fe;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;font-weight:600;">New Lead</div>
        <div style="color:#ffffff;font-size:22px;font-weight:600;margin-top:6px;">
          ${esc(payload.name || "Unknown")}${payload.company ? " from " + esc(payload.company) : ""}
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding:24px 28px 8px;">
        <div style="color:#374151;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;font-weight:600;margin-bottom:10px;">Contact</div>
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
          ${row("Name", payload.name)}
          ${row("Email", payload.email)}
          ${row("Phone", payload.phone)}
          ${row("Company", payload.company)}
          ${row("Role", payload.role)}
          ${row("Location", payload.location)}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:18px 28px 8px;">
        <div style="color:#374151;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;font-weight:600;margin-bottom:10px;">Project</div>
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
          ${row("Type", payload.projectType)}
          ${row("Budget", payload.budget)}
          ${row("Timeline", payload.timeline)}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:18px 28px;">
        <div style="color:#374151;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;font-weight:600;margin-bottom:10px;">Message</div>
        <div style="color:#0f172a;font-size:14px;line-height:1.7;white-space:pre-wrap;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:14px 16px;">
${esc(payload.message || "")}
        </div>
      </td>
    </tr>
    ${
      sourceBits.length > 0 || payload.referrer || payload.landingPage
        ? `
    <tr>
      <td style="padding:8px 28px 24px;">
        <div style="color:#374151;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;font-weight:600;margin-bottom:10px;">Attribution</div>
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
          ${sourceBits.length > 0 ? row("Campaign", sourceBits.join(" · ")) : ""}
          ${row("Referrer", payload.referrer)}
          ${row("Landing page", payload.landingPage)}
          ${typeof payload.timeOnPageMs === "number" ? row("Time on page", `${Math.round(payload.timeOnPageMs / 1000)}s`) : ""}
        </table>
      </td>
    </tr>`
        : ""
    }
    <tr>
      <td style="padding:14px 28px;background:#f9fafb;border-top:1px solid #e5e7eb;color:#6b7280;font-size:11px;letter-spacing:0.04em;">
        Submitted via demeloapps.com/contact · ${new Date().toUTCString()}
      </td>
    </tr>
  </table>
</body></html>
  `;

  const text = [
    `New lead from ${payload.name || "Unknown"}${payload.company ? " (" + payload.company + ")" : ""}`,
    "",
    "── Contact ──",
    payload.name ? `Name:     ${payload.name}` : "",
    payload.email ? `Email:    ${payload.email}` : "",
    payload.phone ? `Phone:    ${payload.phone}` : "",
    payload.company ? `Company:  ${payload.company}` : "",
    payload.role ? `Role:     ${payload.role}` : "",
    payload.location ? `Location: ${payload.location}` : "",
    "",
    "── Project ──",
    payload.projectType ? `Type:     ${payload.projectType}` : "",
    payload.budget ? `Budget:   ${payload.budget}` : "",
    payload.timeline ? `Timeline: ${payload.timeline}` : "",
    "",
    "── Message ──",
    payload.message || "",
    "",
    sourceBits.length > 0 || payload.referrer
      ? "── Attribution ──"
      : "",
    sourceBits.length > 0 ? `Campaign: ${sourceBits.join(" · ")}` : "",
    payload.referrer ? `Referrer: ${payload.referrer}` : "",
    payload.landingPage ? `Landing:  ${payload.landingPage}` : "",
    typeof payload.timeOnPageMs === "number"
      ? `On page:  ${Math.round(payload.timeOnPageMs / 1000)}s`
      : "",
  ]
    .filter((line) => line !== "")
    .join("\n");

  const subject = `New lead: ${payload.name || "Unknown"}${
    payload.company ? " from " + payload.company : ""
  }${payload.projectType ? " (" + payload.projectType + ")" : ""}`;

  return { html, text, subject };
}

async function forwardSubmission(payload: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM;

  if (!apiKey || !to || !from) {
    // In development without env vars set, fall back to a console log
    // so the form remains testable end to end.
    console.warn(
      "[CONTACT] missing env (RESEND_API_KEY / CONTACT_EMAIL_TO / CONTACT_EMAIL_FROM). Logging payload instead.",
    );
    console.log("[CONTACT] new submission", {
      ...payload,
      receivedAt: new Date().toISOString(),
    });
    return;
  }

  const resend = new Resend(apiKey);
  const { html, text, subject } = buildEmail(payload);

  const { error } = await resend.emails.send({
    from,
    to: [to],
    subject,
    html,
    text,
    replyTo: payload.email,
  });

  if (error) {
    throw new Error(error.message || "Resend rejected the submission");
  }
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
