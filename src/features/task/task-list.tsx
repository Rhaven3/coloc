import {Panel, skin, skins} from "#/shared/components/ui.tsx";
import {days} from "#/lib/coloc-data.ts";
import type {Task} from "#/features/task/types/task.ts";
import {useEffect, useState} from "react";
import {Avatar} from "@/shared/components/ui"
import type {TaskListProps} from "#/features/task/types/TaskListProps.ts";
import {taskService} from "#/features/task/task-service.ts";
import {roommateService} from "#/features/roommate/roommate-service.ts";

export function TaskList({roommates}: TaskListProps) {
    const date = new Date();
    const [tasks, setTasks] = useState<Task[]>([]);
    // const [decalage, setDecalage] = useState(0);
    const nbFaites = tasks.filter((t) => t.done).length;

    useEffect(() => {
        taskService.getTasks(setTasks)
    }, []);

    return (
        <div className="rise rise-d1 lg:col-span-5">
            <Panel
                title="Planning du ménage"
                meta={"Aujourd'hui · " + days[date.getDay() - 1].long}
                className="h-full"
            >
                <div className="flex flex-col gap-2">
                    {tasks.map((t) => {
                        const roommate = roommateService.findRoommateById(t.roommateAssigned, roommates);
                        const s = skin(roommate) ?? skins["default"];
                        return (
                            <button
                                key={t.id}
                                type="button"
                                onClick={() =>
                                    taskService.toggleTask(t.id, setTasks)
                                }
                                className={`group flex items-center gap-3 rounded-xl border border-line bg-panel px-3 py-2.5 text-left transition-colors duration-200 ${s.hover}`}
                            >
                      <span
                          className={`grid size-8 shrink-0 place-items-center rounded-lg ${s.soft}`}
                      >
                        <span
                            className={
                                t.done
                                    ? `size-4 rounded-full ${s.bg}`
                                    : `size-4 rounded border-2 border-current ${s.text} transition-opacity duration-200 group-hover:opacity-60`
                            }
                        />
                      </span>
                                <span className="min-w-0 flex-1">
                        <span
                            className={`block truncate text-[13px] font-medium ${t.done ? "text-sub line-through" : ""}`}
                        >
                          {t.name}
                        </span>
                        <span className="block truncate text-[11px] text-sub">
                          {t.description} · {t.recurrence} · {days[t.day - 1].short}
                        </span>
                      </span>
                                <span className="flex items-center gap-1.5">
                        <Avatar roommate={roommate}/>
                        <span className={`text-[11px] font-medium ${s.text}`}>
                          {roommate?.name ?? "non attribuer"}
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