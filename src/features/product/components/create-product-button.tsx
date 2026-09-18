import {Plus} from "lucide-react";
import {Button} from "#/shared/components/ui/button.tsx";
import {useEffect, useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "#/shared/components/ui/dialog.tsx";
import {productService} from "#/features/product/product-service.ts";
import {roommateService} from "#/features/roommate/roommate-service.ts";
import type {ProductCategory, ProductCategoryDTO, ProductFormValues} from "#/features/product/types/product.ts";
import type {Roommate} from "#/features/roommate/types/roommate.ts";
import {CreateProductForm} from "#/features/product/components/create-product-form.tsx";
import type {CreateProductButtonProps} from "#/features/product/types/product-props.ts";



export function CreateProductButton({
    categories: initialCategories,
    roommates: initialRoommates,
    onProductCreated,
}: CreateProductButtonProps = {}) {
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState<(ProductCategory | ProductCategoryDTO)[]>(initialCategories ?? []);
    const [roommates, setRoommates] = useState<Roommate[]>(initialRoommates ?? []);

    useEffect(() => {
        if (initialCategories && initialCategories.length > 0) {
            setCategories(initialCategories);
        }
    }, [initialCategories]);

    useEffect(() => {
        if (initialRoommates && initialRoommates.length > 0) {
            setRoommates(initialRoommates);
        }
    }, [initialRoommates]);

    useEffect(() => {
        if (open) {
            if (!initialCategories || initialCategories.length === 0) {
                productService.getProductCategoriesDTO().then(setCategories).catch(console.error);
            }
            if (!initialRoommates || initialRoommates.length === 0) {
                roommateService.getRoommates(setRoommates).catch(console.error);
            }
        }
    }, [open, initialCategories, initialRoommates]);

    const handleSubmit = async (values: ProductFormValues) => {
        if (onProductCreated) {
            await onProductCreated(values);
        } else {
            await productService.createProduct(values);
        }
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="icon-sm">
                    <Plus />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ajout d'un produit</DialogTitle>
                    <DialogDescription>
                        Un produit commun pour la colocation, le prix permettra de recalculer le budget et
                        savoir à qui le tour ce sera d'acheter de nouveau un produit.
                    </DialogDescription>
                </DialogHeader>
                <CreateProductForm
                    categories={categories}
                    roommates={roommates}
                    onSubmit={handleSubmit}
                    onCancel={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    );
}
