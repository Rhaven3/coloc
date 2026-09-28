import {useEffect, useMemo, useState} from "react";
import {roommateService} from "#/features/roommate/roommate-service.ts";
import {TaskList} from "#/features/task/task-list.tsx";
import type {Roommate} from "#/features/roommate/types/roommate.ts";
import {ReminderList} from "#/features/reminder/reminder-list.tsx";
import {ProductCategoryList} from "#/features/product/product-category-list.tsx";
import {ReceiptBudget} from "#/features/receipt/receipt-budget.tsx";
import type {Product, ProductCategory} from "#/features/product/types/product.ts";
import {productService} from "#/features/product/product-service.ts";
import {Panel} from "#/shared/components/ui/Panel.tsx";
import {days} from "#/lib/utils.ts";
import {CreateProductButton} from "#/features/product/components/create-product-button.tsx";
import type {Receipt} from "#/features/receipt/types/Receipt.ts";
import {receiptService} from "#/features/receipt/receipt-service.ts";
import type {BudgetData} from "#/shared/utils.ts";


export default function Index() {
    const [roommates, setRoommates] = useState<Roommate[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const [receipts, setReceipts] = useState<Receipt[]>([]);
    const date = new Date();

    useEffect(() => {
        roommateService.getRoommates(setRoommates)
        productService.getProducts(setProducts)
        receiptService.getMonthlyReceipts(setReceipts)
        // receiptService.getReceipts(setReceipts)
    }, []);

    useEffect(() => {
        productService.getProductCategories(setCategories, products)
    }, [products]);


    // BUDGET
    const depenses = useMemo(() => {
        const base: Record<number, number> = {};
        for (const r of receipts) {
            if (!base[r.roommateId]) base[r.roommateId] = 0;
            base[r.roommateId] += r.price
        }
        return base;
    }, [receipts]);

    const total = Object.values(depenses).reduce((a, b) => a + b, 0);
    const part = roommates.length > 0 ? total / roommates.length : 0;

    const buyerRoommate = useMemo(() => {
        const buyers: Record<number, boolean> = {};
        for (const roommate of roommates) {
            buyers[roommate.id] = depenses[roommate.id] - part < 0;
        }
        return buyers;
    }, [depenses, part, roommates]);

    const budget: BudgetData = {
        total,
        part,
        depenses,
    }


    if (roommates.length === 0) {
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
                       meta={"Aujourd'hui · " + days[date.getDay()].long}
                >
                    <TaskList roommates={roommates}/>
                </Panel>
            </div>

            <div className="rise rise-d2 lg:col-span-7">
                <Panel className="h-full"
                       title="Produits communs"
                       meta={
                           <div className="flex items-center justify-between gap-20">
                               <CreateProductButton
                                   categories={categories}
                                   roommates={roommates}
                                   onProductCreated={async (values) => {
                                       await productService.createProduct(values, setProducts);
                                   }}
                               />
                               Inventaire · {categories.length}
                           </div>
                       }
                >
                    <ProductCategoryList
                        roommates={roommates}
                        categories={categories}
                        onProductPatched={async (patchValue) => {
                            await productService.patchProductQuantity(patchValue, setProducts);
                        }}
                        buyerRoommate={buyerRoommate}
                    />
                </Panel>
            </div>
            <div className="rise rise-d3 lg:col-span-12">
                <ReceiptBudget
                    roommates={roommates}
                    receipts={receipts}
                    budget={budget}
                />
            </div>
        </>
    );
}
