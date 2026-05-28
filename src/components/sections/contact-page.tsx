"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Footer } from "./footer";

/* ═══════════════════════════════════════════════════════════════════
   ContactPage — lead capture form for the DeMeloApps site.

   Wired to /api/contact. Captures ad-campaign attribution
   (utm_*, gclid, fbclid, referrer, landing URL, time on page)
   so submissions can be attributed to the campaign that drove them.

   Pre-fills can be triggered from ad creative deep links, e.g.:
     /contact?service=mobile           → preselects Mobile App
     /contact?tier=growth              → preselects $15k to $40k budget
     /contact?service=ai-automation&utm_source=google&utm_campaign=q3-ai
   ═══════════════════════════════════════════════════════════════════ */

/* ─── Field options ─────────────────────────────────────────────── */
const PROJECT_TYPES = [
  { value: "ai-automation", label: "AI Automation" },
  { value: "custom-software", label: "Custom Software" },
  { value: "mobile", label: "Mobile App" },
  { value: "other", label: "Other / Not sure yet" },
] as const;

const BUDGET_RANGES = [
  { value: "foundation", label: "$5k to $15k" },
  { value: "growth", label: "$15k to $40k" },
  { value: "ecosystem", label: "$40k or more" },
  { value: "unsure", label: "Not sure yet" },
] as const;

const TIMELINES = [
  { value: "asap", label: "ASAP, within a month" },
  { value: "2-3-months", label: "2 to 3 months" },
  { value: "3-6-months", label: "3 to 6 months" },
  { value: "flexible", label: "Flexible" },
] as const;

/* ─── Form state ────────────────────────────────────────────────── */
interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  location: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  honeypot: string;
}

interface Attribution {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  gclid: string;
  fbclid: string;
  referrer: string;
  landingPage: string;
}

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  role: "",
  location: "",
  projectType: "",
  budget: "",
  timeline: "",
  message: "",
  honeypot: "",
};

const INITIAL_ATTRIBUTION: Attribution = {
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_term: "",
  utm_content: "",
  gclid: "",
  fbclid: "",
  referrer: "",
  landingPage: "",
};

type Status = "idle" | "submitting" | "success" | "error";

/* ─── Styles shared across inputs ───────────────────────────────── */
const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "10.5px",
  fontWeight: 500,
  letterSpacing: "0.10em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.55)",
  marginBottom: "8px",
};

const inputBase: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  fontSize: "14px",
  fontFamily: "inherit",
  fontWeight: 400,
  color: "#ffffff",
  background: "rgba(8,8,18,0.55)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: "10px",
  outline: "none",
  transition: "border-color 0.22s ease, background 0.22s ease",
  boxSizing: "border-box",
};

const textareaStyle: React.CSSProperties = {
  ...inputBase,
  minHeight: "140px",
  resize: "vertical",
  lineHeight: 1.55,
  fontFamily: "inherit",
};

