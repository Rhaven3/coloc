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

// export function colorGradientFromRoommates(roommates: Roommate[], modifiers?: string[], prefix?:string) {
//     let middleColors: string[] = [];
//     let modifierString = "";
//
//     if (modifiers && modifiers.length > 0) {
//       modifierString = modifiers.join(" ");
//     }
//
//     if (!prefix) {
//         prefix = "";
//     }
//
//     if (roommates.length > 2) {
//         const middleRoommates = roommates.slice(1, roommates.length - 2);
//         middleColors = middleRoommates.map<string>(roommate => `${prefix}via-${roommate.color}${modifierString}`);
//     }
//
//     const from = `from-${roommates[0].color}${modifierString}`
//     const to = `to-${roommates[roommates.length - 1].color}${modifierString}`
//
//     const gradient = `${prefix+from} ${middleColors.length == 0 ? middleColors.join(" ") : ""}${prefix+to}`
//     // console.log(gradient);
//     return gradient
// }

export function colorGradientFromRoommates(roommates: Roommate[], modifiers?: string[], prefix?: string) {
    if (roommates.length === 0) return "";

    const modifierString = modifiers?.join(" ") || "";
    const prefixString = prefix || "";

    const from = `${prefixString}from-${roommates[0].color}${modifierString}`;
    const to = `${prefixString}to-${roommates[roommates.length - 1].color}${modifierString}`;

    const middleColors = roommates.slice(1, -1).map(
        roommate => `${prefixString}via-${roommate.color}${modifierString}`
    );

    return [from, ...middleColors, to].join(" ").trim();
}