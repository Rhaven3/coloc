import {useEffect, useState} from "react";
import {reminderService} from "#/features/reminder/reminder-service.ts";

export function ReminderList() {
    const [reminders, setReminders] = useState<string[]>([]);
    const [rappelIndex, setRappelIndex] = useState(0);

    useEffect(() => {
        reminderService.getReminders(setReminders);
    }, []);

    useEffect(() => {
        if (reminders.length === 0) return;
        const id = setInterval(
            () => setRappelIndex((i) => (i + 1) % reminders.length),
            6000,
        );
        return () => clearInterval(id);
    }, [reminders.length]);

    if (reminders.length == 0) {
        return (<></>)
    }
    return (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {reminders.map((r, i) => (
                <p key={r}
                    className={`rounded-lg border px-3 py-2.5 text-[12px] leading-snug transition-colors duration-200 ${
                        i === rappelIndex
                            ? "border-joya/40 bg-joya/5 text-ink"
                            : "border-line bg-panel-soft hover:bg-white/70"
                    }`}
                >{r}
                </p>
            ))}
        </div>
    )
}