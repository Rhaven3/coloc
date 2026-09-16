import type {Roommate} from "#/features/roommate/types/roommate.ts";
import type {ProductCategory} from "#/features/product/types/product.ts";

export interface ProductCategoryListProps {
    roommates: Roommate[];
    categories: ProductCategory[];
}

export interface ProductBudgetProps {
    roommates: Roommate[];
    categories: ProductCategory[];
}

export interface ProductCategoryCardProps {
    category: ProductCategory;
    isLowQuantity: boolean;
    lastBuyers: Roommate[];
    nextBuyers: Roommate[];
}