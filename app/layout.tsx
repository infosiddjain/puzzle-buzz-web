import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Puzzle Buzz — Train your brain. Feed your mind.",
  description:
    "Puzzle Buzz is a mind puzzle game with riddles, logic, maths, word scrambles, memory match and trivia. No accounts, no ads, no tracking.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${nunito.variable} antialiased scroll-smooth`}>
      <body>{children}</body>
    </html>
  );
}
