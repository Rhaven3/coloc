import {useEffect, useMemo, useState} from "react";
import {Avatar, Panel, skin} from "@/shared/components/ui";
import {colocById, euros, prochainAcheteur, produits} from "@/lib/coloc-data";
import {roommateService} from "#/features/roommate/roommate-service.ts";
import {TaskList} from "#/features/task/task-list.tsx";
import type {Roommate} from "#/features/roommate/types/roommate.ts";
import {reminderService} from "#/features/reminder/reminder-service.ts";


export default function Index() {
    const [rappelIndex, setRappelIndex] = useState(0);
    const [roommates, setRoommates] = useState<Roommate[]>([]);
    const [reminders, setReminders] = useState<string[]>([]);

    useEffect(() => {
        roommateService.getRoommates(setRoommates)
        reminderService.getReminders(setReminders)
        const id = setInterval(
            () => setRappelIndex((i) => (i + 1) % reminders.length),
            6000,
        );
        return () => clearInterval(id);
    }, []);


    const depenses = useMemo(() => {
        const base: Record<number, number> = {1: 0, 2: 0, 3: 0, 4: 0};
        for (const p of produits) base[p.dernierAcheteur] += p.prix;
        return base;
    }, []);

    const total = Object.values(depenses).reduce((a, b) => a + b, 0);
    const part = total / roommates.length;

    if (roommates.length === 0 || reminders.length === 0) {
        return (<></>)
    }
    return (
        <>
            {/* RAPPELS */}
            <div className="rise rise-d3 lg:col-span-12">
                <Panel title="Rappels de vie">
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {reminders.map((r, i) => (
                            <p
                                key={r}
                                className={`rounded-lg border px-3 py-2.5 text-[12px] leading-snug transition-colors duration-200 ${
                                    i === rappelIndex
                                        ? "border-joya/40 bg-joya/5 text-ink"
                                        : "border-line bg-panel-soft hover:bg-white/70"
                                }`}
                            >
                                {r}
                            </p>
                        ))}
                    </div>
                </Panel>
            </div>

            <TaskList roommates={roommates}/>

            {/* PRODUITS */}
            <div className="rise rise-d2 lg:col-span-7">
                <Panel
                    title="Produits communs"
                    meta={`Inventaire · ${produits.length}`}
                    className="h-full"
                >
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
                        {produits.map((p) => {
                            const dernier = colocById(p.dernierAcheteur, roommates);
                            const suivant = prochainAcheteur(p.dernierAcheteur, roommates);
                            const s = skin(suivant);
                            const bas = p.quantite <= p.seuil;
                            return (
                                <article
                                    key={p.id}
                                    className={`rounded-xl border border-line bg-panel p-3 transition-colors duration-200 ${s?.hover}`}
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <span className="text-[13px] font-medium">{p.nom}</span>
                                        <span
                                            className={`shrink-0 rounded-md px-1.5 py-0.5 font-mono text-[10px] font-medium 
                                            ${bas ? "bg-joya/10 text-joya" : "bg-nova/10 text-nova"}`}
                                        >
                          {p.quantite === 0
                              ? "épuisé"
                              : `${p.quantite} ${p.unite}`}
                        </span>
                                    </div>
                                    <div className="mt-1 font-mono text-[11px] text-sub">
                                        {euros(p.prix)}
                                    </div>
                                    <div
                                        className="mt-2.5 flex items-center justify-between gap-2 border-t border-line pt-2">
                        <span className="text-[11px] text-sub">
                          Acheté par{" "}
                            <span className="font-medium text-ink">{dernier.name}</span>
                        </span>
                                        <span
                                            className={`flex items-center gap-1 text-[11px] font-medium ${s?.text}`}
                                        >
                          <Avatar roommate={suivant} size="sm"/>
                                            {suivant.name}
                        </span>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </Panel>
            </div>


            {/* BUDGET */}
            <div className="rise rise-d3 lg:col-span-12">
                <Panel title="Budget partagé" meta={`Ce mois · ${euros(total)}`}>
                    <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
                        {roommates.map((c) => {
                            const solde = depenses[c.id] - part;
                            return (
                                <div
                                    key={c.id}
                                    className="rounded-xl border border-line bg-panel p-3"
                                >
                                    <div className="flex items-center gap-2">
                                        <Avatar roommate={c}/>
                                        <span className="text-[13px] font-medium">{c.name}</span>
                                    </div>
                                    <div className="mt-2 font-mono text-[13px] font-medium">
                                        {euros(depenses[c.id])}
                                    </div>
                                    <div
                                        className={`mt-0.5 text-[11px] font-medium ${solde >= 0 ? "text-nova" : "text-joya"}`}
                                    >
                                        {solde >= 0
                                            ? "à couvert ✓"
                                            : `doit ${euros(Math.abs(solde))}`}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Panel>
            </div>
        </>
    );
}
