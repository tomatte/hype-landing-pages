import { useNavigate } from "react-router-dom";
import type { LandingConfig } from "../landings.config";

interface LandingCardProps {
  landing: LandingConfig;
  index: number;
}

export function LandingCard({ landing, index }: LandingCardProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/view/${landing.id}`)}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-surface text-left transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/50"
    >
      <div
        className="flex h-40 items-center justify-center text-6xl font-black text-white/20 transition-colors group-hover:text-white/30"
        style={{ backgroundColor: landing.color + "18" }}
      >
        <span
          className="flex h-16 w-16 items-center justify-center rounded-xl text-2xl font-bold text-white"
          style={{ backgroundColor: landing.color }}
        >
          {index + 1}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold text-white">{landing.name}</h3>
        <p className="text-sm leading-relaxed text-white/60">
          {landing.description}
        </p>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {landing.tech.map((t) => (
            <span
              key={t}
              className="rounded-md bg-surface-lighter px-2 py-0.5 text-xs font-medium text-white/50"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 h-0.5 transition-all duration-300 group-hover:h-1"
        style={{ backgroundColor: landing.color }}
      />
    </button>
  );
}
