import {days} from "@/lib/coloc-data"
import {roommateService} from "#/features/roommate/roommate-service.ts";
import {getCurrentWeekNumber} from "#/shared/utils.ts";


export default function HeaderApp() {
    const date = new Date(0);
    const jourActif = date.getDay();

    // const charge = useMemo(() => {
    //     const base: Record<ColocId, number> = {joya: 0, nova: 0, lila: 0, sola: 0};
    //     for (const t of taches) base[attribution[t.id]] += 1;
    //     return base;
    // }, [attribution]);

    return (
        <header
            className="rise flex flex-wrap items-end justify-between gap-4 rounded-2xl border border-line bg-panel p-3 backdrop-blur-xl md:p-4">
            <div className="flex items-center gap-3">
                <div
                    className="grid size-10 place-items-center rounded-xl bg-ink font-display text-[13px] font-bold text-white">
                    CO
                </div>
                <div>
                    <div className="flex items-baseline gap-2">
                        <h1 className="font-display text-lg font-extrabold tracking-tight">
                            Coloc
                        </h1>
                        <span className="font-mono text-[11px] text-sub">
                  · {roommateService.getRoommates().length} colocataires
                </span>
                    </div>
                    <p className="text-[11px] text-sub">Tableau de bord · semaine {getCurrentWeekNumber()}</p>
                </div>
            </div>
            <div>
            </div>

            <div className="hidden items-center gap-2 md:flex">
                <div className="flex gap-1">
                    {days.map((j, index) => (
                        <span
                            key={j.short}
                            className={
                                index == jourActif
                                    ? "rounded-md bg-joya/10 px-2 py-1 text-[11px] font-semibold text-joya"
                                    : "rounded-md px-2 py-1 text-[11px] font-medium text-sub"
                            }
                        >
                  {j.short}
                </span>
                    ))}
                </div>
            </div>

            {/*        <div className="flex items-center gap-2 rounded-xl border border-line bg-panel-soft px-3 py-2">*/}
            {/* <span className="text-[12px] font-medium">*/}
            {/*  Équité <span className="text-sub">·</span>*/}
            {/* </span>*/}
            {/*            <div className="flex overflow-hidden rounded-md">*/}
            {/*                {colocataires.map((c) => (*/}
            {/*                    <span*/}
            {/*                        key={c.id}*/}
            {/*                        className={`h-2.5 ${skin(c).bg}`}*/}
            {/*                        style={{width: 6 + charge[c.id] * 6}}*/}
            {/*                    />*/}
            {/*                ))}*/}
            {/*            </div>*/}
            {/*            <span className="font-mono text-[11px] text-sub">*/}
            {/*  {Math.max(...Object.values(charge)) -*/}
            {/*  Math.min(...Object.values(charge)) <=*/}
            {/*  1*/}
            {/*      ? "balance OK"*/}
            {/*      : "à rééquilibrer"}*/}
            {/* </span>*/}
            {/*        </div>*/}
        </header>
    )
}