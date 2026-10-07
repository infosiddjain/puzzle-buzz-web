import Image from "next/image";
import Link from "next/link";
import {
  mdiAccountGroup,
  mdiAlphabeticalVariant,
  mdiArrowRight,
  mdiBank,
  mdiBrain,
  mdiCalculatorVariant,
  mdiCards,
  mdiChartTimelineVariant,
  mdiCircleMultiple,
  mdiEarth,
  mdiEmail,
  mdiEmoticonHappy,
  mdiFire,
  mdiFlask,
  mdiHeadQuestion,
  mdiHeart,
  mdiLightbulbOn,
  mdiLock,
  mdiOpenInNew,
  mdiPuzzle,
  mdiRocketLaunch,
  mdiSchool,
  mdiSkull,
  mdiSprout,
  mdiTarget,
} from "@mdi/js";
import Icon from "./Icon";
import { SITE, SiteFooter, SiteHeader } from "./site";

const CATEGORIES = [
  { icon: mdiHeadQuestion, title: "Riddles", subtitle: "Think outside the box", from: "#8B5CF6", to: "#6366F1",
    text: "Classic brain teasers that twist words and meaning. The obvious answer is rarely the right one." },
  { icon: mdiBrain, title: "Logic Lab", subtitle: "Deduce like a detective", from: "#EC4899", to: "#F43F5E",
    text: "Puzzles of reasoning, deduction and lateral thinking. Every clue matters." },
  { icon: mdiCalculatorVariant, title: "Math Mania", subtitle: "Fast mental arithmetic", from: "#F59E0B", to: "#EF4444",
    text: "Endless freshly generated sums. Sharpen your mental maths and beat the clock." },
  { icon: mdiChartTimelineVariant, title: "Number Patterns", subtitle: "Find what comes next", from: "#10B981", to: "#0D9488",
    text: "Spot the hidden rule behind each sequence, from famous maths to nature." },
  { icon: mdiAlphabeticalVariant, title: "Word Scramble", subtitle: "Unjumble the letters", from: "#06B6D4", to: "#3B82F6",
    text: "Use the clue, tap the tiles in order and rebuild the hidden word." },
  { icon: mdiCards, title: "Memory Match", subtitle: "Flip and find pairs", from: "#F97316", to: "#DB2777",
    text: "Match the pairs in as few moves as possible. A workout for your memory." },
  { icon: mdiEarth, title: "General Knowledge", subtitle: "The world in questions", from: "#3B82F6", to: "#8B5CF6",
    text: "Geography, culture and everyday wonders — a surprising fact with every answer." },
  { icon: mdiFlask, title: "Science Lab", subtitle: "How the world works", from: "#14B8A6", to: "#22C55E",
    text: "Biology, chemistry and physics made fun." },
  { icon: mdiBank, title: "History Hunt", subtitle: "Travel through time", from: "#EAB308", to: "#EA580C",
    text: "Ancient wonders, great inventions and the people who shaped our world." },
  { icon: mdiRocketLaunch, title: "Space Explorer", subtitle: "Planets, stars & beyond", from: "#6366F1", to: "#0EA5E9",
    text: "Blast off through the solar system and discover the record-breakers of the universe." },
];

const STEPS = [
  "Choose a category, or let Quick Play pick one for you.",
  "Pick a difficulty: Easy, Medium or Hard.",
  "Answer before the timer runs out. Quizzes give you 3 lives.",
  "Read the “Did you know?” fact and keep learning.",
  "Collect coins, XP and stars at the end of every round.",
];

const DIFFICULTIES = [
  { icon: mdiSprout, label: "Easy", color: "#22C55E", seconds: 25, mult: "×1" },
  { icon: mdiFire, label: "Medium", color: "#F59E0B", seconds: 18, mult: "×1.5" },
  { icon: mdiSkull, label: "Hard", color: "#F43F5E", seconds: 12, mult: "×2" },
];

const REWARDS = [
  ["Correct answer", "10–20"],
  ["Streak bonus (3+ in a row)", "up to +10"],
  ["Perfect round", "+50"],
  ["Daily reward", "20–200"],
  ["Achievements", "25–150"],
];

const POWER_UPS = [
  ["50 : 50 — remove two wrong answers", "20"],
  ["+10 seconds on the clock", "15"],
  ["Reveal a letter (Word Scramble)", "15"],
  ["Peek at all cards (Memory Match)", "25"],
];

