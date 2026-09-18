import type {Roommate} from "#/features/roommate/types/roommate.ts";

export type Skin = {
    bg: string;
    text: string;
    soft: string;
    hover: string;
    badge: string;
};

// Classes écrites en toutes lettres pour rester détectables par Tailwind.
export const skins: Record<string, Skin> = {
    default: {
        bg: "bg-sub",
        text: "text-sub",
        soft: "bg-sub/10",
        hover: "hover:border-sub/40 hover:bg-sub/5",
        badge: "bg-sub/10 text-sub",
    },
    joya: {
        bg: "bg-joya",
        text: "text-joya",
        soft: "bg-joya/10",
        hover: "hover:border-joya/40 hover:bg-joya/5",
        badge: "bg-joya/10 text-joya",
    },
    nova: {
        bg: "bg-nova",
        text: "text-nova",
        soft: "bg-nova/10",
        hover: "hover:border-nova/40 hover:bg-nova/5",
        badge: "bg-nova/10 text-nova",
    },
    lila: {
        bg: "bg-lila",
        text: "text-lila",
        soft: "bg-lila/10",
        hover: "hover:border-lila/40 hover:bg-lila/5",
        badge: "bg-lila/10 text-lila",
    },
    sola: {
        bg: "bg-sola",
        text: "text-sola",
        soft: "bg-sola/10",
        hover: "hover:border-sola/40 hover:bg-sola/5",
        badge: "bg-sola/10 text-sola",
    },
};

export const skin = (r: Roommate | undefined) => {
    if (r === undefined) {
        return
    }
    return skins[r.color]
};