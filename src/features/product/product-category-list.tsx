import type {ProductCategoryListProps} from "#/features/product/types/product-props.ts";
import {ProductCategoryCard} from "#/features/product/components/product-category-card.tsx";
import {roommateService} from "#/features/roommate/roommate-service.ts";
import type {Roommate} from "#/features/roommate/types/roommate.ts";

export function ProductCategoryList({roommates, categories}: ProductCategoryListProps) {
    const productCards = categories.map((p) => {
        const nexts = p.buyers.map<Roommate>((roommateId) => roommates[roommateId % roommates.length]);
        return <ProductCategoryCard
            category={p}
            isLowQuantity={p.quantity <= p.treshold}
            lastBuyers={p.buyers.map<Roommate>(roommateId => roommateService.findRoommateById(roommateId, roommates) as Roommate)}
            nextBuyers={nexts}
        />
    })

    return (
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
            {productCards}
        </div>
    )
}