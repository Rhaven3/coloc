import type {Dispatch, SetStateAction} from "react";
import {apiClient} from "#/api-client.ts";
import type {Product, ProductCategory, ProductCategoryDTO} from "#/features/product/types/product.ts";

export const productService = {
    getProducts: async (setProducts?: Dispatch<SetStateAction<Product[]>>) => {
        const response = await apiClient.get<Product[]>(`/api/products`);
        if (setProducts) {
            setProducts(response.data)
        }
        return response.data;
    },

    getProductCategories: async (setProductCategories: Dispatch<SetStateAction<ProductCategory[]>>, products:Product[]) => {
        const response = await apiClient.get<ProductCategoryDTO[]>(`/api/product-categories`);
        const categories = response.data as ProductCategory[];
        for (const category of categories) {
            // initialise new properties
            category.quantity = 0;
            category.price = 0
            const tmpBuyers = new Set<number>();
            category.buyers = [];
            category.products = []

            // append all product to category
            const subproducts = products.filter((product) => product.category === category.id);
            for (const subproduct of subproducts) {

                category.price += subproduct.price;
                tmpBuyers.add(subproduct.buyer)
                category.quantity += subproduct.quantity;
                category.products.push(subproduct);
            }
            category.buyers = [...tmpBuyers]
        }
        setProductCategories(categories)
    }
}