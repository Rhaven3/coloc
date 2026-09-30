import type {Dispatch, SetStateAction} from "react";
import {apiClient} from "#/api-client.ts";

export const reminderService = {
    getReminders: async (setReminders: Dispatch<SetStateAction<string[]>>) => {
        const response = await apiClient.get<string[]>(`/reminders`);
        setReminders(response.data)
    },
}