/* ─── Input wrapper that handles focus state ────────────────────── */
function Field({
  label,
  htmlFor,
  required,
  children,
  error,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor={htmlFor} style={labelStyle}>
        {label}
        {required && (
          <span style={{ color: "rgba(129,140,248,0.75)", marginLeft: "4px" }}>*</span>
        )}
      </label>
      {children}
      {error && (
        <span
          role="alert"
          style={{
            fontSize: "12px",
            color: "rgba(248,113,113,0.95)",
            marginTop: "6px",
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      {...props}
      onFocus={(e) => {
        setFocused(true);
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        props.onBlur?.(e);
      }}
      style={{
        ...inputBase,
        borderColor: focused ? "rgba(129,140,248,0.55)" : inputBase.border as string,
        background: focused ? "rgba(99,102,241,0.06)" : inputBase.background as string,
      }}
    />
  );
}

function SelectInput({
  options,
  placeholder,
  ...rest
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: ReadonlyArray<{ value: string; label: string }>;
  placeholder: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      {...rest}
      onFocus={(e) => {
        setFocused(true);
        rest.onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        rest.onBlur?.(e);
      }}
      style={{
        ...inputBase,
        appearance: "none",
        WebkitAppearance: "none",
        MozAppearance: "none",
        cursor: "pointer",
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23a5b4fc' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 14px center",
        paddingRight: "38px",
        borderColor: focused ? "rgba(129,140,248,0.55)" : inputBase.border as string,
        background: focused ? "rgba(99,102,241,0.06)" : inputBase.background as string,
      }}
    >
      <option value="" disabled style={{ color: "#666" }}>
        {placeholder}
      </option>
      {options.map((opt) => (
        <option
          key={opt.value}
          value={opt.value}
          style={{ background: "#0b0918", color: "#ffffff" }}
        >
          {opt.label}
        </option>
      ))}
    </select>
  );
}

function TextareaInput(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      {...props}
      onFocus={(e) => {
        setFocused(true);
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        props.onBlur?.(e);
      }}
      style={{
        ...textareaStyle,
        borderColor: focused ? "rgba(129,140,248,0.55)" : inputBase.border as string,
        background: focused ? "rgba(99,102,241,0.06)" : inputBase.background as string,
      }}
    />
  );
}

/* ─── Page ──────────────────────────────────────────────────────── */
export function ContactPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const attributionRef = useRef<Attribution>(INITIAL_ATTRIBUTION);
  const mountedAtRef = useRef<number>(Date.now());

  // Mobile breakpoint
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // Capture campaign attribution + URL pre-fills on first mount.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const params = url.searchParams;

    attributionRef.current = {
      utm_source: params.get("utm_source") ?? "",
      utm_medium: params.get("utm_medium") ?? "",
      utm_campaign: params.get("utm_campaign") ?? "",
      utm_term: params.get("utm_term") ?? "",
      utm_content: params.get("utm_content") ?? "",
      gclid: params.get("gclid") ?? "",
      fbclid: params.get("fbclid") ?? "",
      referrer: document.referrer || "",
      landingPage: window.location.href,
    };

    // Pre-fill from deep links so ad creatives can preselect a service
    // or budget tier and the form reflects it instantly.
    const prefilledService = params.get("service");
    const prefilledTier = params.get("tier");
    setForm((prev) => ({
      ...prev,
      projectType:
        prefilledService && PROJECT_TYPES.some((p) => p.value === prefilledService)
          ? prefilledService
          : prev.projectType,
      budget:
        prefilledTier && BUDGET_RANGES.some((b) => b.value === prefilledTier)
          ? prefilledTier
          : prev.budget,
    }));
  }, []);

  /* ─── Validation ─────────────────────────────────────────────── */
  const validate = (state: FormState): Partial<Record<keyof FormState, string>> => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!state.name.trim()) next.name = "Required";
    if (!state.email.trim()) next.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim())) {
      next.email = "Enter a valid email";
    }
    if (!state.message.trim()) next.message = "Required";
    else if (state.message.trim().length < 20) {
      next.message = "Tell us a bit more, at least 20 characters";
    }
    return next;
  };

  /* ─── Submit ─────────────────────────────────────────────────── */
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Focus the first error
      const first = Object.keys(found)[0];
      const el = document.getElementById(first);
      el?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          ...attributionRef.current,
          timeOnPageMs: Date.now() - mountedAtRef.current,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (!res.ok || !data.ok) {
        throw new Error(data.error || `Request failed (${res.status})`);
      }

      // Ad conversion event hook — fire here if/when an analytics layer is added.
      // Examples:
      //   window.gtag?.("event", "generate_lead", { value: 1, currency: "CAD" });
      //   window.fbq?.("track", "Lead");

      setStatus("success");
    } catch (err) {
      console.error("[CONTACT] submit failed", err);
      setStatus("error");
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  };

  const onChange =
    <K extends keyof FormState>(field: K) =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>,
    ) => {
      const value = e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    };

  /* ─── Render ─────────────────────────────────────────────────── */
  return (
    <>
      <div
        style={{
          background: "linear-gradient(180deg, #0b0918 0%, #08070f 55%, #06060c 100%)",
          position: "relative",
          minHeight: "100vh",
        }}
      >
        {/* Header */}
        <section
          aria-label="Contact"
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: isMobile ? "120px 24px 24px" : "152px 48px 36px",
            position: "relative",
          }}
        >
          {/* Top glow */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "900px",
              height: "440px",
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.10) 0%, rgba(99,102,241,0.04) 45%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              maxWidth: "640px",
            }}
          >
            <span
              style={{
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: "10.5px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(129,140,248,0.75)",
                fontWeight: 400,
              }}
            >
              Start a Project
            </span>

            <h1
              style={{
                fontSize: isMobile ? "clamp(34px, 8.5vw, 44px)" : "clamp(46px, 5vw, 64px)",
                fontWeight: 300,
                letterSpacing: "-0.036em",
                lineHeight: 1.06,
                color: "#ffffff",
                margin: 0,
              }}
            >
              Tell us about
              <br />
              <span style={{ color: "rgba(129,140,248,0.75)" }}>your project.</span>
            </h1>

            <p
              style={{
                fontSize: isMobile ? "14.5px" : "16px",
                color: "rgba(255,255,255,0.55)",
                fontWeight: 300,
                lineHeight: 1.72,
                margin: 0,
                maxWidth: "520px",
              }}
            >
              Share what you are building and we will reply within a business day with
              scope, timeline, and next steps.
            </p>
          </motion.div>
        </section>

        {/* Form + Sidebar */}
        <section
          aria-label="Contact form"
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: isMobile ? "0 24px 80px" : "0 48px 120px",
            position: "relative",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1.45fr) minmax(0, 0.85fr)",
              gap: isMobile ? "32px" : "44px",
              alignItems: "flex-start",
            }}
          >
            {/* Form card */}
            <div
              style={{
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(8,8,18,0.55)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow:
                  "0 0 60px rgba(99,102,241,0.05), inset 0 1px 0 rgba(255,255,255,0.04)",
                padding: isMobile ? "24px 22px" : "36px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top shimmer */}
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 1,
                  background:
                    "linear-gradient(to right, transparent, rgba(165,180,252,0.30), transparent)",
                  pointerEvents: "none",
                }}
              />

              {status === "success" ? (
                <SuccessState onReset={() => {
                  setForm(INITIAL_FORM);
                  setErrors({});
                  setStatus("idle");
                  setSubmitError(null);
                }} />
              ) : (
                <form onSubmit={onSubmit} noValidate>
                  {/* Hidden honeypot — bots fill it, real users do not */}
                  <input
                    type="text"
                    name="company_name_hp"
                    value={form.honeypot}
                    onChange={onChange("honeypot")}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: "-10000px",
                      width: 1,
                      height: 1,
                      opacity: 0,
                      pointerEvents: "none",
                    }}
                  />

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                      gap: "18px",
                    }}
                  >
                    <Field label="Full name" htmlFor="name" required error={errors.name}>
                      <TextInput
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Jane Smith"
                        value={form.name}
                        onChange={onChange("name")}
                      />
                    </Field>
                    <Field label="Work email" htmlFor="email" required error={errors.email}>
                      <TextInput
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="jane@company.com"
                        value={form.email}
                        onChange={onChange("email")}
                      />
                    </Field>
                    <Field label="Company" htmlFor="company">
                      <TextInput
                        id="company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        placeholder="Company name"
                        value={form.company}
                        onChange={onChange("company")}
                      />
                    </Field>
                    <Field label="Role" htmlFor="role">
                      <TextInput
                        id="role"
                        name="role"
                        type="text"
                        autoComplete="organization-title"
                        placeholder="CEO, CTO, Head of Ops"
                        value={form.role}
                        onChange={onChange("role")}
                      />
                    </Field>
                    <Field label="Phone" htmlFor="phone">
                      <TextInput
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+1 555 555 5555"
                        value={form.phone}
                        onChange={onChange("phone")}
                      />
                    </Field>
                    <Field label="Location" htmlFor="location">
                      <TextInput
                        id="location"
                        name="location"
                        type="text"
                        autoComplete="address-level2"
                        placeholder="City, Country"
                        value={form.location}
                        onChange={onChange("location")}
                      />
                    </Field>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                      gap: "18px",
                      marginTop: "18px",
                    }}
                  >
                    <Field label="Project type" htmlFor="projectType">
                      <SelectInput
                        id="projectType"
                        name="projectType"
                        value={form.projectType}
                        onChange={onChange("projectType")}
                        options={PROJECT_TYPES}
                        placeholder="Select"
                      />
                    </Field>
                    <Field label="Budget range" htmlFor="budget">
                      <SelectInput
                        id="budget"
                        name="budget"
                        value={form.budget}
                        onChange={onChange("budget")}
                        options={BUDGET_RANGES}
                        placeholder="Select"
                      />
                    </Field>
                    <Field label="Timeline" htmlFor="timeline">
                      <SelectInput
                        id="timeline"
                        name="timeline"
                        value={form.timeline}
                        onChange={onChange("timeline")}
                        options={TIMELINES}
                        placeholder="Select"
                      />
                    </Field>
                  </div>

                  <div style={{ marginTop: "18px" }}>
                    <Field
                      label="Tell us about your project"
                      htmlFor="message"
                      required
                      error={errors.message}
                    >
                      <TextareaInput
                        id="message"
                        name="message"
                        required
                        placeholder="What problem are you solving? Who is it for? Any constraints or context that would help us scope it accurately."
                        value={form.message}
                        onChange={onChange("message")}
                      />
                    </Field>
                  </div>

                  {submitError && (
                    <div
                      role="alert"
                      style={{
                        marginTop: "18px",
                        padding: "12px 14px",
                        borderRadius: "10px",
                        background: "rgba(248,113,113,0.08)",
                        border: "1px solid rgba(248,113,113,0.28)",
                        color: "rgba(255,200,200,0.95)",
                        fontSize: "13px",
                        lineHeight: 1.55,
                      }}
                    >
                      {submitError}
                    </div>
                  )}

                  <div
                    style={{
                      marginTop: "26px",
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      alignItems: isMobile ? "stretch" : "center",
                      justifyContent: "space-between",
                      gap: "16px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "11.5px",
                        color: "rgba(255,255,255,0.40)",
                        lineHeight: 1.6,
                        margin: 0,
                        maxWidth: "320px",
                      }}
                    >
                      By submitting, you agree we may contact you about your project.
                      We never share your information.
                    </p>
                    <SubmitButton status={status} />
                  </div>
                </form>
              )}
            </div>

            {/* Sidebar — what to expect */}
            <aside
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                position: isMobile ? "static" : "sticky",
                top: "120px",
              }}
            >
              <ExpectCard
                eyebrow="Reply Time"
                title="Within a business day"
                body="A real person reviews every submission. Expect a focused reply with scope, timeline, and next steps inside one business day."
              />
              <ExpectCard
                eyebrow="What Happens Next"
                title="Scope, then a call"
                body="If the fit looks right we will send a written scope, then book a 30 minute discovery call to align on outcomes before any commitment."
              />
              <ExpectCard
                eyebrow="Studio"
                title="Vancouver, Canada"
                body="Headquartered on Canada's Pacific coast. Working remotely with growing companies across North America and internationally."
              />
            </aside>
          </motion.div>
        </section>
      </div>

      <Footer />
    </>
  );
}

