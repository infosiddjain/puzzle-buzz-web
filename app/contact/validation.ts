// Shared by the contact form (instant feedback) and the server action (source of truth).

export const CONTACT_TOPICS = ["Feedback", "Bug report", "Puzzle idea", "Other"];

export const LIMITS = { nameMin: 2, nameMax: 60, messageMin: 10, messageMax: 2000 };

export type ContactInput = { name: string; email: string; topic: string; message: string };
export type FieldErrors = Partial<Record<keyof ContactInput, string>>;
export type ContactResult = { ok: true } | { ok: false; error: string; fieldErrors?: FieldErrors };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact({ name, email, message }: ContactInput): FieldErrors {
  const e: FieldErrors = {};
  const n = name.trim();
  const m = message.trim();

  if (!n) e.name = "Please tell us your name";
  else if (n.length < LIMITS.nameMin) e.name = `Name must be at least ${LIMITS.nameMin} characters`;
  else if (n.length > LIMITS.nameMax) e.name = `Name must be under ${LIMITS.nameMax} characters`;

  if (!email.trim()) e.email = "Please enter your email address";
  else if (!EMAIL_RE.test(email.trim())) e.email = "Please enter a valid email address";

  if (!m) e.message = "Please write a message";
  else if (m.length < LIMITS.messageMin) e.message = `Message should be at least ${LIMITS.messageMin} characters`;
  else if (m.length > LIMITS.messageMax) e.message = `Message must be under ${LIMITS.messageMax} characters`;

  return e;
}
