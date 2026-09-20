import type {ProductCategoryListProps} from "#/features/product/types/product-props.ts";
import {ProductCategoryDialog} from "#/features/product/components/product-category-dialog.tsx";

export function ProductCategoryList({roommates, categories}: ProductCategoryListProps) {

    const productCards = categories.map((p) => {
        return <ProductCategoryDialog productCategory={p} roommates={roommates}/>
    })

    return (
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
            {productCards}
        </div>
    )
}