
export interface Day {
    short: string;
    long: string;
}

export const days: Day[] = [
    {short: "Lun", long: "Lundi"}, {short: "Mar", long: "Mardi"}, {short: "Mer", long: "Mercredi"},
    {short: "Jeu", long: "Jeudi"}, {short: "Ven", long: "Vendredi"}, {short: "Sam", long: "Samedi"},
    {short: "Dim", long: "Dimanche"}
];

export const euros = (n: number) =>
    n.toLocaleString("fr-FR", {style: "currency", currency: "EUR"});
