import {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "#/shared/components/ui/dialog.tsx";
import {ProductCategoryCard} from "#/features/product/components/product-category-card.tsx";
import type {Roommate} from "#/features/roommate/types/roommate.ts";
import {roommateService} from "#/features/roommate/roommate-service.ts";
import type {DialogProductCategoryProps} from "#/features/product/types/product-props.ts";
import {PatchProductCategoryForm} from "#/features/product/components/patch-product-category-form.tsx";
import type {ProductQuantityPatchFormValue} from "#/features/product/types/product.ts";

export function ProductCategoryDialog({productCategory, roommates, onProductPatched}: DialogProductCategoryProps) {
    const firstBuyer = roommateService.findRoommateById(productCategory.buyers[0], roommates);

    const nexts = productCategory.buyers.map<Roommate>((roommateId) => roommates[roommateId % roommates.length]);

    const [open, setOpen] = useState(false);

    const handleSubmit = async (value: ProductQuantityPatchFormValue) => {
        await onProductPatched(value);
        setOpen(false);
    };

    return <Dialog key={productCategory.id} open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <ProductCategoryCard
                category={productCategory}
                isLowQuantity={productCategory.quantity <= productCategory.treshold}
                lastBuyers={productCategory.buyers.map<Roommate>(roommateId => roommateService.findRoommateById(roommateId, roommates) as Roommate)}
                nextBuyers={nexts}
            />
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Éditer le produit commun <span
                    className={`text-${firstBuyer?.color}`}>{productCategory.name}</span></DialogTitle>
                <DialogDescription>
                    Il y en a en moins ?
                </DialogDescription>
            </DialogHeader>
            <PatchProductCategoryForm
                productCategory={productCategory}
                onSubmit={handleSubmit}
                onCancel={() => setOpen(false)}
            />
        </DialogContent>
    </Dialog>
}
