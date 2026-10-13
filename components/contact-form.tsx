"use client";

import { useState, type FormEvent } from "react";
import { Check, CheckCircle } from "@phosphor-icons/react";

type FormValues = { name: string; email: string; project: string };
type FormErrors = Partial<Record<keyof FormValues, string>>;

export function ContactForm() {
  const [values, setValues] = useState<FormValues>({ name: "", email: "", project: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setMessage("");
    setSubmitted(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: FormErrors = {};
    if (!values.name.trim()) next.name = "Add your name so we know how to say hello.";
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) next.email = "Enter a valid email address.";
    if (values.project.trim().length < 12) next.project = "A few more details will help us understand the idea.";
    setErrors(next);
    setSubmitted(false);
    if (Object.keys(next).length) {
      setMessage("A couple of details need your attention.");
      return;
    }
    setMessage("Your details look ready, but no inbox is connected. Nothing has been sent.");
    setSubmitted(true);
  };

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="form-heading"><span>Tell us a little about it</span><span>01 / 03</span></div>
      <div className="field-group">
        <label htmlFor="contact-name">Your name</label>
        <input id="contact-name" name="name" autoComplete="name" required value={values.name} onChange={(event) => update("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} placeholder="How should we call you?" />
        {errors.name && <p className="field-error" id="name-error">{errors.name}</p>}
      </div>
      <div className="field-group">
        <label htmlFor="contact-email">Work email</label>
        <input id="contact-email" name="email" type="email" autoComplete="email" required value={values.email} onChange={(event) => update("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} placeholder="you@company.com" />
        {errors.email && <p className="field-error" id="email-error">{errors.email}</p>}
      </div>
      <div className="field-group">
        <label htmlFor="contact-project">What are you thinking about?</label>
        <textarea id="contact-project" name="project" rows={3} required value={values.project} onChange={(event) => update("project", event.target.value)} aria-invalid={Boolean(errors.project)} aria-describedby={errors.project ? "project-error" : "project-hint"} placeholder="A product idea, a thorny problem, a next step…" />
        {errors.project ? <p className="field-error" id="project-error">{errors.project}</p> : <p className="field-hint" id="project-hint">A sentence or two is a perfect start.</p>}
      </div>
      <button className="button button-submit" type="submit">{submitted ? "Review your note" : "Check your note"}<Check size={16} weight="bold" aria-hidden="true" /></button>
      <p className={`form-status${submitted ? " is-ready" : ""}`} role="status" aria-live="polite">{message && (submitted ? <CheckCircle size={16} aria-hidden="true" /> : null)}{message}</p>
      <p className="form-setup">Form sending will be enabled when an inbox is connected.</p>
    </form>
  );
}
