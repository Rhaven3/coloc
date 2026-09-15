import type {Roommate} from "#/features/roommate/types/roommate.ts";
import type {Task} from "#/features/task/types/task.ts";
import type {Dispatch, SetStateAction} from "react";
import type {Skin} from "#/shared/components/ui.tsx";

export interface TaskListProps {
    roommates: Roommate[];
}

export interface TaskCardProps {
    task: Task;
    setTasks: Dispatch<SetStateAction<Task[]>>;
    roommate?: Roommate;
    skin: Skin;
}