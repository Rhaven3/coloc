import type {Roommate} from "#/features/roommate/types/roommate.ts";
import type {
    Product,
    ProductCategory,
    ProductCategoryDTO,
    ProductFormValues, ProductQuantityPatchFormValue
} from "#/features/product/types/product.ts";
import type {ComponentProps} from "react";

export interface ProductCategoryListProps {
    roommates: Roommate[];
    categories: ProductCategory[];
    onProductPatched: (patchValue: ProductQuantityPatchFormValue) => void | Promise<void>;
}

export interface ProductBudgetProps {
    roommates: Roommate[];
    categories: ProductCategory[];
}

export interface ProductCategoryCardProps extends ComponentProps<"article"> {
    category: ProductCategory;
    isLowQuantity: boolean;
    lastBuyers: Roommate[];
    nextBuyers: Roommate[];
}

export interface CreateProductButtonProps {
    categories?: (ProductCategory | ProductCategoryDTO)[];
    roommates?: Roommate[];
    onProductCreated: (product: Omit<Product, "id">) => void | Promise<void>;
}

export interface CreateProductFormProps {
    categories?: (ProductCategory | ProductCategoryDTO)[];
    roommates?: Roommate[];
    onSubmit: (values: ProductFormValues) => void | Promise<void>;
    onCancel?: () => void;
}

export interface PatchProductFormProps {
    product: Product;
    onSubmit: (value: ProductQuantityPatchFormValue) => void | Promise<void>;
    onCancel?: () => void;
}

export interface DialogProductCategoryProps {
    productCategory: ProductCategory;
    roommates: Roommate[];
    onProductPatched: (patchValue: ProductQuantityPatchFormValue) => void | Promise<void>;
}
