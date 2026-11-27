"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  CaretDown,
  Check,
  CheckCircle,
  CircleNotch,
  MagnifyingGlass,
  WarningCircle,
  X,
} from "@phosphor-icons/react";

const RECIPIENT = "info@nexveins.com";

export const serviceOptions = [
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

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(empty);
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [website, setWebsite] = useState("");

  /* Searchable select state for services */
  const [serviceOpen, setServiceOpen] = useState(false);
  const [serviceSearch, setServiceSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const update = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setMessage("");
    setReady(false);
  };

  /* Close dropdown when clicking outside or pressing Escape */
  useEffect(() => {
    if (!serviceOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServiceOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setServiceOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [serviceOpen]);

  /* Focus the search box when dropdown opens */
  useEffect(() => {
    if (serviceOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 40);
      return () => clearTimeout(timer);
    }
  }, [serviceOpen]);

  const filteredServices = serviceOptions.filter((option) =>
    option.toLowerCase().includes(serviceSearch.toLowerCase().trim())
  );

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    const next: FormErrors = {};
    if (!values.name.trim()) next.name = "Add your name so we know who we are talking to.";
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) next.email = "Enter a valid email address.";
    if (values.phone.replace(/\D/g, "").length < 7) next.phone = "Enter a phone number we can reach you on.";
    if (!values.service) next.service = "Pick the service closest to what you need.";
    if (values.details.trim().length < 12) next.details = "A sentence or two about the project, please (min. 12 characters).";
    setErrors(next);
    setReady(false);
    if (Object.keys(next).length) {
      setMessage("A couple of details still need your attention.");
      return;
    }

    setSubmitting(true);
    setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website }),
      });
      const result: { error?: string; errors?: FormErrors } = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (result.errors) setErrors(result.errors);
        setMessage(result.error ?? "We couldn't send your message. Please try again.");
        return;
      }

      setValues(empty);
      setWebsite("");
      setMessage("Thanks — your message is with us. We'll reply soon.");
      setReady(true);
    } catch {
      setMessage("We couldn't reach the server. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const invalidCount = Object.keys(errors).length;

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="form-heading">
        <span className="form-heading-title">Project details</span>
        <span className="form-heading-dest">{RECIPIENT}</span>
      </div>

      <div className="field-group">
        <label htmlFor="contact-name">
          <span>Full name</span>
          <span className="required-star">*</span>
        </label>
        <div className="input-wrap">
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            placeholder="e.g. Sarah Jenkins"
          />
        </div>
        {errors.name && <p className="field-error" id="name-error">{errors.name}</p>}
      </div>

      <div className="fields-row">
        <div className="field-group">
          <label htmlFor="contact-email">
            <span>Email address</span>
            <span className="required-star">*</span>
          </label>
          <div className="input-wrap">
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={values.email}
              onChange={(event) => update("email", event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              placeholder="you@company.com"
            />
          </div>
          {errors.email && <p className="field-error" id="email-error">{errors.email}</p>}
        </div>

        <div className="field-group">
          <label htmlFor="contact-phone">
            <span>Phone number</span>
            <span className="required-star">*</span>
          </label>
          <div className="input-wrap">
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              value={values.phone}
              onChange={(event) => update("phone", event.target.value)}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              placeholder="+92 319 336 0773"
            />
          </div>
          {errors.phone && <p className="field-error" id="phone-error">{errors.phone}</p>}
        </div>
      </div>

      {/* Searchable service selection with clean text names */}
      <div className="field-group select-field-group" ref={dropdownRef}>
        <div className="service-group-head">
          <label id="contact-service-label">
            <span>Service interested in</span>
            <span className="required-star">*</span>
          </label>
          <span className="service-group-sub">Click to choose</span>
        </div>

        <div className="select-container">
          <button
            ref={triggerRef}
            type="button"
            id="contact-service-trigger"
            role="combobox"
            aria-expanded={serviceOpen}
            aria-haspopup="listbox"
            aria-controls="service-listbox"
            aria-labelledby="contact-service-label contact-service-trigger"
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? "service-error" : undefined}
            className={`input-wrap select-trigger${values.service ? " has-value" : ""}${serviceOpen ? " is-active" : ""}`}
            onClick={() => setServiceOpen(!serviceOpen)}
          >
            <span className={`select-trigger-label${!values.service ? " is-placeholder" : ""}`}>
              {values.service || "Select a service from the list..."}
            </span>

            <div className="select-trigger-actions">
              {values.service && (
                <span
                  role="button"
                  tabIndex={0}
                  className="select-trigger-clear"
                  onClick={(e) => {
                    e.stopPropagation();
                    update("service", "");
                    setServiceSearch("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.stopPropagation();
                      update("service", "");
                      setServiceSearch("");
                    }
                  }}
                  aria-label="Clear selected service"
                >
                  <X size={14} weight="bold" />
                </span>
              )}
              <CaretDown size={15} weight="bold" className={`select-chevron${serviceOpen ? " is-open" : ""}`} aria-hidden="true" />
            </div>
          </button>

          {/* Search form dropdown popover showing simple text names */}
          {serviceOpen && (
            <div className="select-dropdown" role="listbox" id="service-listbox" aria-label="Available services">
              <div className="select-search-wrap">
                <MagnifyingGlass size={16} className="select-search-icon" aria-hidden="true" />
                <input
                  ref={searchInputRef}
                  type="text"
                  className="select-search-input"
                  placeholder="Type to search services..."
                  value={serviceSearch}
                  onChange={(e) => setServiceSearch(e.target.value)}
                  aria-label="Filter services by name"
                />
                {serviceSearch && (
                  <button
                    type="button"
                    className="select-search-clear-btn"
                    onClick={() => {
                      setServiceSearch("");
                      searchInputRef.current?.focus();
                    }}
                    aria-label="Clear search text"
                  >
                    <X size={13} weight="bold" />
                  </button>
                )}
              </div>

              <div className="select-options-list">
                {filteredServices.length > 0 ? (
                  filteredServices.map((option) => {
                    const isSelected = values.service === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        className={`select-option-item${isSelected ? " is-selected" : ""}`}
                        onClick={() => {
                          update("service", option);
                          setServiceOpen(false);
                          setServiceSearch("");
                          triggerRef.current?.focus();
                        }}
                      >
                        <span className="select-option-text">{option}</span>
                        {isSelected && (
                          <Check size={16} weight="bold" className="select-option-check" aria-hidden="true" />
                        )}
                      </button>
                    );
                  })
                ) : (
                  <div className="select-empty">
                    <p className="select-empty-msg">No service matching &ldquo;{serviceSearch}&rdquo;</p>
                    <button
                      type="button"
                      className="select-empty-btn"
                      onClick={() => {
                        update("service", "Something else");
                        setServiceOpen(false);
                        setServiceSearch("");
                        triggerRef.current?.focus();
                      }}
                    >
                      Select &ldquo;Something else&rdquo;
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {errors.service && <p className="field-error" id="service-error">{errors.service}</p>}
      </div>

      <div className="field-group">
        <div className="details-group-head">
          <label htmlFor="contact-details">
            <span>Project details</span>
            <span className="required-star">*</span>
          </label>
          <span className="field-counter">{values.details.length} chars</span>
        </div>
        <div className="input-wrap">
          <textarea
            id="contact-details"
            name="details"
            rows={3}
            required
            value={values.details}
            onChange={(event) => update("details", event.target.value)}
            aria-invalid={Boolean(errors.details)}
            aria-describedby={errors.details ? "details-error" : "details-hint"}
            placeholder="Tell us what you're building, what problems it solves, and your estimated timeframe..."
          />
        </div>
        {errors.details ? (
          <p className="field-error" id="details-error">{errors.details}</p>
        ) : (
          <p className="field-hint" id="details-hint">The more context you give, the sharper our first proposal.</p>
        )}
      </div>

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>

      <button className="button button-submit" type="submit" disabled={submitting}>
        {submitting ? (
          <>
            <span>Sending your brief…</span>
            <CircleNotch size={17} className="submit-spinner" aria-hidden="true" />
          </>
        ) : invalidCount ? (
          <>
            <span>Check marked fields</span>
            <WarningCircle size={17} weight="bold" aria-hidden="true" />
          </>
        ) : (
          <>
            <span>Send project enquiry</span>
            <ArrowRight size={17} weight="bold" aria-hidden="true" />
          </>
        )}
      </button>

      {message && (
        <div className={`form-status${ready ? " is-ready" : " has-error"}`} role="status" aria-live="polite">
          {ready ? (
            <CheckCircle size={18} weight="fill" aria-hidden="true" />
          ) : (
            <WarningCircle size={18} weight="fill" aria-hidden="true" />
          )}
          <span>{message}</span>
        </div>
      )}

      <p className="form-setup">
        Direct inbox delivery. Need quick answers? <a className="form-direct" href={`mailto:${RECIPIENT}`}>Email {RECIPIENT}</a>.
      </p>
    </form>
  );
}
