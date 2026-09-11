import {type Day, days, type Recurrence} from "#/lib/coloc-data.ts";

export type Task = {
    id: string;
    nom: string;
    description: string;
    recurrence: Recurrence;
    jour: Day;
    faite?: boolean;
};

export const tasks: Task[] = [
    {
        id: "poub-plast-cuisine",
        nom: "Poubelle plastiques",
        description: "Cuisine",
        recurrence: "hebdo",
        jour: days[6],
    },
    {
        id: "poub-men-cuisine",
        nom: "Poubelle ménagers",
        description: "Cuisine",
        recurrence: "hebdo",
        jour: days[6],
    },
    {
        id: "poub-plast-trottoir",
        nom: "Poubelle plastiques",
        description: "Sortie trottoir",
        recurrence: "bi-hebdo",
        jour: days[0],
    },
    {
        id: "poub-men-trottoir",
        nom: "Poubelle ménagers",
        description: "Sortie trottoir",
        recurrence: "bi-hebdo",
        jour: days[2],
    },
    {
        id: "aspirateur",
        nom: "Aspirateur",
        description: "Cuisine, couloirs, toilette, salle de bain, escalier",
        recurrence: "hebdo",
        jour: days[4],
        faite: true,
    },
    {
        id: "toile",
        nom: "Toile (serpillière)",
        description: "Cuisine, couloirs, toilette, salle de bain",
        recurrence: "mensuel",
        jour: days[5],
    },
    {
        id: "four",
        nom: "Nettoyage four",
        description: "Cuisine",
        recurrence: "tri-mensuel",
        jour: days[6],
    },
    {
        id: "micro-onde",
        nom: "Nettoyage micro-ondes",
        description: "Cuisine",
        recurrence: "mensuel",
        jour: days[4],
    },
    {
        id: "vitres",
        nom: "Nettoyage vitres",
        description: "Cuisine et salle de bain",
        recurrence: "tri-mensuel",
        jour: days[6],
    },
    {
        id: "douche",
        nom: "Nettoyage douche",
        description: "Salle de bain",
        recurrence: "mensuel",
        jour: days[6],
    },
];
