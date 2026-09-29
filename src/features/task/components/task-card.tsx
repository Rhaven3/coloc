import {taskService} from "#/features/task/task-service.ts";
import type {TaskCardProps} from "#/features/task/types/task-props.ts";
import {Avatar} from "#/shared/components/ui/Avatar.tsx";
import {days} from "#/lib/utils.ts";

export function TaskCard({task, setTasks, roommate, skin}: TaskCardProps) {
    return (
        <button
            key={task.id}
            type="button"
            onClick={() => taskService.toggleTask(task.id, setTasks)}
            className={`group flex items-center gap-3 rounded-xl border border-line bg-panel px-3 py-2.5 text-left transition-colors duration-200 ${skin.hover}`}
        >
            <span className={`grid size-8 shrink-0 place-items-center rounded-lg ${skin.soft}`}>
                <span className={task.done
                    ? `size-4 rounded-full ${skin.bg}`
                    : `size-4 rounded border-2 border-current ${skin.text} transition-opacity duration-200 group-hover:opacity-60`
                }/>
            </span>
            <span className="min-w-0 flex-1">
                <span className={`block truncate text-[15px] max-md:font-bold lg:text-[13px] font-medium max-md:text-center ${task.done ? "text-sub line-through" : ""}`}>
                    {task.name}
                </span>
                <span className="block truncate text-[12px] max-md:text-center  text-sub lg:hidden">
                    {task.description}
                </span>

                <span className="block truncate text-[11px] max-md:text-center text-sub">
                    <span className={"max-md:hidden"}>{task.description} ·</span> {task.recurrence} · {days[task.day - 1].short}
                </span>
            </span>
            <span className="flex items-center gap-1.5">
                <Avatar roommate={roommate}/>
                <span className={`text-[11px]  font-medium ${skin.text}`}>
                  {roommate?.name ?? ""}
                </span>
            </span>
        </button>
    )
}
