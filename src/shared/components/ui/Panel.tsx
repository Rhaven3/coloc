import type {ReactNode} from "react";

export function Panel({title, meta, className = "", children,}: {
    title: string;
    meta?: string;
    className?: string;
    children: ReactNode;
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
