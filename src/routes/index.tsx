import {createFileRoute} from "@tanstack/react-router";
import Index from "#/features/index-page.tsx";

export const Route = createFileRoute("/")({
    head: () => ({
        meta: [
            {title: "Coloc"},
            {
                name: "description",
                content:
                    "Planning du ménage réparti équitablement, rappels de vie commune, inventaire des produits partagés et budget de la colocation.",
            },
            {property: "og:title", content: "Colo — Tableau de bord de colocation"},
            {
                property: "og:description",
                content:
                    "Planning du ménage réparti équitablement, rappels de vie commune, inventaire des produits partagés et budget de la colocation.",
            },
            {property: "og:type", content: "website"},
            {name: "twitter:card", content: "summary_large_image"},
        ],
    }),
    component: Index,
});


