import type { Dispatch, SetStateAction } from "react";
import {apiClient} from "#/api-client.ts";
import type {Roommate} from "#/features/roommate/types/roommate.ts";

export const roommateService = {
    getRoommates: async (setRoommate: Dispatch<SetStateAction<Roommate[]>>)  => {
        const response = await apiClient.get<Roommate[]>(`/api/roommates`);
        setRoommate(response.data)
    },

    findRoommateById: (id: number|undefined, roommates:Roommate[]):Roommate|undefined => {
        if (id === undefined) {
            return
        }
        return roommates.find((value) => id === value.id)
    }
}