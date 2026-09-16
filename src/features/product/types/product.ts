
export type ProductCategoryDTO = {
    id: number;
    name: string;
    unite: string;
    treshold: number;
}

export type ProductCategory = {
    id: number;
    name: string;
    unite: string;
    treshold: number;
    quantity: number;
    price: number;
    buyers: number[];
    products: Product[]
}

export type Product = {
    id: number;
    quantity: number;
    price: number;
    category: number
    buyer: number;
};
