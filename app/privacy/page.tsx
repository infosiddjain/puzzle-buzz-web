import type { Metadata } from "next";
import Link from "next/link";
import { mdiArrowLeft, mdiShieldCheck } from "@mdi/js";
import Icon from "../Icon";
import { SITE, SiteFooter, SiteHeader } from "../site";

export const metadata: Metadata = {
  title: "Privacy Policy — Puzzle Buzz",
  description: "How Puzzle Buzz handles your data: no accounts, no ads, no tracking.",
};

const SECTIONS = [
  {
    title: "1. Information we store",
    body: "To save your progress, Puzzle Buzz keeps the following on your device only:",
    bullets: [
      "Your chosen player name and avatar",
      "Coins, XP, level, stars and achievements",
      "Game statistics such as games played and accuracy",
      "Your settings and favourite puzzle types",
    ],
  },
  {
    title: "2. What we don’t collect",
    body: "We do not collect, upload or sell personal data. The app has no user accounts, no advertising SDKs and no analytics or tracking tools. We never access your contacts, location, camera or photos.",
  },
  {
    title: "3. When you contact us",
    body: "The contact form opens your own email app with your message pre-filled. Nothing is sent until you choose to send it. We only use your email address to reply to you and never add it to mailing lists.",
  },
  {
    title: "4. Children’s privacy",
    body: "Puzzle Buzz is suitable for all ages. Because we don’t collect personal information, no personal data from children is gathered through the app.",
  },
  {
    title: "5. Your control",
    body: "You can erase your saved progress at any time from Profile › Reset progress. Uninstalling the app also removes all data stored by it.",
  },
  {
    title: "6. Changes to this policy",
    body: "If we update this policy, we will change the date at the top of this page. Significant changes will be highlighted inside the app.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.3),transparent_65%)]" />
        <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-bold text-dim hover:text-white">
            <Icon path={mdiArrowLeft} className="h-4 w-4" />
            Back to home
          </Link>
          <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.2em] text-gold">Privacy policy</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Your data stays yours</h1>
          <p className="mt-4 text-lg text-dim">Last updated {SITE.policyUpdated}</p>

          <div className="mt-10 flex items-center gap-4 rounded-3xl border border-success/35 bg-success/10 p-6">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-success/20 text-success">
              <Icon path={mdiShieldCheck} className="h-8 w-8" />
            </span>
            <div>
              <h2 className="text-lg font-extrabold">Privacy in short</h2>
              <p className="text-dim">No accounts. No ads. No tracking. Your progress stays on your device.</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {SECTIONS.map(s => (
              <section key={s.title} className="rounded-3xl border border-white/10 bg-surface p-6">
                <h2 className="text-lg font-extrabold">{s.title}</h2>
                <p className="mt-2 text-dim">{s.body}</p>
                {s.bullets && (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-dim marker:text-primary">
                    {s.bullets.map(b => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <section className="rounded-3xl border border-white/10 bg-surface p-6">
              <h2 className="text-lg font-extrabold">7. Contact</h2>
              <p className="mt-2 text-dim">
                Questions about privacy? Email us at{" "}
                <a href={`mailto:${SITE.supportEmail}`} className="font-bold text-gold">
                  {SITE.supportEmail}
                </a>{" "}
                or use the{" "}
                <Link href="/contact" className="font-bold text-gold">
                  contact form
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
