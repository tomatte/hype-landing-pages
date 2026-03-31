import landings from "../landings.config";
import { LandingCard } from "../components/LandingCard";

export function Hub() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-white/5 bg-surface/50 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-6">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary font-bold text-white"
            aria-hidden
          >
            H
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Hype — Landing Pages</h1>
            <p className="text-sm text-white/50">
              {landings.length} variações disponíveis
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-white">
            Escolha uma Landing Page
          </h2>
          <p className="mt-2 text-white/50">
            Clique em qualquer card para visualizar a landing page em tela cheia.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {landings.map((landing, i) => (
            <LandingCard key={landing.id} landing={landing} index={i} />
          ))}
        </div>
      </main>

      <footer className="border-t border-white/5 py-8 text-center text-sm text-white/30">
        Hype Landing Center — Byalsoft
      </footer>
    </div>
  );
}
