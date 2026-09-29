import type {Dispatch, SetStateAction} from "react";
import type {Receipt} from "#/features/receipt/types/Receipt.ts";
import {apiClient} from "#/api-client.ts";

export const receiptService = {
    getReceipts: async (setReceipts?: Dispatch<SetStateAction<Receipt[]>>) => {
        const response = await apiClient.get<Receipt[]>(`/api/receipts`);
        if (setReceipts) {
            setReceipts(response.data)
        }
        return response.data;
    },
    getMonthlyReceipts: async (setReceipts?: Dispatch<SetStateAction<Receipt[]>>) => {
        const response = await apiClient.get<Receipt[]>(`/api/receipts`);

        const actualMonth = new Date().getMonth()
        const filtered = response.data.filter(r => {
            const date = new Date(r.date)
            return date.getMonth() === actualMonth
        })

        if (setReceipts) {
            setReceipts(filtered)
        }

        return filtered;
    },
}

