export type Recurrence = "quotidien" | "hebdo" | "bi-hebdo" | "mensuel" | "tri-mensuel";

export const recurrenceOrder: Record<Recurrence, number> = {
    "quotidien": 1,
    "hebdo": 2,
    "bi-hebdo": 3,
    "mensuel": 4,
    "tri-mensuel": 5
}

export type Task = {
    id: number;
    name: string;
    description: string;
    recurrence: Recurrence;
    day: number;
    roommateAssigned?: number
    done?: boolean;
};