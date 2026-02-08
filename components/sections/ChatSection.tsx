"use client";

import { FormEvent, useState } from "react";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { sendContactMail } from "@/lib/contact-mail";
import type { ChatCopy } from "@/lib/pdf-content";

type ChatSectionProps = {
  title: string;
  chat: ChatCopy;
};

type ChatRole = "bot" | "user";

type ChatMessage = {
  sender: ChatRole;
  text: string;
};

type ChatFormState = { name: string; email: string; message: string };

export function ChatSection({ title, chat }: ChatSectionProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([{ sender: "bot", text: chat.greeting }]);
  const [formState, setFormState] = useState<ChatFormState>({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const pushBotMessage = (text: string) => {
    setMessages((prev) => [...prev, { sender: "bot", text }]);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      name: formState.name.trim(),
      email: formState.email.trim(),
      message: formState.message.trim()
    };

    if (!payload.name || !payload.email || !payload.message) {
      pushBotMessage(chat.feedback.required);
      return;
    }

    setMessages((prev) => [...prev, { sender: "user", text: payload.message }]);
    setFormState((prev) => ({ ...prev, message: "" }));
    setSubmitting(true);

    try {
      await sendContactMail(payload);
      pushBotMessage(chat.feedback.success);
    } catch {
      pushBotMessage(chat.feedback.error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <header className="section-head">
        <h2>{title}</h2>
      </header>

      <div className="chat-grid single-col">
        <PremiumCard className="chat-shell" as="div" sheen={false}>
          <div className="chat-header">
            <p className="mini-kicker">{chat.title}</p>
            <p>{chat.subtitle}</p>
          </div>

          <div className="chat-log" role="log" aria-live="polite">
            {messages.map((message, index) => (
              <div key={`${message.sender}-${index}-${message.text.slice(0, 24)}`} className={`chat-bubble chat-bubble-${message.sender}`}>
                {message.text}
              </div>
            ))}
          </div>

          <form className="chat-form" onSubmit={onSubmit}>
            <div className="chat-form-row">
              <input
                value={formState.name}
                onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
                className="chat-input"
                type="text"
                aria-label={chat.placeholders.name}
                placeholder={chat.placeholders.name}
                autoComplete="name"
                required
              />
              <input
                value={formState.email}
                onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
                className="chat-input"
                type="email"
                aria-label={chat.placeholders.email}
                placeholder={chat.placeholders.email}
                autoComplete="email"
                required
              />
            </div>

            <textarea
              value={formState.message}
              onChange={(event) => setFormState((prev) => ({ ...prev, message: event.target.value }))}
              className="chat-input chat-textarea"
              aria-label={chat.placeholders.message}
              placeholder={chat.placeholders.message}
              rows={3}
              required
            />

            <button className="chat-send" type="submit" disabled={submitting}>
              {submitting ? chat.sending : chat.send}
            </button>
          </form>
        </PremiumCard>
      </div>
    </>
  );
}
