import type {ProductCardProps} from "#/features/product/types/product-props.ts";
import {euros} from "#/lib/coloc-data.ts";
import {Avatar} from "#/shared/components/ui/Avatar.tsx";

export function ProductCard({product, isLowQuantity, nextBuyer, lastBuyer, skin}:ProductCardProps) {
    return (
        <article
            key={product.id}
            className={`rounded-xl border border-line bg-panel p-3 transition-colors duration-200 ${skin?.hover}`}
        >
            <div className="flex items-start justify-between gap-2">
                <span className="text-[13px] font-medium">{product.name}</span>
                <span className={
                          `shrink-0 rounded-md px-1.5 py-0.5 font-mono text-[10px] font-medium
                                        ${isLowQuantity ? "bg-joya/10 text-joya" : "bg-nova/10 text-nova"}`
                      }>
                                      {product.quantity === 0 ? "épuisé" : `${product.quantity} ${product.unite}`}
                                    </span>
            </div>
            <div className="mt-1 font-mono text-[11px] text-sub">
                {euros(product.price)}
            </div>
            <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-line pt-2">
                            <span className="text-[11px] text-sub">
                                Acheté par{" "} <span className="font-medium text-ink">{lastBuyer.name}</span>
                            </span>
                <span className={`flex items-center gap-1 text-[11px] font-medium ${skin?.text}`}>
                                <Avatar roommate={nextBuyer} size="sm"/>
                    {nextBuyer.name}
                            </span>
            </div>
        </article>
    )
}