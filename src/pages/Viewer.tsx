import { useNavigate, useParams } from "react-router-dom";
import landings from "../landings.config";

export function Viewer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const landing = landings.find((l) => l.id === id);
  const currentIndex = landings.findIndex((l) => l.id === id);

  if (!landing) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <p className="text-lg text-white/60">Landing não encontrada.</p>
        <button
          onClick={() => navigate("/")}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white"
        >
          Voltar ao Hub
        </button>
      </div>
    );
  }

  const prev = currentIndex > 0 ? landings[currentIndex - 1] : null;
  const next =
    currentIndex < landings.length - 1 ? landings[currentIndex + 1] : null;

  return (
    <div className="flex h-screen flex-col">
      <div className="flex items-center justify-between border-b border-white/10 bg-surface px-4 py-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 rounded-lg bg-surface-lighter px-3 py-1.5 text-sm font-medium text-white/70 transition-colors hover:bg-surface-lighter/80 hover:text-white"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Hub
          </button>

          <span className="text-sm font-medium text-white">{landing.name}</span>
        </div>

        <div className="flex items-center gap-2">
          {prev && (
            <button
              onClick={() => navigate(`/view/${prev.id}`)}
              className="rounded-lg bg-surface-lighter px-3 py-1.5 text-sm text-white/70 transition-colors hover:text-white"
            >
              ← Anterior
            </button>
          )}
          {next && (
            <button
              onClick={() => navigate(`/view/${next.id}`)}
              className="rounded-lg bg-surface-lighter px-3 py-1.5 text-sm text-white/70 transition-colors hover:text-white"
            >
              Próxima →
            </button>
          )}

          <a
            href={landing.path}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
          >
            Abrir em nova aba
          </a>
        </div>
      </div>

      <iframe
        src={landing.path}
        title={landing.name}
        className="flex-1 border-0"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
