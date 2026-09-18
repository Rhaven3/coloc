import {skin, skins} from "#/shared/components/ui.tsx";
import type {Task} from "#/features/task/types/task.ts";
import {useEffect, useState} from "react";
import type {TaskListProps} from "#/features/task/types/task-props.ts";
import {taskService} from "#/features/task/task-service.ts";
import {roommateService} from "#/features/roommate/roommate-service.ts";
import {TaskCard} from "#/features/task/components/task-card.tsx";

export function TaskList({roommates}: TaskListProps) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const nbFaites = tasks.filter((t) => t.done).length;

    useEffect(() => {
        taskService.getTasks(setTasks)
    }, []);

    return (
        <>
            <div className="flex flex-col gap-2">
                {tasks.map((t) => {
                    const roommate = roommateService.findRoommateById(t.roommateAssigned, roommates);
                    return <TaskCard
                        task={t}
                        roommate={roommate}
                        setTasks={setTasks}
                        skin={skin(roommate) ?? skins["default"]}
                    />;
                })}
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                <span className="text-[11px] text-sub">
                  {tasks.length} tâches · <span className="text-nova">{nbFaites} faites</span>
                </span>
            </div>
        </>
    )
}