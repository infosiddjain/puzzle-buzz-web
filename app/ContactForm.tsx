"use client";

import { useState, type FormEvent } from "react";
import { mdiCheckCircle } from "@mdi/js";
import Icon from "./Icon";

const TOPICS = ["Feedback", "Bug report", "Puzzle idea", "Other"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm({ supportEmail }: { supportEmail: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Please tell us your name";
    if (!EMAIL_RE.test(email.trim())) e.email = "Please enter a valid email address";
    if (message.trim().length < 10) e.message = "Your message should be at least 10 characters";
    setErrors(e);
    if (Object.keys(e).length) return;

    const subject = encodeURIComponent(`[Puzzle Buzz] ${topic}`);
    const body = encodeURIComponent(`${message.trim()}\n\n— ${name.trim()} (${email.trim()})`);
    window.location.href = `mailto:${supportEmail}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-3xl border border-success/40 bg-success/10 p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/20 text-success">
          <Icon path={mdiCheckCircle} className="h-10 w-10" />
        </div>
        <h3 className="mt-4 text-2xl font-extrabold">Thanks, {name.trim()}!</h3>
        <p className="mt-2 text-dim">
          Your email app should open with your message ready to send. If it didn&apos;t, write to us at{" "}
          <a className="font-bold text-gold" href={`mailto:${supportEmail}`}>
            {supportEmail}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setMessage("");
          }}
          className="mt-6 rounded-full border border-white/15 px-5 py-2 font-bold hover:bg-white/5"
        >
          Send another message
        </button>
      </div>
    );
  }

  const field =
    "mt-2 w-full rounded-2xl border bg-bg-alt px-4 py-3 text-white placeholder:text-muted outline-none focus:border-primary";

  return (
    <form onSubmit={submit} noValidate className="rounded-3xl border border-white/10 bg-surface p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-bold text-dim">
          Name
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
            className={`${field} ${errors.name ? "border-error" : "border-white/10"}`}
          />
          {errors.name && <span className="mt-1 block text-xs text-error">{errors.name}</span>}
        </label>
        <label className="block text-sm font-bold text-dim">
          Email
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={`${field} ${errors.email ? "border-error" : "border-white/10"}`}
          />
          {errors.email && <span className="mt-1 block text-xs text-error">{errors.email}</span>}
        </label>
      </div>

      <fieldset className="mt-5">
        <legend className="text-sm font-bold text-dim">Topic</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {TOPICS.map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setTopic(t)}
              aria-pressed={topic === t}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                topic === t
                  ? "border-primary bg-primary/20 text-white"
                  : "border-white/10 text-dim hover:bg-white/5"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="mt-5 block text-sm font-bold text-dim">
        Message
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows={5}
          placeholder="Tell us what's on your mind…"
          className={`${field} resize-y ${errors.message ? "border-error" : "border-white/10"}`}
        />
        {errors.message && <span className="mt-1 block text-xs text-error">{errors.message}</span>}
      </label>

      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#C026D3] px-6 py-3.5 text-lg font-extrabold shadow-lg shadow-primary/30 transition hover:brightness-110"
      >
        Send message
      </button>
    </form>
  );
}
