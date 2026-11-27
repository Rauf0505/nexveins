import nodemailer from "nodemailer";

// Nodemailer uses TCP directly, so this handler must run on the Node.js runtime.
export const runtime = "nodejs";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  service?: unknown;
  details?: unknown;
  website?: unknown;
};

type FieldErrors = Partial<Record<"name" | "email" | "phone" | "service" | "details", string>>;

const asText = (value: unknown) => (typeof value === "string" ? value.trim() : "");
const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

function validate(payload: ContactPayload): FieldErrors {
  const errors: FieldErrors = {};
  const name = asText(payload.name);
  const email = asText(payload.email);
  const phone = asText(payload.phone);
  const service = asText(payload.service);
  const details = asText(payload.details);

  if (!name) errors.name = "Add your name so we know who we are talking to.";
  if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Enter a valid email address.";
  if (phone.replace(/\D/g, "").length < 7) errors.phone = "Enter a phone number we can reach you on.";
  if (!service) errors.service = "Pick the service closest to what you need.";
  if (details.length < 12) errors.details = "A sentence or two about the project, please.";

  return errors;
}

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Hidden honeypot: bots fill it, people don't. Accept silently, send nothing.
  if (asText(payload.website)) {
    return Response.json({ ok: true });
  }

  const errors = validate(payload);
  if (Object.keys(errors).length > 0) {
    return Response.json(
      { error: "A couple of details still need your attention.", errors },
      { status: 400 },
    );
  }

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    console.error("Contact form: SMTP_USER or SMTP_PASS is not configured.");
    return Response.json(
      { error: "Email is not configured. Please email us directly." },
      { status: 500 },
    );
  }

  const port = Number(process.env.SMTP_PORT ?? "465");
  const secure = (process.env.SMTP_SECURE ?? String(port === 465)) === "true";

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.hostinger.com",
    port: Number.isFinite(port) ? port : 465,
    secure,
    auth: { user, pass },
  });

  const name = oneLine(asText(payload.name));
  const email = oneLine(asText(payload.email));
  const phone = oneLine(asText(payload.phone));
  const service = oneLine(asText(payload.service));
  const details = asText(payload.details);

  try {
    await transporter.sendMail({
      // Hostinger rejects sends where From doesn't match the authenticated mailbox.
      from: `"NexVeins Website" <${user}>`,
      to: process.env.CONTACT_TO || user,
      replyTo: email,
      subject: `New project enquiry — ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Service: ${service}`,
        "",
        "Project details:",
        details,
      ].join("\n"),
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact form SMTP error:", error);
    return Response.json(
      { error: "We couldn't send your message. Please try again or email us directly." },
      { status: 500 },
    );
  }
}
