import Link from "next/link";
import { PushBoxesPlayground } from "../components/push-boxes-playground";

export const metadata = {
  title: "Interaction Playground | Le Anh Quan",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PlaygroundPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px] opacity-50 dark:opacity-100" />

      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-8">
        <header className="flex items-center justify-between font-mono text-[11px] text-subtle">
          <Link className="link-underline text-muted hover:text-foreground" href="/">
            ← back
          </Link>
          <span className="tracking-[0.22em] uppercase">interaction test</span>
        </header>

        <section className="flex flex-1 flex-col justify-center gap-8 py-12">
          <div className="max-w-2xl">
            <p className="font-mono text-xs tracking-[0.28em] text-subtle uppercase">
              sweep the blocks
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-balance md:text-7xl">
              A landing page that reacts like loose paper on a desk.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-muted md:text-base">
              Move your cursor through the cards, or drag them directly. This is a sandbox page so the main landing stays clean while we tune the feel.
            </p>
          </div>

          <PushBoxesPlayground />
        </section>
      </div>
    </main>
  );
}
