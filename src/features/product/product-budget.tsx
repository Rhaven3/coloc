import {euros} from "#/lib/coloc-data.ts";
import type {ProductBudgetProps} from "#/features/product/types/product-props.ts";
import {useMemo} from "react";
import {Panel} from "#/shared/components/ui/Panel.tsx";
import {Avatar} from "#/shared/components/ui/Avatar.tsx";

export function ProductBudget({roommates, products}: ProductBudgetProps) {
    const depenses = useMemo(() => {
        const base: Record<number, number> = {1: 0, 2: 0, 3: 0, 4: 0};
        for (const p of products) base[p.buyer] += p.price;
        return base;
    }, []);

    const total = Object.values(depenses).reduce((a, b) => a + b, 0);
    const part = total / roommates.length;

    return (
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
    )
}