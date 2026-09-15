import type {Dispatch, SetStateAction} from "react";
import {apiClient} from "#/api-client.ts";
import type {Product} from "#/features/product/types/product.ts";

export const productService = {
    getProducts: async (setProducts: Dispatch<SetStateAction<Product[]>>) => {
        const response = await apiClient.get<Product[]>(`/api/products`);
        setProducts(response.data)
    }
}