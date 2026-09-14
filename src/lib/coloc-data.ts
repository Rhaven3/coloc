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

export const colocById = (id: number, roommates:Roommate[]) => {
        return roommates.find((c) => c.id === id) ?? roommates[0];
}

export type Product = {
    id: string;
    nom: string;
    quantite: number;
    unite: string;
    seuil: number;
    prix: number;
    dernierAcheteur: number;
};

export const produits: Product[] = [
    {
        id: "pq",
        nom: "Papier toilette",
        quantite: 3,
        unite: "rouleaux",
        seuil: 4,
        prix: 8.9,
        dernierAcheteur: 1,
    },
    {
        id: "sacs",
        nom: "Sacs poubelle",
        quantite: 12,
        unite: "sacs",
        seuil: 6,
        prix: 4.5,
        dernierAcheteur: 2,
    },
    {
        id: "vaisselle",
        nom: "Produit vaisselle",
        quantite: 1,
        unite: "flacon",
        seuil: 2,
        prix: 3.4,
        dernierAcheteur: 3,
    },
    {
        id: "eponge",
        nom: "Éponges",
        quantite: 5,
        unite: "unités",
        seuil: 3,
        prix: 1.8,
        dernierAcheteur: 1,
    },
    {
        id: "desodorisant",
        nom: "Désodorisant toilette",
        quantite: 2,
        unite: "unités",
        seuil: 2,
        prix: 2.9,
        dernierAcheteur: 2,
    },
    {
        id: "savon",
        nom: "Savon évier salle de bain",
        quantite: 1,
        unite: "flacon",
        seuil: 2,
        prix: 2.2,
        dernierAcheteur: 3,
    },
    {
        id: "sopalin",
        nom: "Sopalin",
        quantite: 4,
        unite: "rouleaux",
        seuil: 2,
        prix: 3.1,
        dernierAcheteur: 1,
    },
    {
        id: "film-plastique",
        nom: "Film plastique",
        quantite: 0,
        unite: "rouleau",
        seuil: 1,
        prix: 2.4,
        dernierAcheteur: 2,
    },
    {
        id: "film-cuisson",
        nom: "Film cuisson",
        quantite: 0,
        unite: "rouleau",
        seuil: 1,
        prix: 2.6,
        dernierAcheteur: 3,
    },
    {
        id: "film-alu",
        nom: "Film aluminium",
        quantite: 1,
        unite: "rouleau",
        seuil: 1,
        prix: 2.1,
        dernierAcheteur: 3,
    },
];

/** Prochain acheteur : le colocataire suivant le dernier acheteur, en rotation. */
export const prochainAcheteur = (dernier: number, roommates:Roommate[]): Roommate => {
    const i = roommates.findIndex((c) => c.id === dernier);
    return roommates[(i + 1) % roommates.length];
};





export const euros = (n: number) =>
    n.toLocaleString("fr-FR", {style: "currency", currency: "EUR"});
