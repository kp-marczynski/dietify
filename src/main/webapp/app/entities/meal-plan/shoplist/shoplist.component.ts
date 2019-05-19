import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IMealPlan} from 'app/shared/model/meal-plan.model';
import {ShoplistItem} from 'app/shared/model/shoplist-item.model';
import {ProductService} from 'app/entities/product';
import {IProduct} from 'app/shared/model/product.model';
import {HttpResponse} from '@angular/common/http';

@Component({
    selector: 'jhi-shoplist',
    templateUrl: './shoplist.component.html',
    styles: []
})
export class ShoplistComponent implements OnInit {

    @Output() passEntry: EventEmitter<boolean> = new EventEmitter();

    mealPlan: IMealPlan;
    shoplistItems: ShoplistItem[] = [];

    constructor(private productService: ProductService) {
    }

    ngOnInit() {
    }

    createShoplistForMealPlan(mealPlan: IMealPlan) {
        console.log('create shoplist');
        this.mealPlan = mealPlan;
        for (const day of this.mealPlan.days) {
            for (const meal of day.meals) {
                for (const mealProduct of meal.mealProducts) {
                    this.addProductToShoplist(mealProduct.product, mealProduct.householdMeasureId, mealProduct.amount);
                }
                for (const mealRecipe of meal.mealRecipes) {
                    const recipeScaleFactor = mealRecipe.amount / mealRecipe.basicNutritionData.weight;
                    for (const section of mealRecipe.recipe.recipeSections) {
                        for (const productPortion of section.productPortions) {
                            if (productPortion.product) {
                                this.addProductToShoplist(productPortion.product, productPortion.householdMeasureId, productPortion.amount * recipeScaleFactor);
                            } else {
                                this.productService.find(productPortion.productId).subscribe((res: HttpResponse<IProduct>) => this.addProductToShoplist(res.body, productPortion.householdMeasureId, productPortion.amount * recipeScaleFactor));
                            }
                        }
                    }
                }
            }
        }
    }

    private addProductToShoplist(product: IProduct, measureId: number, amount: number) {
        const gramsMultiplier = measureId ? product.householdMeasures.find(measure => measure.id === measureId).gramsWeight : 1;

        let shoplistItem = this.shoplistItems.find(item => item.productId === product.id);
        if (shoplistItem) {
            shoplistItem.amount += gramsMultiplier * amount;
        } else {
            shoplistItem = new ShoplistItem(product.id, product.description, amount * gramsMultiplier);
            this.shoplistItems.push(shoplistItem);
        }
        shoplistItem.amount = Math.ceil(shoplistItem.amount);
    }
}
