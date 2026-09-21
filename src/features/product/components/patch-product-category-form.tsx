import type {PatchProductCategoryFormProps} from "#/features/product/types/product-props.ts";
import {useForm} from "@tanstack/react-form";
import {Label} from "#/shared/components/ui/label.tsx";
import {Input} from "#/shared/components/ui/input.tsx";
import {Button} from "#/shared/components/ui/button.tsx";
import {DialogFooter} from "#/shared/components/ui/dialog.tsx";

export function PatchProductCategoryForm({ productCategory, onSubmit, onCancel,}: PatchProductCategoryFormProps) {
    const form = useForm({
        defaultValues: {
            quantity: productCategory.quantity,
        },
        onSubmit: async ({value}) => {
            await onSubmit({
                productCategoryId: productCategory.id,
                value: {
                    soustraction: productCategory.quantity - value.quantity,
                }
            });
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
            className="flex flex-col gap-4"
        >
            <form.Field
                name="quantity"
                validators={{
                    onChange: ({value}) => {
                        if (!value) {
                            return "La quantité est nécessaire";
                        } else if (value > productCategory.quantity) {
                            return "La quantité doit être inférieure ou égale à la quantité actuelle";
                        } else if (value < 0) {
                            return "La quantité doit être positive ou égal à zéro";
                        }
                    }
                }}
            >
                {(field) => (
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor={field.name}>Quantité</Label>
                        <Input
                            id={field.name}
                            name={field.name}
                            type="number"
                            min={1}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            onChange={(e) => field.handleChange(Number(e.target.value))}
                        />
                        {field.state.meta.errors.length > 0 ? (
                            <p className="text-xs text-destructive">
                                {field.state.meta.errors.join(", ")}
                            </p>
                        ) : null}
                    </div>
                )}
            </form.Field>
            <DialogFooter className="mt-4">
                {onCancel && (
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Annuler
                    </Button>
                )}
                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                >
                    {([canSubmit, isSubmitting]) => (
                        <Button type="submit" disabled={!canSubmit || isSubmitting}>
                            {isSubmitting ? "Soustraction en cours..." : "Modifier le produit"}
                        </Button>
                    )}
                </form.Subscribe>
            </DialogFooter>
        </form>
    )
}