/* ─── Submit button ─────────────────────────────────────────────── */
function SubmitButton({ status }: { status: Status }) {
  const [hov, setHov] = useState(false);
  const busy = status === "submitting";

  return (
    <button
      type="submit"
      disabled={busy}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-busy={busy}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: hov && !busy ? "12px" : "9px",
        padding: "14px 28px",
        borderRadius: "12px",
        fontSize: "14.5px",
        fontWeight: 500,
        letterSpacing: "-0.005em",
        textDecoration: "none",
        color: "rgba(255,255,255,0.96)",
        background: hov && !busy
          ? "linear-gradient(170deg, #818cf8 0%, #6366f1 50%, #4f46e5 100%)"
          : "linear-gradient(170deg, #5b5ef4 0%, #4338ca 100%)",
        boxShadow: hov && !busy
          ? "inset 0 1px 0 0 rgba(255,255,255,0.28), 0 8px 22px -6px rgba(79,70,229,0.55)"
          : "inset 0 1px 0 0 rgba(255,255,255,0.14)",
        border: hov && !busy
          ? "1px solid rgba(255,255,255,0.20)"
          : "1px solid rgba(255,255,255,0.10)",
        cursor: busy ? "wait" : "pointer",
        opacity: busy ? 0.85 : 1,
        transition: "all 240ms cubic-bezier(0.22,1,0.36,1)",
        whiteSpace: "nowrap",
        minWidth: "180px",
      }}
    >
      {busy ? (
        <>
          <Spinner />
          Sending
        </>
      ) : (
        <>
          Send message
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M2 7h10M8 3l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </>
      )}
    </button>
  );
}

