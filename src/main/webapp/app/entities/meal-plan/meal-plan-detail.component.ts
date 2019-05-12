import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {IMealPlan} from 'app/shared/model/meal-plan.model';
import {IMealProduct} from 'app/shared/model/meal-product.model';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {IProduct} from 'app/shared/model/product.model';
import {IMealRecipe} from 'app/shared/model/meal-recipe.model';
import {IRecipe} from 'app/shared/model/recipe.model';
import {ProductService} from 'app/entities/product';
import {RecipeService} from 'app/entities/recipe';
import {IMeal, Meal} from 'app/shared/model/meal.model';
import {MealDetailComponent} from 'app/entities/meal';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MealPlanTab} from 'app/shared/model/enum/meal-plan-tab.enum';
import {BasicNutritionRequest, IBasicNutritionRequest} from 'app/shared/model/basic-nutrition-request.model';
import {BasicNutritionResponse, IBasicNutritionResponse} from 'app/shared/model/basic-nutrition-response.model';
import {IMealPlanDay} from 'app/shared/model/meal-plan-day.model';
import {CaloriesConverterService} from 'app/entities/meal-plan/calories-converter.service';

@Component({
    selector: 'jhi-meal-plan-detail',
    templateUrl: './meal-plan-detail.component.html'
})
export class MealPlanDetailComponent implements OnInit {
    mealPlan: IMealPlan;
    currentTab: MealPlanTab = MealPlanTab.SETTINGS;

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected productService: ProductService,
        protected recipeService: RecipeService,
        protected modalService: NgbModal,
        protected caloriesConverter: CaloriesConverterService) {
    }

    ngOnInit() {
        this.activatedRoute.data.subscribe(({mealPlan}) => {
            this.mealPlan = mealPlan;
            this.findProductsAndRecipes();
        });
    }

    previousState() {
        window.history.back();
    }

    findProductsAndRecipes(): void {
        if (this.mealPlan.days) {
            for (const day of this.mealPlan.days) {
                if (day.meals) {
                    for (const meal of day.meals) {
                        if (meal.mealProducts) {
                            for (const product of meal.mealProducts) {
                                this.findProduct(product);
                            }
                        }
                        if (meal.mealRecipes) {
                            for (const recipe of meal.mealRecipes) {
                                this.findRecipe(recipe);
                            }
                        }
                    }
                }
            }
        }
    }

    findProduct(mealProduct: IMealProduct): void {
        this.productService.find(mealProduct.productId).subscribe(
            (res: HttpResponse<IProduct>) => {
                mealProduct.product = res.body;
                const prod = mealProduct.product.householdMeasures.find(measure => measure.id === mealProduct.householdMeasureId);
                mealProduct.householdMeasureDescription = prod ? prod.description : '';
            },
            (res: HttpErrorResponse) => mealProduct.product = null
        );
        this.productService.getBasicNutrtions([new BasicNutritionRequest(mealProduct.productId, mealProduct.amount, mealProduct.householdMeasureId)])
            .subscribe((res: HttpResponse<IBasicNutritionResponse>) => mealProduct.basicNutritionData = res.body);
    }

    findRecipe(mealRecipe: IMealRecipe): void {
        this.recipeService.find(mealRecipe.recipeId).subscribe(
            (res: HttpResponse<IRecipe>) => {
                mealRecipe.recipe = res.body;
                const request: IBasicNutritionRequest[] = [];
                for (const section of mealRecipe.recipe.recipeSections) {
                    for (const portion of section.productPortions) {
                        request.push(new BasicNutritionRequest(portion.productId, portion.amount, portion.householdMeasureId));
                    }
                }
                this.productService.getBasicNutrtions(request)
                    .subscribe((res2: HttpResponse<IBasicNutritionResponse>) => {
                        mealRecipe.basicNutritionData = new BasicNutritionResponse(0, 0, 0, 0, 0);
                        mealRecipe.basicNutritionData.addNutritions(res2.body);

                        mealRecipe.basicNutritionData.scaleForWeight(mealRecipe.amount);
                    });
            },
            (res: HttpErrorResponse) => mealRecipe.recipe = null
        );
    }

    viewMeal(meal: IMeal) {
        const modalRef = this.modalService.open(MealDetailComponent, {windowClass: 'custom-modal'});

        modalRef.componentInstance.meal = meal;
        modalRef.componentInstance.passEntry.subscribe((receivedEntry: Meal) => {
            modalRef.close();
        });
    }

    getTabs() {
        return Object.values(MealPlanTab);
    }

    changeCurrentTab(tabName: string) {
        this.currentTab = MealPlanTab[tabName];
    }

    getNutritionData(day: IMealPlanDay): IBasicNutritionResponse {
        const result = new BasicNutritionResponse(0, 0, 0, 0, 0);
        for (const meal of day.meals) {
            for (const mealProduct of meal.mealProducts) {
                result.addNutritions(mealProduct.basicNutritionData);
            }
            for (const mealRecipe of meal.mealRecipes) {
                result.addNutritions(mealRecipe.basicNutritionData);
            }
        }
        result.floor();
        return result;
    }

    getExpectedDailyCarbohydrates(): number {
        return Math.floor(this.caloriesConverter.calcCarbohydrateGrams(this.mealPlan.percentOfCarbohydrates * this.mealPlan.totalDailyEnergyKcal / 100));
    }

    getExpectedDailyEnergy(): number {
        return Math.floor(this.mealPlan.totalDailyEnergyKcal);
    }

    getExpectedDailyFat(): number {
        return Math.floor(this.caloriesConverter.calcFatGrams(this.mealPlan.percentOfFat * this.mealPlan.totalDailyEnergyKcal / 100));
    }

    getExpectedDailyProtein(): number {
        return Math.floor(this.caloriesConverter.calcProteinGrams(this.mealPlan.percentOfProtein * this.mealPlan.totalDailyEnergyKcal / 100));
    }

    calcPercent(currentValue: number, desiredValue: number): number {
        return Math.floor(((currentValue / desiredValue) - 1) * 100);
    }

    getSummaryIcon(currentValue: number, desiredValue: number): string {
        const percent = this.calcPercent(currentValue, desiredValue);
        if (Math.abs(percent) <= 3) {
            return 'check-circle';
        } else if (percent > 3) {
            return 'arrow-circle-up';
        } else {
            return 'arrow-circle-down';
        }
    }

    getSummaryButtonClass(currentValue: number, desiredValue: number): string {
        const percent = this.calcPercent(currentValue, desiredValue);
        if (Math.abs(percent) <= 3) {
            return 'btn-success';
        } else if (Math.abs(percent) <= 6) {
            return 'btn-warning';
        } else {
            return 'btn-danger';
        }
    }
}
