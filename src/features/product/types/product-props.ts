import type {Roommate} from "#/features/roommate/types/roommate.ts";
import type {Product} from "#/features/product/types/product.ts";
import type {Skin} from "#/shared/components/ui.tsx";

export interface ProductListProps {
    roommates: Roommate[];
    products: Product[];
}

export interface ProductBudgetProps {
    roommates: Roommate[];
    products: Product[];
}

export interface ProductCardProps {
    product: Product;
    isLowQuantity: boolean;
    lastBuyer: Roommate;
    nextBuyer: Roommate;
    skin?: Skin
}