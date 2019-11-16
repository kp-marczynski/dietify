import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Shoplist, ShoplistItem } from 'app/shared/model/appointments/shoplist-item.model';

import { HttpResponse } from '@angular/common/http';
import { IMealPlan } from 'app/shared/model/mealplans/meal-plan.model';
import { ProductService } from 'app/entities/products/product';
import { IProduct } from 'app/shared/model/products/product.model';
import { MealPlanService } from 'app/entities/mealplans/meal-plan';
import { AppointmentService } from 'app/entities/appointments/appointment';
import { RecipeService } from 'app/entities/recipes/recipe';
import { IRecipe } from 'app/shared/model/recipes/recipe.model';

@Component({
  selector: 'jhi-shoplist',
  templateUrl: './shoplist.component.html',
  styles: []
})
export class ShoplistComponent implements OnInit {
  @Output() passEntry: EventEmitter<boolean> = new EventEmitter();

  mealPlan: IMealPlan;
  shoplistItems: ShoplistItem[] = [];
  recipient: string;
  isSending: boolean;

  constructor(
    private productService: ProductService,
    private mealPlanService: MealPlanService,
    private appointmentService: AppointmentService,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {}

  createShoplistForMealPlan(mealPlan: IMealPlan) {
    console.log('create shoplist');
    this.mealPlan = mealPlan;
    for (const day of this.mealPlan.days) {
      for (const meal of day.meals) {
        for (const mealProduct of meal.mealProducts) {
          this.productService
            .find(mealProduct.productId)
            .subscribe((res: HttpResponse<IProduct>) =>
              this.addProductToShoplist(res.body, mealProduct.householdMeasureId, mealProduct.amount)
            );
        }
        for (const mealRecipe of meal.mealRecipes) {
          this.recipeService.find(mealRecipe.id).subscribe((resRecipe: HttpResponse<IRecipe>) => {
            const recipe = resRecipe.body;
            const recipeScaleFactor = mealRecipe.amount / recipe.totalGramsWeight;
            for (const section of recipe.recipeSections) {
              for (const productPortion of section.productPortions) {
                this.productService
                  .find(productPortion.productId)
                  .subscribe((res: HttpResponse<IProduct>) =>
                    this.addProductToShoplist(res.body, productPortion.householdMeasureId, productPortion.amount * recipeScaleFactor)
                  );
              }
            }
          });
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

  send() {
    this.isSending = true;
    this.appointmentService.sendShoplist(new Shoplist(this.shoplistItems, this.recipient)).subscribe();
    this.passEntry.emit(true);
  }
}
