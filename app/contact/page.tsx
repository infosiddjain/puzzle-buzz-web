import type { Metadata } from "next";
import Link from "next/link";
import { mdiArrowLeft, mdiBug, mdiEmail, mdiLightbulbOn, mdiTimerSand } from "@mdi/js";
import Icon from "../Icon";
import { SITE, SiteFooter, SiteHeader } from "../site";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — Puzzle Buzz",
  description: "Feedback, a bug, or an idea for a new puzzle? Send the Puzzle Buzz team a message.",
};

const REASONS = [
  { icon: mdiLightbulbOn, color: "#FBBF24", title: "Puzzle ideas", text: "Suggest a riddle, category or game mode." },
  { icon: mdiBug, color: "#F43F5E", title: "Bug reports", text: "Tell us what happened and on which device." },
];

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.3),transparent_65%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-bold text-dim hover:text-white">
            <Icon path={mdiArrowLeft} className="h-4 w-4" />
            Back to home
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-gold">Contact us</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">We’d love to hear from you</h1>
              <p className="mt-4 text-lg text-dim">
                Feedback, a bug, or an idea for a new puzzle? Send us a message and we’ll get back to you.
              </p>

              <div className="mt-8 space-y-3">
                <a
                  href={`mailto:${SITE.supportEmail}`}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-surface p-4 transition hover:border-white/20"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary">
                    <Icon path={mdiEmail} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-bold uppercase tracking-wider text-muted">Email</span>
                    <span className="block truncate font-bold">{SITE.supportEmail}</span>
                  </span>
                </a>
                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-surface p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan/20 text-cyan">
                    <Icon path={mdiTimerSand} />
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-wider text-muted">Response time</span>
                    <span className="font-bold">Usually within 48 hours</span>
                  </span>
                </div>
                {REASONS.map(r => (
                  <div key={r.title} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-surface p-4">
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${r.color}22`, color: r.color }}
                    >
                      <Icon path={r.icon} />
                    </span>
                    <span>
                      <span className="block font-bold">{r.title}</span>
                      <span className="text-sm text-dim">{r.text}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
