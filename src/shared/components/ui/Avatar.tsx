import type {Roommate} from "#/features/roommate/types/roommate.ts";
import {skin} from "#/shared/components/ui.tsx";

export function Avatar({roommate, size = "md"}: {
    roommate: Roommate | undefined;
    size?: "sm" | "md";
}) {
    const s = size === "sm" ? "size-4 text-[9px]" : "size-6 text-[10px]";
    return (
        <span
            className={`${s} ${skin(roommate)?.bg ?? ""} grid place-items-center rounded-full font-bold text-white`}
            aria-hidden="true"
        >
      {roommate?.initial}
    </span>
    );
}
