"use client";

import { useState, useTransition, type FormEvent } from "react";
import { mdiCheckCircle, mdiLoading, mdiSend } from "@mdi/js";
import { sendContact } from "../actions/contact";
import Icon from "../Icon";
import { Toast, useToast } from "../Toast";
import { CONTACT_TOPICS, LIMITS, validateContact, type ContactInput, type FieldErrors } from "./validation";

const EMPTY: ContactInput = { name: "", email: "", topic: CONTACT_TOPICS[0], message: "" };

export default function ContactForm() {
  const [values, setValues] = useState<ContactInput>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<keyof ContactInput, boolean>>>({});
  const [serverErrors, setServerErrors] = useState<FieldErrors>({});
  const [gotcha, setGotcha] = useState("");
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const { toast, show, dismiss } = useToast();

  const clientErrors = validateContact(values);
  const errorFor = (k: keyof ContactInput) => serverErrors[k] ?? (touched[k] ? clientErrors[k] : undefined);

  const set = (k: keyof ContactInput) => (v: string) => {
    setValues(prev => ({ ...prev, [k]: v }));
    if (serverErrors[k]) setServerErrors(prev => ({ ...prev, [k]: undefined }));
  };
  const blur = (k: keyof ContactInput) => () => setTouched(prev => ({ ...prev, [k]: true }));

  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(clientErrors).length) {
      show({ type: "error", title: "Please check the form", message: "Some fields need your attention." });
      return;
    }

    startTransition(async () => {
      const res = await sendContact({ ...values, _gotcha: gotcha });
      if (res.ok) {
        setSentTo(values.name.trim());
        setValues(EMPTY);
        setTouched({});
        setServerErrors({});
        show({ type: "success", title: "Message sent!", message: "Thanks for reaching out. We'll reply soon." });
      } else {
        setServerErrors(res.fieldErrors ?? {});
        show({ type: "error", title: "Couldn't send message", message: res.error });
      }
    });
  };

  const field =
    "mt-2 w-full rounded-2xl border bg-bg-alt px-4 py-3 text-white placeholder:text-muted outline-none transition focus:border-primary disabled:opacity-60";
  const border = (k: keyof ContactInput) => (errorFor(k) ? "border-error" : "border-white/10");
  const msgLen = values.message.trim().length;

  return (
    <>
      <Toast toast={toast} onClose={dismiss} />

      {sentTo !== null ? (
        <div className="rounded-3xl border border-success/40 bg-success/10 p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/20 text-success">
            <Icon path={mdiCheckCircle} className="h-10 w-10" />
          </div>
          <h3 className="mt-4 text-2xl font-extrabold">Thanks, {sentTo}!</h3>
          <p className="mt-2 text-dim">Your message has been sent. We usually reply within 48 hours.</p>
          <button
            type="button"
            onClick={() => setSentTo(null)}
            className="mt-6 rounded-full border border-white/15 px-5 py-2 font-bold hover:bg-white/5"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="rounded-3xl border border-white/10 bg-surface p-6 sm:p-8">
          {/* Spam trap: hidden from people, bots fill it */}
          <input
            type="text"
            name="_gotcha"
            value={gotcha}
            onChange={e => setGotcha(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-bold text-dim">
              Name <span className="text-error">*</span>
              <input
                name="name"
                value={values.name}
                onChange={e => set("name")(e.target.value)}
                onBlur={blur("name")}
                maxLength={LIMITS.nameMax}
                autoComplete="name"
                placeholder="Your name"
                disabled={pending}
                aria-invalid={!!errorFor("name")}
                className={`${field} ${border("name")}`}
              />
              {errorFor("name") && <span className="mt-1 block text-xs text-error">{errorFor("name")}</span>}
            </label>
            <label className="block text-sm font-bold text-dim">
              Email <span className="text-error">*</span>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={e => set("email")(e.target.value)}
                onBlur={blur("email")}
                autoComplete="email"
                placeholder="you@example.com"
                disabled={pending}
                aria-invalid={!!errorFor("email")}
                className={`${field} ${border("email")}`}
              />
              {errorFor("email") && <span className="mt-1 block text-xs text-error">{errorFor("email")}</span>}
            </label>
          </div>

          <fieldset className="mt-5" disabled={pending}>
            <legend className="text-sm font-bold text-dim">Topic</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {CONTACT_TOPICS.map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => set("topic")(t)}
                  aria-pressed={values.topic === t}
                  className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                    values.topic === t
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
            Message <span className="text-error">*</span>
            <textarea
              name="message"
              value={values.message}
              onChange={e => set("message")(e.target.value)}
              onBlur={blur("message")}
              rows={6}
              maxLength={LIMITS.messageMax}
              placeholder="Tell us what's on your mind…"
              disabled={pending}
              aria-invalid={!!errorFor("message")}
              className={`${field} resize-y ${border("message")}`}
            />
            <span className="mt-1 flex justify-between gap-4 text-xs">
              <span className="text-error">{errorFor("message")}</span>
              <span className={msgLen < LIMITS.messageMin ? "text-muted" : "text-dim"}>
                {msgLen}/{LIMITS.messageMax}
              </span>
            </span>
          </label>

          <button
            type="submit"
            disabled={pending}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#C026D3] px-6 py-3.5 text-lg font-extrabold shadow-lg shadow-primary/30 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Icon path={pending ? mdiLoading : mdiSend} className={`h-5 w-5 ${pending ? "animate-spin" : ""}`} />
            {pending ? "Sending…" : "Send message"}
          </button>
        </form>
      )}
    </>
  );
}
