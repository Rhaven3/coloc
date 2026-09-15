import {skin} from "#/shared/components/ui.tsx";
import {prochainAcheteur} from "#/lib/coloc-data.ts";
import type {ProductListProps} from "#/features/product/types/product-props.ts";
import {ProductCard} from "#/features/product/components/product-card.tsx";
import {roommateService} from "#/features/roommate/roommate-service.ts";
import type {Roommate} from "#/features/roommate/types/roommate.ts";

export function ProductList({roommates, products}: ProductListProps) {
    return (
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((p) => {
                const next = prochainAcheteur(p.buyer, roommates);
                return <ProductCard
                    product={p}
                    isLowQuantity={p.quantity <= p.treshold}
                    lastBuyer={roommateService.findRoommateById(p.buyer, roommates) as Roommate}
                    nextBuyer={next}
                    skin={skin(next)}
                />
            })}
        </div>
    )
}