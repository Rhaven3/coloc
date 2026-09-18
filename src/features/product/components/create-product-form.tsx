import {useForm} from "@tanstack/react-form";
import {Button} from "#/shared/components/ui/button.tsx";
import {DialogFooter} from "#/shared/components/ui/dialog.tsx";
import {Input} from "#/shared/components/ui/input.tsx";
import {Label} from "#/shared/components/ui/label.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "#/shared/components/ui/select.tsx";
import type {CreateProductFormProps} from "#/features/product/types/product-props.ts";


export function CreateProductForm({categories = [], roommates = [], onSubmit, onCancel,}: CreateProductFormProps) {
    const form = useForm({
        defaultValues: {
            category: categories[0]?.id ?? 0,
            buyer: roommates[0]?.id ?? 0,
            quantity: 1,
            price: 0,
        },
        onSubmit: async ({value}) => {
            await onSubmit(value);
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
                name="category"
                validators={{
                    onChange: ({value}) =>
                        !value || Number(value) <= 0
                            ? "Veuillez sélectionner une catégorie"
                            : undefined,
                }}
            >
                {(field) => (
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor={field.name}>Catégorie</Label>
                        <Select
                            value={field.state.value ? String(field.state.value) : ""}
                            onValueChange={(val) => field.handleChange(Number(val))}
                        >
                            <SelectTrigger id={field.name} className="w-full">
                                <SelectValue placeholder="Sélectionner une catégorie"/>
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category.id} value={String(category.id)}>
                                        {category.name} ({category.unite})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {field.state.meta.errors.length > 0 ? (
                            <p className="text-xs text-destructive">
                                {field.state.meta.errors.join(", ")}
                            </p>
                        ) : null}
                    </div>
                )}
            </form.Field>

            <form.Field
                name="buyer"
                validators={{
                    onChange: ({value}) =>
                        !value || Number(value) <= 0
                            ? "Veuillez sélectionner un acheteur"
                            : undefined,
                }}
            >
                {(field) => (
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor={field.name}>Acheteur</Label>
                        <Select
                            value={field.state.value ? String(field.state.value) : ""}
                            onValueChange={(val) => field.handleChange(Number(val))}
                        >
                            <SelectTrigger id={field.name} className="w-full">
                                <SelectValue placeholder="Sélectionner un colocataire"/>
                            </SelectTrigger>
                            <SelectContent>
                                {roommates.map((roommate) => (
                                    <SelectItem key={roommate.id} value={String(roommate.id)}>
                                        {roommate.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {field.state.meta.errors.length > 0 ? (
                            <p className="text-xs text-destructive">
                                {field.state.meta.errors.join(", ")}
                            </p>
                        ) : null}
                    </div>
                )}
            </form.Field>

            <div className="grid grid-cols-2 gap-3">
                <form.Field
                    name="quantity"
                    validators={{
                        onChange: ({value}) =>
                            Number(value) <= 0
                                ? "La quantité doit être supérieure à 0"
                                : undefined,
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

                <form.Field
                    name="price"
                    validators={{
                        onChange: ({value}) =>
                            Number(value) < 0
                                ? "Le prix ne peut pas être négatif"
                                : undefined,
                    }}
                >
                    {(field) => (
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor={field.name}>Prix (€)</Label>
                            <Input
                                id={field.name}
                                name={field.name}
                                type="number"
                                min={0}
                                step="0.01"
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
            </div>

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
                            {isSubmitting ? "Ajout en cours..." : "Ajouter le produit"}
                        </Button>
                    )}
                </form.Subscribe>
            </DialogFooter>
        </form>
    );
}
