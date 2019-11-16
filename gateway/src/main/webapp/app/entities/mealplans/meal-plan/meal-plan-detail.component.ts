import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IMealPlan } from 'app/shared/model/mealplans/meal-plan.model';
import { IRecipe } from 'app/shared/model/recipes/recipe.model';
import { IProduct } from 'app/shared/model/products/product.model';
import { ProductService } from 'app/entities/products/product';
import { RecipeService } from 'app/entities/recipes/recipe';
import { BasicNutritionType } from 'app/shared/model/mealplans/enum/basic-nutritions.enum';
import { CaloriesConverterService } from 'app/entities/mealplans/meal-plan/calories-converter.service';
import { IMealPlanDay } from 'app/shared/model/mealplans/meal-plan-day.model';
import { BasicNutritionResponse, IBasicNutritionResponse } from 'app/shared/model/mealplans/basic-nutrition-response.model';
import { IMeal } from 'app/shared/model/mealplans/meal.model';
import { IMealProduct } from 'app/shared/model/mealplans/meal-product.model';
import { MealTypeService } from 'app/entities/recipes/meal-type';
import { IMealType } from 'app/shared/model/recipes/meal-type.model';
import { JhiAlertService } from 'ng-jhipster';

@Component({
  selector: 'jhi-meal-plan-detail',
  templateUrl: './meal-plan-detail.component.html'
})
export class MealPlanDetailComponent implements OnInit {
  mealPlan: IMealPlan;
  recipes: IRecipe[] = [];
  products: IProduct[] = [];
  queueItems = 0;
  mealTypes: IMealType[];

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected caloriesConverter: CaloriesConverterService,
    protected productService: ProductService,
    protected mealTypeService: MealTypeService,
    protected jhiAlertService: JhiAlertService,
    protected recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.mealTypeService
      .query()
      .subscribe((res: HttpResponse<IMealType[]>) => (this.mealTypes = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.activatedRoute.data.subscribe(({ mealPlan }) => {
      this.mealPlan = mealPlan;
      for (const day of this.mealPlan.days) {
        for (const meal of day.meals) {
          for (const mealProduct of meal.mealProducts) {
            if (!this.products.find(product => product.id === mealProduct.productId)) {
              this.queueItems++;
              this.productService.find(mealProduct.productId).subscribe(res => (this.products[mealProduct.productId] = res.body));
            }
          }
          for (const mealRecipe of meal.mealRecipes) {
            if (!this.recipes.find(recipe => recipe.id === mealRecipe.recipeId)) {
              this.queueItems++;
              this.recipeService.find(mealRecipe.recipeId).subscribe(res => (this.recipes[mealRecipe.recipeId] = res.body));
            }
          }
        }
      }
      this.getNutritionDataWhenQueueMatch();
    });
  }

  findMealTypeDescription(mealTypeId): string {
    return this.mealTypes.find(res => res.id === mealTypeId).name;
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  previousState() {
    window.history.back();
  }

  getNutritionDataWhenQueueMatch() {
    console.log(this.queueItems);
    if (this.queueItems <= this.recipes.length + this.products.length) {
      for (const day of this.mealPlan.days) {
        this.getNutritionData(day);
      }
      this.mealPlan.days = [...this.mealPlan.days];
    } else {
      setTimeout(() => this.getNutritionDataWhenQueueMatch(), 1000);
    }
  }

  getNutritionData(day: IMealPlanDay): IBasicNutritionResponse {
    const result = new BasicNutritionResponse(0, 0, 0, 0, 0);
    for (const meal of day.meals) {
      result.addNutritions(this.getNutritionDataForMeal(meal));
    }
    result.floor();
    day.nutritionData = result;
    return result;
  }

  getNutritionDataForMeal(meal: IMeal) {
    const result = new BasicNutritionResponse(0, 0, 0, 0, 0);
    for (const mealProduct of meal.mealProducts) {
      if (this.products[mealProduct.productId]) {
        const product = this.products[mealProduct.productId];
        const scale =
          (mealProduct.amount *
            (mealProduct.householdMeasureId
              ? product.householdMeasures.find(measure => measure.id === mealProduct.householdMeasureId).gramsWeight
              : 1)) /
          100;
        result.weight += scale * 100;
        result.energy += product.basicNutritionData.energy * scale;
        result.fat += product.basicNutritionData.fat * scale;
        result.carbohydrates += product.basicNutritionData.carbohydrates * scale;
        result.protein += product.basicNutritionData.protein * scale;
      }
    }
    for (const mealRecipe of meal.mealRecipes) {
      if (this.recipes[mealRecipe.recipeId]) {
        const recipe = this.recipes[mealRecipe.recipeId];
        const scale = mealRecipe.amount / 100;
        result.weight += mealRecipe.amount;
        result.energy += recipe.basicNutritionData.energy * scale;
        result.fat += recipe.basicNutritionData.fat * scale;
        result.carbohydrates += recipe.basicNutritionData.carbohydrates * scale;
        result.protein += recipe.basicNutritionData.protein * scale;
      }
    }
    result.floor();
    return result;
  }

  getExpectedDailyCarbohydrates(): number {
    return Math.floor(
      this.caloriesConverter.calcCarbohydrateGrams((this.mealPlan.percentOfCarbohydrates * this.mealPlan.totalDailyEnergy) / 100)
    );
  }

  getExpectedDailyEnergy(): number {
    return Math.floor(this.mealPlan.totalDailyEnergy);
  }

  getExpectedDailyFat(): number {
    return Math.floor(this.caloriesConverter.calcFatGrams((this.mealPlan.percentOfFat * this.mealPlan.totalDailyEnergy) / 100));
  }

  getExpectedDailyProtein(): number {
    return Math.floor(this.caloriesConverter.calcProteinGrams((this.mealPlan.percentOfProtein * this.mealPlan.totalDailyEnergy) / 100));
  }

  getDailyValue(nutritionKey: string) {
    switch (BasicNutritionType[nutritionKey]) {
      case BasicNutritionType.Energy:
        return this.getExpectedDailyEnergy();
      case BasicNutritionType.Carbohydrates:
        return this.getExpectedDailyCarbohydrates();
      case BasicNutritionType.Fat:
        return this.getExpectedDailyFat();
      case BasicNutritionType.Protein:
        return this.getExpectedDailyProtein();
    }
  }

  calcPercent(currentValue: number, desiredValue: number): number {
    return Math.floor((currentValue / desiredValue - 1) * 100);
  }

  getSummaryIcon(nutritionData: IBasicNutritionResponse, nutritionKey: string): string {
    const percent = this.calcPercent(this.getNutritionValue(nutritionData, nutritionKey), this.getDailyValue(nutritionKey));
    if (Math.abs(percent) <= 3) {
      return 'check-circle';
    } else if (percent > 3) {
      return 'arrow-circle-up';
    } else {
      return 'arrow-circle-down';
    }
  }

  getSummaryButtonClass(nutritionData: IBasicNutritionResponse, nutritionKey: string): string {
    const percent = this.calcPercent(this.getNutritionValue(nutritionData, nutritionKey), this.getDailyValue(nutritionKey));
    if (Math.abs(percent) <= 3) {
      return 'btn-success';
    } else if (Math.abs(percent) <= 6) {
      return 'btn-warning';
    } else {
      return 'btn-danger';
    }
  }

  getNutritionValue(nutritionData: IBasicNutritionResponse, nutritionKey: string) {
    switch (BasicNutritionType[nutritionKey]) {
      case BasicNutritionType.Energy:
        return nutritionData.energy;
      case BasicNutritionType.Carbohydrates:
        return nutritionData.carbohydrates;
      case BasicNutritionType.Fat:
        return nutritionData.fat;
      case BasicNutritionType.Protein:
        return nutritionData.protein;
    }
  }

  getBasicNutritionsKeys(): string[] {
    return Object.keys(BasicNutritionType);
  }

  getHouseholdMeasure(mealProduct: IMealProduct): string {
    let result = 'g';
    if (mealProduct.householdMeasureId) {
      const product = this.products[mealProduct.productId];
      if (product) {
        const householdMeasure = product.householdMeasures.find(measure => measure.id === mealProduct.householdMeasureId);
        if (householdMeasure) {
          result = householdMeasure.description;
        }
      }
    }
    return result;
  }
}
