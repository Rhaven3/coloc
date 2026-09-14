import type {Dispatch, SetStateAction} from "react";
import {apiClient} from "#/api-client.ts";
import type {Task} from "#/features/task/types/task.ts";

export const taskService = {
    getTasks: async (setTasks: Dispatch<SetStateAction<Task[]>>) => {
        const response = await apiClient.get<Task[]>(`/api/tasks`);
        setTasks(response.data)
    },
    toggleTask: async(id:string, setTasks: Dispatch<SetStateAction<Task[]>>) => {
        const response = await apiClient.patch<Task[]>(`/api/tasks/${id}/toggle`);
        setTasks(response.data)
    }
}