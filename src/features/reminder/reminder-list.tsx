import {useEffect, useState} from "react";
import {reminderService} from "#/features/reminder/reminder-service.ts";
import {Quote} from "lucide-react";

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
        <div className="grid grid-cols-1 lg:gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {reminders.map((r, i) => (
                <div className="max-md:flex max-md:flex-row max-md:justify-items-end max-md:items-center max-md:pl-3">
                    <Quote className={`${i === rappelIndex ? "lg:hidden" : "hidden"} `}/>
                    <p key={r}
                       className={`${i === rappelIndex ? "" : "max-md:hidden"}  
                       lg:visible lg:rounded-lg lg:border 
                       max-md:italic max-md:font-semibold max-md:tracking-tight max-md:text-heading 
                       px-3 py-2.5 text-[12px] leading-snug transition-colors duration-200 ${
                           i === rappelIndex
                               ? "lg:border-joya/40 lg:bg-joya/5 text-ink"
                               : "border-line bg-panel-soft hover:bg-white/70"
                       }`}
                    >{r}
                    </p>
                </div>
            ))}
        </div>
    )
}