function Spinner() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      style={{
        animation: "contact-spin 0.8s linear infinite",
      }}
    >
      <circle
        cx="7"
        cy="7"
        r="5.5"
        stroke="rgba(255,255,255,0.30)"
        strokeWidth="1.5"
      />
      <path
        d="M7 1.5a5.5 5.5 0 0 1 5.5 5.5"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <style>{`@keyframes contact-spin { to { transform: rotate(360deg); } }`}</style>
    </svg>
  );
}

/* ─── Success state ─────────────────────────────────────────────── */
function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "16px",
        padding: "12px 0",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "rgba(99,102,241,0.14)",
          border: "1px solid rgba(129,140,248,0.34)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 12.5L10 17.5L19 7.5"
            stroke="rgba(199,210,254,0.95)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h2
        style={{
          fontSize: "22px",
          fontWeight: 500,
          letterSpacing: "-0.02em",
          color: "#ffffff",
          margin: 0,
        }}
      >
        Message received.
      </h2>
      <p
        style={{
          fontSize: "14px",
          color: "rgba(255,255,255,0.62)",
          lineHeight: 1.7,
          margin: 0,
          maxWidth: "440px",
        }}
      >
        Thanks for reaching out. A real person on our team will review your project
        and reply within one business day with scope, timeline, and next steps.
      </p>
      <button
        type="button"
        onClick={onReset}
        style={{
          marginTop: "6px",
          fontSize: "12.5px",
          fontWeight: 500,
          letterSpacing: "0.02em",
          color: "rgba(129,140,248,0.75)",
          background: "transparent",
          border: "none",
          padding: "8px 0",
          cursor: "pointer",
          textDecoration: "underline",
          textUnderlineOffset: "3px",
        }}
      >
        Send another message
      </button>
    </motion.div>
  );
}

/* ─── Sidebar card ──────────────────────────────────────────────── */
function ExpectCard({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div
      style={{
        borderRadius: "16px",
        padding: "20px 22px",
        background: "rgba(8,8,18,0.55)",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <span
        style={{
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: "9.5px",
          letterSpacing: "0.20em",
          textTransform: "uppercase",
          color: "rgba(129,140,248,0.75)",
          fontWeight: 400,
        }}
      >
        {eyebrow}
      </span>
      <h3
        style={{
          fontSize: "15px",
          fontWeight: 500,
          letterSpacing: "-0.015em",
          color: "#f0f0f5",
          margin: 0,
          lineHeight: 1.3,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "13px",
          color: "rgba(255,255,255,0.55)",
          fontWeight: 300,
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        {body}
      </p>
    </div>
  );
}
