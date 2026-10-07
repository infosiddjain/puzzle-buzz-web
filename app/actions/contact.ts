"use server";

import { CONTACT_TOPICS, validateContact, type ContactInput, type ContactResult } from "../contact/validation";

const ENDPOINT = "https://hub-form.vercel.app/api/f/LeFXDvV3TeH5";

export async function sendContact(input: ContactInput & { _gotcha?: string }): Promise<ContactResult> {
  // Spam trap: real visitors never fill the hidden field. Pretend it worked.
  if (input._gotcha) return { ok: true };

  const data: ContactInput = {
    name: String(input.name ?? "").trim(),
    email: String(input.email ?? "").trim(),
    topic: String(input.topic ?? ""),
    message: String(input.message ?? "").trim(),
  };
  if (!CONTACT_TOPICS.includes(data.topic)) data.topic = "Other";

  // Never trust the client: validate again on the server.
  const fieldErrors = validateContact(data);
  if (Object.keys(fieldErrors).length) {
    return { ok: false, error: "Please fix the highlighted fields.", fieldErrors };
  }

  const key = process.env.HUB_KEY;
  if (!key) {
    console.error("HUB_KEY is not set");
    return { ok: false, error: "The contact form isn't configured yet. Please email us instead." };
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({ ...data, source: "Puzzle Buzz website" }),
      cache: "no-store",
    });
    const json = (await res.json().catch(() => null)) as
      | { ok: boolean; error?: string; field?: string; code?: string }
      | null;

    if (json?.ok) return { ok: true };

    const error = json?.error ?? "Something went wrong. Please try again in a moment.";
    const field = json?.field as keyof ContactInput | undefined;
    return { ok: false, error, fieldErrors: field ? { [field]: error } : undefined };
  } catch (err) {
    console.error("Contact form request failed", err);
    return { ok: false, error: "Couldn't reach the server. Check your connection and try again." };
  }
}
