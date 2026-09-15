import type {Roommate} from "#/features/roommate/types/roommate.ts";

export interface Day {
    short: string;
    long: string;
}
export const days: Day[] = [
    {short: "Lun", long: "Lundi"}, {short: "Mar", long: "Mardi"}, {short: "Mer", long: "Mercredi"},
    {short: "Jeu", long: "Jeudi"}, {short: "Ven", long: "Vendredi"}, {short:"Sam", long:"Samedi"},
    {short: "Dim", long:"Dimanche"}
];

/** Prochain acheteur : le colocataire suivant le dernier acheteur, en rotation. */
export const prochainAcheteur = (dernier: number, roommates:Roommate[]): Roommate => {
    const i = roommates.findIndex((c) => c.id === dernier);
    return roommates[(i + 1) % roommates.length];
};

export const euros = (n: number) =>
    n.toLocaleString("fr-FR", {style: "currency", currency: "EUR"});
