import {Panel, skin} from "#/shared/components/ui.tsx";
import {colocById, days, type Roommate} from "#/lib/coloc-data.ts";
import {tasks } from "#/features/task/types/task.ts";
import type {Task} from "#/features/task/types/task.ts";
import {useEffect, useMemo, useState} from "react";
import {Avatar} from "@/shared/components/ui"
import {roommateService} from "#/features/roommate/roommate-service.ts";

export function TaskList() {
    const date = new Date();
    const [decalage, setDecalage] = useState(0);
    const [roommates, setRoommates] = useState<Roommate[]>();
    useEffect(() => {
        setRoommates(roommateService.getRoommates())
    })
    const [faites, setFaites] = useState<Record<string, boolean>>(() =>
        Object.fromEntries(tasks.filter((t) => t.faite).map((t) => [t.id, true])),
    );
    const nbFaites = tasks.filter((t) => faites[t.id]).length;

    const attribuerEquitablement = (
        liste: Task[],
    ): Record<string, number> => {
        const map: Record<string, number> = {};
        liste.forEach((t, i) => {
            map[t.id] = roommates[(i + decalage) % roommates.length].id;
        });
        return map;
    };

    const attribution = useMemo(
        () => attribuerEquitablement(tasks),
        [decalage],
    );

    return (
        <div className="rise rise-d1 lg:col-span-5">
            <Panel
                title="Planning du ménage"
                meta={"Aujourd'hui · " + days[date.getDay()-1].long}
                className="h-full"
            >
                <div className="flex flex-col gap-2">
                    {tasks.map((t) => {
                        const coloc = colocById(attribution[t.id], roommates);
                        const s = skin(coloc);
                        const done = faites[t.id];
                        return (
                            <button
                                key={t.id}
                                type="button"
                                onClick={() =>
                                    setFaites((f) => ({...f, [t.id]: !f[t.id]}))
                                }
                                className={`group flex items-center gap-3 rounded-xl border border-line bg-panel px-3 py-2.5 text-left transition-colors duration-200 ${s.hover}`}
                            >
                      <span
                          className={`grid size-8 shrink-0 place-items-center rounded-lg ${s.soft}`}
                      >
                        <span
                            className={
                                done
                                    ? `size-4 rounded-full ${s.bg}`
                                    : `size-4 rounded border-2 border-current ${s.text} transition-opacity duration-200 group-hover:opacity-60`
                            }
                        />
                      </span>
                                <span className="min-w-0 flex-1">
                        <span
                            className={`block truncate text-[13px] font-medium ${done ? "text-sub line-through" : ""}`}
                        >
                          {t.nom}
                        </span>
                        <span className="block truncate text-[11px] text-sub">
                          {t.description} · {t.recurrence} · {t.jour.short}
                        </span>
                      </span>
                                <span className="flex items-center gap-1.5">
                        <Avatar coloc={coloc}/>
                        <span className={`text-[11px] font-medium ${s.text}`}>
                          {coloc.nom}
                        </span>
                      </span>
                            </button>
                        );
                    })}
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                <span className="text-[11px] text-sub">
                  {tasks.length} tâches ·{" "}
                    <span className="text-nova">{nbFaites} faites</span>
                </span>
                </div>
            </Panel>
        </div>
    )
}