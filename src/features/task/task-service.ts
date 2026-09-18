import type {Dispatch, SetStateAction} from "react";
import {apiClient} from "#/api-client.ts";
import {recurrenceOrder } from "#/features/task/types/task.ts";
import type {Task} from "#/features/task/types/task.ts";

export const taskService = {
    getTasks: async (setTasks: Dispatch<SetStateAction<Task[]>>) => {
        const response = await apiClient.get<Task[]>(`/api/tasks`);
        const orderedTasks = response.data.sort((a, b) => recurrenceOrder[a.recurrence] - recurrenceOrder[b.recurrence]);
        setTasks(orderedTasks)
    },
    toggleTask: async(id:number, setTasks: Dispatch<SetStateAction<Task[]>>) => {
        const response = await apiClient.patch<Task[]>(`/api/tasks/${id}/toggle`);
        setTasks(response.data)
    },

}
