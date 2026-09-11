import type { Roommate } from "@/lib/coloc-data";

type Skin = {
  bg: string;
  text: string;
  soft: string;
  hover: string;
  badge: string;
};

// Classes écrites en toutes lettres pour rester détectables par Tailwind.
export const skins: Record<string, Skin> = {
  joya: {
    bg: "bg-joya",
    text: "text-joya",
    soft: "bg-joya/10",
    hover: "hover:border-joya/40 hover:bg-joya/5",
    badge: "bg-joya/10 text-joya",
  },
  nova: {
    bg: "bg-nova",
    text: "text-nova",
    soft: "bg-nova/10",
    hover: "hover:border-nova/40 hover:bg-nova/5",
    badge: "bg-nova/10 text-nova",
  },
  lila: {
    bg: "bg-lila",
    text: "text-lila",
    soft: "bg-lila/10",
    hover: "hover:border-lila/40 hover:bg-lila/5",
    badge: "bg-lila/10 text-lila",
  },
  sola: {
    bg: "bg-sola",
    text: "text-sola",
    soft: "bg-sola/10",
    hover: "hover:border-sola/40 hover:bg-sola/5",
    badge: "bg-sola/10 text-sola",
  },
};

export const skin = (c: Roommate) => skins[c.couleur]!;

export function Avatar({
  coloc,
  size = "md",
}: {
  coloc: Roommate;
  size?: "sm" | "md";
}) {
  const s = size === "sm" ? "size-4 text-[9px]" : "size-6 text-[10px]";
  return (
    <span
      className={`${s} ${skin(coloc).bg} grid place-items-center rounded-full font-bold text-white`}
      aria-hidden="true"
    >
      {coloc.initiale}
    </span>
  );
}

export function Panel({
  title,
  meta,
  className = "",
  children,
}: {
  title: string;
  meta?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`flex flex-col rounded-2xl border border-line bg-panel p-4 backdrop-blur-xl ${className}`}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="font-display text-base font-bold tracking-tight">{title}</h2>
        {meta ? (
          <span className="font-mono text-[10px] uppercase tracking-wider text-sub">
            {meta}
          </span>
        ) : null}
      </div>
      {children}
    </section>
  );
}
