"use client";

import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { sendContactMail } from "@/lib/contact-mail";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { LocalizedTransition } from "@/components/ui/LocalizedTransition";
import { StaggerWords } from "@/components/ui/StaggerWords";

type ContactItem = {
  label: string;
  value: string;
  href?: string;
};

type VolunteerItem = {
  org: string;
  role: string;
  location: string;
  period: string;
  bullets?: string[];
};

type FormState = {
  name: string;
  email: string;
  message: string;
};

export function ContactSection() {
  const { t } = useTranslation();
  const contacts = t("contacts", { returnObjects: true }) as ContactItem[];
  const languages = t("languages", { returnObjects: true }) as string[];
  const volunteer = t("volunteer", { returnObjects: true }) as VolunteerItem[];

  const [formState, setFormState] = useState<FormState>({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setFeedback({ type: "error", text: t("contact.feedback.required") });
      return;
    }

    setSubmitting(true);
    setFeedback(null);

    try {
      await sendContactMail({
        name: formState.name,
        email: formState.email,
        message: formState.message
      });

      setFeedback({ type: "success", text: t("contact.feedback.success") });
      setFormState({ name: "", email: "", message: "" });
    } catch {
      setFeedback({ type: "error", text: t("contact.feedback.error") });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" data-section-id="contact" className="section-shell min-h-screen pb-44">
      <div className="ghost-word">CONTACT</div>

      <div className="content-wrap relative z-10">
        <h2 className="section-title">
          <StaggerWords text={t("sectionTitles.contact")} />
        </h2>

        <LocalizedTransition id="contact-grid">
          <div className="mt-8 grid gap-4 xl:grid-cols-2">
            <GlassPanel className="p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/90">{t("contact.direct")}</p>
              <h3 className="mt-2 font-sans text-2xl font-semibold text-[var(--text-primary)]">{t("contact.lead")}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{t("contact.desc")}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {contacts.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href?.startsWith("http") ? "_blank" : undefined}
                    rel={item.href?.startsWith("http") ? "noreferrer" : undefined}
                    className="glass-chip"
                  >
                    <span className="block text-[10px] uppercase tracking-[0.18em] text-cyan-300/85">{item.label}</span>
                    <span className="mt-1 block text-sm text-[var(--text-primary)]">{item.value}</span>
                  </a>
                ))}
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <div>
                  <h4 className="font-sans text-sm uppercase tracking-[0.14em] text-[var(--text-primary)]">{t("contact.labels.languages")}</h4>
                  <ul className="mt-2 space-y-2">
                    {languages.map((item) => (
                      <li key={item} className="text-sm text-[var(--text-muted)]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-sans text-sm uppercase tracking-[0.14em] text-[var(--text-primary)]">{t("contact.labels.volunteer")}</h4>
                  {volunteer.map((item) => (
                    <div key={`${item.org}-${item.period}`} className="mt-2">
                      <p className="text-sm font-semibold text-[var(--text-primary)]">{item.org}</p>
                      <p className="text-sm text-[var(--text-muted)]">{item.role}</p>
                      <p className="text-xs text-[var(--text-muted)]">{item.period}</p>
                    </div>
                  ))}
                </div>
              </div>
            </GlassPanel>

            <GlassPanel className="p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/90">{t("contact.send")}</p>
              <form onSubmit={onSubmit} className="mt-4 space-y-3">
                <input
                  type="text"
                  name="name"
                  placeholder={t("contact.placeholders.name")}
                  value={formState.name}
                  onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
                  className="contact-input"
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder={t("contact.placeholders.email")}
                  value={formState.email}
                  onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
                  className="contact-input"
                  required
                />

                <textarea
                  name="message"
                  placeholder={t("contact.placeholders.message")}
                  value={formState.message}
                  onChange={(event) => setFormState((prev) => ({ ...prev, message: event.target.value }))}
                  className="contact-input min-h-[160px] resize-none"
                  required
                />

                <button type="submit" disabled={submitting} className="contact-button">
                  {submitting ? t("contact.button.sending") : t("contact.button.send")}
                </button>
              </form>

              {feedback ? (
                <p className={`mt-3 text-sm ${feedback.type === "success" ? "text-emerald-300" : "text-rose-300"}`}>
                  {feedback.text}
                </p>
              ) : null}
            </GlassPanel>
          </div>
        </LocalizedTransition>
      </div>
    </section>
  );
}