const VALUES = [
  { icon: mdiSchool, color: "#8B5CF6", title: "Learning first", text: "Every puzzle teaches something real." },
  { icon: mdiEmoticonHappy, color: "#FBBF24", title: "Pure fun", text: "Short rounds, big smiles, no pressure." },
  { icon: mdiLock, color: "#22C55E", title: "Privacy", text: "No accounts, no tracking, no ads." },
  { icon: mdiAccountGroup, color: "#22D3EE", title: "For everyone", text: "Friendly for curious minds of all ages." },
];

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-gold">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-lg text-dim">{text}</p>}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="top">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.35),transparent_60%)]" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28">
            <div className="text-center md:text-left">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-bold text-dim">
                <Icon path={mdiPuzzle} className="h-4 w-4 text-gold" />
                A mind puzzle game for everyone
              </p>
              <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight sm:text-6xl">
                Train your brain.
                <br />
                <span className="bg-gradient-to-r from-[#A78BFA] via-accent to-gold bg-clip-text text-transparent">
                  Feed your mind.
                </span>
              </h1>
              <p className="mt-6 text-lg text-dim">
                Solve riddles, crack logic problems, spot number patterns, unscramble words and test your
                memory — and learn a real-world fact with every answer.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
                <a
                  href="#games"
                  className="rounded-full bg-gradient-to-r from-[#7C3AED] to-[#C026D3] px-7 py-3.5 text-lg font-extrabold shadow-lg shadow-primary/30 transition hover:brightness-110"
                >
                  Explore the games
                </a>
                <a
                  href="#how"
                  className="rounded-full border border-white/15 px-7 py-3.5 text-lg font-extrabold transition hover:bg-white/5"
                >
                  How it works
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/logo.png"
                alt="Puzzle Buzz logo"
                width={320}
                height={320}
                priority
                className="animate-float w-56 drop-shadow-[0_20px_60px_rgba(139,92,246,0.55)] sm:w-72"
              />
            </div>
          </div>

          <div className="relative mx-auto grid max-w-4xl grid-cols-3 gap-3 px-4 pb-20 sm:gap-6 sm:px-6">
            {[
              ["10", "Categories"],
              ["110+", "Questions"],
              ["∞", "Math puzzles"],
            ].map(([v, l]) => (
              <div key={l} className="rounded-3xl border border-white/10 bg-surface py-6 text-center">
                <div className="text-3xl font-black text-gold sm:text-4xl">{v}</div>
                <div className="mt-1 text-xs font-bold text-muted sm:text-sm">{l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Games */}
        <section id="games" className="bg-bg-alt py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Puzzle categories"
              title="Ten ways to test your mind"
              text="Brain teasers, knowledge quizzes, word games and memory challenges — all in one place."
            />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CATEGORIES.map(c => (
                <article
                  key={c.title}
                  className="group rounded-3xl border border-white/10 bg-surface p-6 transition hover:-translate-y-1 hover:border-white/20"
                >
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg"
                    style={{ backgroundImage: `linear-gradient(135deg, ${c.from}, ${c.to})` }}
                  >
                    <Icon path={c.icon} className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-xl font-extrabold">{c.title}</h3>
                  <p className="text-sm font-bold" style={{ color: c.from }}>
                    {c.subtitle}
                  </p>
                  <p className="mt-2 text-dim">{c.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How to play */}
        <section id="how" className="py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading eyebrow="How to play" title="Quick rounds, big rewards" />
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-surface p-6 sm:p-8">
                <h3 className="text-xl font-extrabold">Five simple steps</h3>
                <ol className="mt-5 space-y-4">
                  {STEPS.map((s, i) => (
                    <li key={s} className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 font-black text-primary">
                        {i + 1}
                      </span>
                      <span className="pt-1 text-dim">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-3xl border border-white/10 bg-surface p-6 sm:p-8">
                <h3 className="text-xl font-extrabold">Difficulty levels</h3>
                <div className="mt-5 space-y-3">
                  {DIFFICULTIES.map(d => (
                    <div key={d.label} className="flex items-center gap-4 rounded-2xl bg-white/5 p-4">
                      <span style={{ color: d.color }}>
                        <Icon path={d.icon} className="h-7 w-7" />
                      </span>
                      <span className="w-20 font-extrabold" style={{ color: d.color }}>
                        {d.label}
                      </span>
                      <span className="text-sm text-dim">
                        {d.seconds}s per question · {d.mult} coins
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-sm text-dim">
                  Score 30% for 1 star, 60% for 2 stars and 90% or more for 3 stars. Earn XP every round and
                  level up from Curious Mind all the way to Legend.
                </p>
              </div>

              <PriceList icon={mdiCircleMultiple} title="Coins & rewards" rows={REWARDS} />
              <PriceList icon={mdiLightbulbOn} title="Power-ups" rows={POWER_UPS} />
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="bg-bg-alt py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="About us"
              title="We believe learning should feel like play"
              text="Puzzle Buzz turns spare minutes into brain-boosting moments — a place where puzzles sharpen your thinking and every answer leaves you a little wiser."
            />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {VALUES.map(v => (
                <div key={v.title} className="rounded-3xl border border-white/10 bg-surface p-6">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: `${v.color}22`, color: v.color }}
                  >
                    <Icon path={v.icon} className="h-7 w-7" />
                  </div>
                  <h3 className="mt-3 text-lg font-extrabold">{v.title}</h3>
                  <p className="mt-1 text-sm text-dim">{v.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-surface p-6 sm:p-8">
                <h3 className="flex items-center gap-2 text-xl font-extrabold">
                  <Icon path={mdiTarget} className="h-6 w-6 text-gold" />
                  Our mission
                </h3>
                <p className="mt-3 text-dim">
                  To make everyday brain training fun, fair and genuinely educational. We hand-pick every
                  riddle, fact and pattern so you can trust what you learn — and enjoy learning it.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-surface p-6 sm:p-8">
                <h3 className="flex items-center gap-2 text-xl font-extrabold">
                  <Icon path={mdiHeart} className="h-6 w-6 text-error" />
                  Made with care
                </h3>
                <p className="mt-3 text-dim">
                  Puzzle Buzz is designed and developed by Siddharth Jain, a lifelong puzzle lover. Every
                  message is read — if you have an idea for a new puzzle, get in touch below.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Developer */}
        <section id="developer" className="py-20 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <SectionHeading eyebrow="Meet the developer" title="Built by Siddharth Jain" />
            <div className="mt-12 flex flex-col items-center gap-8 rounded-3xl border border-white/10 bg-surface p-6 text-center sm:p-10 md:flex-row md:text-left">
              <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#C026D3] text-4xl font-black shadow-lg shadow-primary/30">
                SJ
              </div>
              <div>
                <h3 className="text-2xl font-extrabold">{SITE.developer}</h3>
                <p className="font-bold text-gold">Full Stack Developer · Software Engineer</p>
                <p className="mt-4 text-dim">
                  Siddharth has 5+ years of hands-on experience building scalable web and mobile apps with
                  React, React Native, Node.js and MongoDB. Siddharth designed and built Puzzle Buzz end to end — from
                  the puzzles and game logic to the look and feel — to make brain training fun for everyone.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
                  {["React Native", "React", "Next.js", "TypeScript", "Node.js", "MongoDB", "Figma"].map(t => (
                    <span key={t} className="rounded-full bg-white/5 px-3 py-1 text-xs font-bold text-dim">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
                  {[
                    ["Portfolio", SITE.developerUrl],
                    ["GitHub", SITE.developerGithub],
                    ["LinkedIn", SITE.developerLinkedin],
                  ].map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-5 py-2 text-sm font-extrabold transition hover:bg-white/5"
                    >
                      {label}
                      <Icon path={mdiOpenInNew} className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="bg-bg-alt py-20 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-surface p-8 text-center sm:p-10 md:flex-row md:text-left">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#C026D3]">
                <Icon path={mdiEmail} className="h-8 w-8" />
              </span>
              <div className="flex-1">
                <h2 className="text-2xl font-black tracking-tight sm:text-3xl">We’d love to hear from you</h2>
                <p className="mt-2 text-dim">Feedback, a bug, or an idea for a new puzzle? Send us a message.</p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#C026D3] px-7 py-3.5 font-extrabold shadow-lg shadow-primary/30 transition hover:brightness-110"
              >
                Contact us
                <Icon path={mdiArrowRight} className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

function PriceList({ icon, title, rows }: { icon: string; title: string; rows: string[][] }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-surface p-6 sm:p-8">
      <h3 className="flex items-center gap-2 text-xl font-extrabold">
        <Icon path={icon} className="h-6 w-6 text-gold" />
        {title}
      </h3>
      <dl className="mt-4 divide-y divide-white/10">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-4 py-3">
            <dt className="text-dim">{label}</dt>
            <dd className="font-extrabold text-gold">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
