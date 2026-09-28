import type {Roommate} from "#/features/roommate/types/roommate.ts";
import type {
    ProductCategory,
    ProductCategoryDTO,
    ProductFormValues,
    ProductQuantityPatchFormValue
} from "#/features/product/types/product.ts";
import type {ComponentProps} from "react";
import type {Receipt} from "#/features/receipt/types/Receipt.ts";
import type {BudgetData} from "#/shared/utils.ts";

export interface ProductCategoryListProps {
    roommates: Roommate[];
    categories: ProductCategory[];
    onProductPatched: (patchValue: ProductQuantityPatchFormValue) => void | Promise<void>;
    buyerRoommate: Record<number, boolean>;
}

export interface ProductBudgetProps {
    roommates: Roommate[];
    receipts: Receipt[];
    budget: BudgetData
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
    onProductCreated: (values: ProductFormValues) => void | Promise<void>;
}

export interface CreateProductFormProps {
    categories?: (ProductCategory | ProductCategoryDTO)[];
    roommates?: Roommate[];
    onSubmit: (values: ProductFormValues) => void | Promise<void>;
    onCancel?: () => void;
}

export interface PatchProductCategoryFormProps {
    productCategory: ProductCategory;
    onSubmit: (value: ProductQuantityPatchFormValue) => void | Promise<void>;
    onCancel?: () => void;
}

export interface DialogProductCategoryProps {
    productCategory: ProductCategory;
    roommates: Roommate[];
    onProductPatched: (patchValue: ProductQuantityPatchFormValue) => void | Promise<void>;
    buyerRoommate: Record<number, boolean>;
}
