import {roommateService} from "#/features/roommate/roommate-service.ts";
import {getCurrentWeekNumber} from "#/shared/utils.ts";
import {useEffect, useState} from "react";
import type {Roommate} from "#/features/roommate/types/roommate.ts";
import {days} from "#/lib/utils.ts";


export default function HeaderApp() {
    const date = new Date();
    const jourActif = date.getDay() - 1;

    const [roommates, setRoommates] = useState<Roommate[]>([]);
    useEffect(() => {
        roommateService.getRoommates(setRoommates)
    }, []);

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
                  · {roommates.length} colocataires
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
        </header>
    )
}