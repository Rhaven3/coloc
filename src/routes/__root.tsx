import type {QueryClient} from "@tanstack/react-query";
import {createRootRouteWithContext, HeadContent, Outlet, Scripts,} from "@tanstack/react-router";
import type {ReactNode} from "react";

import appCss from "../styles.css?url";
import NotFoundComponent from "#/shared/components/not-found.tsx";
import HeaderApp from "#/shared/components/layout/header-app.tsx";


export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
    head: () => ({
        meta: [
            {charSet: "utf-8"},
            {name: "viewport", content: "width=device-width, initial-scale=1"},
            {
                name: "description",
                content:
                    "Planning du ménage, rappels de vie commune, produits partagés et budget de colocation.",
            },
            {property: "og:title", content: "Coloc"},
            {
                property: "og:description",
                content:
                    "Planning du ménage, rappels de vie commune, produits partagés et budget de colocation.",
            },
            {property: "og:type", content: "website"},
            {name: "twitter:card", content: "summary_large_image"},
        ],
        links: [
            {
                rel: "stylesheet",
                href: appCss,
            },
            {rel: "icon", href: "/favicon.ico", type: "image/x-icon"},
        ],
    }),

    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
});

function RootShell({children}: { children: ReactNode }) {
    return (
        <html lang="en">
        <head>
            <title>Coloc</title>
            <HeadContent/>
        </head>
        <body>
        {children}
        <Scripts/>
        </body>
        </html>
    );
}

function RootComponent() {

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-canvas font-body text-ink">
            <div className="ambient-light pointer-events-none fixed inset-0"/>
            <div className="relative mx-auto max-w-360 px-4 py-4 md:px-6 md:py-6">
                <HeaderApp/>

                <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
