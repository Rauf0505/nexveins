"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { X } from "@phosphor-icons/react";
import { ContactForm } from "@/components/contact-form";

const EnquiryContext = createContext<() => void>(() => {});

export function useEnquiry() {
  return useContext(EnquiryContext);
}

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openerRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const show = useCallback(() => {
    openerRef.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  useEffect(() => {
    if (open) closeRef.current?.focus();
    else openerRef.current?.focus();
  }, [open]);

  const value = useMemo(() => show, [show]);

  return (
    <EnquiryContext.Provider value={value}>
      {children}
      {/* Sits at the end of the body rather than inside a Reveal: a reveal animates
          with a transform, and a transformed ancestor would capture this fixed layer. */}
      <div
        className={`enquiry-popup${open ? " is-open" : ""}`}
        id="enquiry-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
      >
        <div className="enquiry-panel">
          <div className="enquiry-head">
            <p className="eyebrow"><span className="eyebrow-mark" /> Enquiry</p>
            <button
              type="button"
              className="enquiry-close"
              ref={closeRef}
              onClick={() => setOpen(false)}
              aria-label="Close enquiry form"
            >
              <X size={16} weight="bold" aria-hidden="true" />
            </button>
          </div>
          <h3 className="enquiry-title" id="enquiry-title">Start a project</h3>
          <ContactForm />
        </div>
      </div>
    </EnquiryContext.Provider>
  );
}
