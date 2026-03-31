export interface LandingConfig {
  id: string;
  name: string;
  description: string;
  tech: string[];
  path: string;
  color: string;
}

const landings: LandingConfig[] = [
  {
    id: "landing1",
    name: "Landing 1 — Clean & Minimal",
    description:
      "Design limpo com tipografia Inter, layout clássico com seções de funcionalidades, comparação e FAQ.",
    tech: ["HTML", "CSS", "JavaScript"],
    path: "/landings/landing1/",
    color: "#7c3aed",
  },
  {
    id: "landing2",
    name: "Landing 2 — React Bolt",
    description:
      "Single-page React com Tailwind, ícones Lucide e layout moderno de features e comparações.",
    tech: ["React", "TypeScript", "Tailwind", "Vite"],
    path: "/landings/landing2/",
    color: "#2563eb",
  },
  {
    id: "landing3",
    name: "Landing 3 — Lovable Modular",
    description:
      "Arquitetura modular com shadcn/ui, framer-motion, seções componentizadas e design system completo.",
    tech: ["React", "TypeScript", "shadcn/ui", "Framer Motion"],
    path: "/landings/landing3/",
    color: "#059669",
  },
  {
    id: "landing4",
    name: "Landing 4 — Outfit Bold",
    description:
      "Design arrojado com tipografia Outfit, gradientes vibrantes e layout impactante.",
    tech: ["HTML", "CSS", "JavaScript"],
    path: "/landings/landing4/",
    color: "#dc2626",
  },
  {
    id: "landing5",
    name: "Landing 5 — Lovable Premium",
    description:
      "Landing premium com seções de dor, credibilidade, depoimentos e hero com mockup.",
    tech: ["React", "TypeScript", "shadcn/ui", "Tailwind"],
    path: "/landings/landing5/",
    color: "#d97706",
  },
];

export default landings;
