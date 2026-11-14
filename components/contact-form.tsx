"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";

const RECIPIENT = "info@nexveins.com";

const serviceOptions = [
  "System Software Development",
  "Website Development",
  "Social Media Marketing",
  "SEO Optimization",
  "AI Automation",
  "Something else",
];

type FormValues = { name: string; email: string; phone: string; service: string; details: string };
type FormErrors = Partial<Record<keyof FormValues, string>>;

const empty: FormValues = { name: "", email: "", phone: "", service: "", details: "" };

function buildMailto(values: FormValues) {
  const body = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone}`,
    `Service: ${values.service}`,
    "",
    "Project details:",
    values.details,
  ].join("\n");
  return `mailto:${RECIPIENT}?subject=${encodeURIComponent(`Project enquiry — ${values.name}`)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(empty);
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);

  const update = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setMessage("");
    setReady(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: FormErrors = {};
    if (!values.name.trim()) next.name = "Add your name so we know who we are talking to.";
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) next.email = "Enter a valid email address.";
    if (values.phone.replace(/\D/g, "").length < 7) next.phone = "Enter a phone number we can reach you on.";
    if (!values.service) next.service = "Pick the service closest to what you need.";
    if (values.details.trim().length < 12) next.details = "A sentence or two about the project, please.";
    setErrors(next);
    setReady(false);
    if (Object.keys(next).length) {
      setMessage("A couple of details still need your attention.");
      return;
    }
    window.location.href = buildMailto(values);
    setMessage("Your email app is opening with this message already written. Nothing is stored on the website.");
    setReady(true);
  };

  const invalidCount = Object.keys(errors).length;

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="form-heading"><span>Tell us about the project</span><span>{RECIPIENT}</span></div>

      <div className="field-group">
        <label htmlFor="contact-name">Full name</label>
        <input id="contact-name" name="name" autoComplete="name" required value={values.name} onChange={(event) => update("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} placeholder="Your name" />
        {errors.name && <p className="field-error" id="name-error">{errors.name}</p>}
      </div>

      <div className="field-group">
        <label htmlFor="contact-email">Email address</label>
        <input id="contact-email" name="email" type="email" autoComplete="email" required value={values.email} onChange={(event) => update("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} placeholder="you@company.com" />
        {errors.email && <p className="field-error" id="email-error">{errors.email}</p>}
      </div>

      <div className="field-group">
        <label htmlFor="contact-phone">Phone number</label>
        <input id="contact-phone" name="phone" type="tel" autoComplete="tel" required value={values.phone} onChange={(event) => update("phone", event.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} placeholder="+92 300 0000000" />
        {errors.phone && <p className="field-error" id="phone-error">{errors.phone}</p>}
      </div>

      <div className="field-group">
        <label htmlFor="contact-service">Service interested in</label>
        <select id="contact-service" name="service" required value={values.service} onChange={(event) => update("service", event.target.value)} aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? "service-error" : undefined}>
          <option value="">Select a service</option>
          {serviceOptions.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
        {errors.service && <p className="field-error" id="service-error">{errors.service}</p>}
      </div>

      <div className="field-group">
        <label htmlFor="contact-details">Project details</label>
        <textarea id="contact-details" name="details" rows={4} required value={values.details} onChange={(event) => update("details", event.target.value)} aria-invalid={Boolean(errors.details)} aria-describedby={errors.details ? "details-error" : "details-hint"} placeholder="What are you building, and what should it do?" />
        {errors.details ? <p className="field-error" id="details-error">{errors.details}</p> : <p className="field-hint" id="details-hint">The more context you give, the sharper our first reply.</p>}
      </div>

      <button className="button button-submit" type="submit">
        {invalidCount ? "Check your details" : "Send message"} <ArrowRight size={16} weight="bold" aria-hidden="true" />
      </button>
      <p className={`form-status${ready ? " is-ready" : ""}`} role="status" aria-live="polite">
        {ready && <CheckCircle size={16} aria-hidden="true" />}
        {message}
      </p>
      <p className="form-setup">This site has no inbox of its own, so sending opens your email app with everything filled in. Prefer to write it yourself? <a className="form-direct" href={`mailto:${RECIPIENT}`}>Email {RECIPIENT}</a>.</p>
    </form>
  );
}
