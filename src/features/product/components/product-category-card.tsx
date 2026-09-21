import type {ProductCategoryCardProps} from "#/features/product/types/product-props.ts";
import {Avatar} from "#/shared/components/ui/Avatar.tsx";
import {euros} from "#/lib/utils.ts";
import type {Skin} from "#/shared/components/ui.tsx";
import {skin} from "#/shared/components/ui.tsx";
import {TriangleAlert} from "lucide-react";

export function ProductCategoryCard({category, isLowQuantity, nextBuyers, lastBuyers, ...props}: ProductCategoryCardProps) {
    const lastSkins = lastBuyers.map(last => skin(last) as Skin)
    const nextSkins = nextBuyers.map(next => skin(next) as Skin)

    return (
        <article
            key={category.id}
            className={`rounded-xl border border-line bg-panel p-3 transition-colors duration-200 ${isLowQuantity ? nextSkins[0].hover : lastSkins[0].hover}`}
            {...props}
        >
            <div className="flex items-start justify-between gap-2">
                <span className="text-[13px] font-medium">{category.name}</span>
                <span className={`shrink-0 rounded-md px-1.5 py-0.5 font-mono text-[10px] font-medium
                        ${isLowQuantity ? nextSkins[0].badge : lastSkins[0].badge}`}>
                    {category.quantity === 0 ? "épuisé" : `${category.quantity} ${category.unite}`}
                </span>
            </div>

            <div className="mt-2.5 flex items-center justify-between font-mono text-[11px] text-sub">
                {euros(category.price)}
                <div className="flex items-center justify-end gap-2">
                    {lastBuyers.map((buyer) => (
                        <span className={`flex items-center gap-1 text-[11px] font-medium text-${buyer.color}`}>
                        <Avatar roommate={buyer} size="sm"/>
                            {buyer.name}
                    </span>
                    ))}
                </div>
            </div>

            <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-line pt-2">
                {isLowQuantity ?
                    <>
                        <TriangleAlert className={nextSkins[0].text}/>
                        <span className="text-[11px] text-sub">
                                {nextBuyers.map((buyer) =>
                                    <span className={`font-medium text-${buyer.color}`}>{buyer.name}, </span>
                                )} {nextBuyers.length > 1 ? "doivent en acheter" : "doit en acheter"}
                        </span>
                    </>
                    : null
                }
            </div>
        </article>
    )
}
