import {Plus} from "lucide-react";
import {Button} from "#/shared/components/ui/button.tsx";
import {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "#/shared/components/ui/dialog.tsx";
import type {ProductFormValues} from "#/features/product/types/product.ts";
import {CreateProductForm} from "#/features/product/components/create-product-form.tsx";
import type {CreateProductButtonProps} from "#/features/product/types/product-props.ts";


export function CreateProductButton({categories, roommates, onProductCreated}: CreateProductButtonProps) {
    const [open, setOpen] = useState(false);

    const handleSubmit = async (values: ProductFormValues) => {
        await onProductCreated(values);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="icon-sm">
                    <Plus/>
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
