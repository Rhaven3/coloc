import {useEffect, useState} from "react";
import {roommateService} from "#/features/roommate/roommate-service.ts";
import {TaskList} from "#/features/task/task-list.tsx";
import type {Roommate} from "#/features/roommate/types/roommate.ts";
import {ReminderList} from "#/features/reminder/reminder-list.tsx";
import {ProductCategoryList} from "#/features/product/product-category-list.tsx";
import {ProductBudget} from "#/features/product/product-budget.tsx";
import type {Product, ProductCategory} from "#/features/product/types/product.ts";
import {productService} from "#/features/product/product-service.ts";
import {Panel} from "#/shared/components/ui/Panel.tsx";
import {days} from "#/lib/utils.ts";


export default function Index() {
    const [roommates, setRoommates] = useState<Roommate[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const date = new Date();

    useEffect(() => {
        roommateService.getRoommates(setRoommates)
        productService.getProducts(setProducts)
    }, []);

    useEffect(() => {
        productService.getProductCategories(setCategories, products)
    }, [products]);

    if (roommates.length === 0 || categories[0].buyers.length === 0) {
        return (<></>)
    }
    return (
        <>
            <div className="rise rise-d3 lg:col-span-12">
                <Panel title="Rappels de vie">
                    <ReminderList/>
                </Panel>
            </div>

            <div className="rise rise-d1 lg:col-span-5">
                <Panel className="h-full"
                       title="Planning du ménage"
                       meta={"Aujourd'hui · " + days[date.getDay() - 1].long}
                >
                    <TaskList roommates={roommates}/>
                </Panel>
            </div>

            <div className="rise rise-d2 lg:col-span-7">
                <Panel className="h-full"
                       title="Produits communs"
                       meta={`Inventaire · ${categories.length}`}
                >
                    <ProductCategoryList roommates={roommates} categories={categories}/>
                </Panel>
            </div>

            <div className="rise rise-d3 lg:col-span-12">
                <ProductBudget roommates={roommates} categories={categories}/>
            </div>
        </>
    );
}
