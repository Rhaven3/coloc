import type {ProductBudgetProps} from "#/features/product/types/product-props.ts";
import {Panel} from "#/shared/components/ui/Panel.tsx";
import {Avatar} from "#/shared/components/ui/Avatar.tsx";
import {euros} from "#/lib/utils.ts";

export function ReceiptBudget({roommates, receipts, budget}: ProductBudgetProps) {
    return (
        <Panel title="Budget partagé" meta={`Ce mois · ${euros(budget.total)}`}>
            <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
                {roommates.map((c) => {
                    let solde = budget.depenses[c.id] - budget.part;
                    if (!receipts.length) solde = -1;
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
                                {receipts.length ? euros(budget.depenses[c.id]) : "0 €"}
                            </div>
                            <div
                                className={`mt-0.5 text-[11px] font-medium ${solde >= 0 ? "text-nova" : "text-joya"}`}
                            >
                                {solde >= 0 || solde === -1
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
