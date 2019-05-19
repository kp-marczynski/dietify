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
import {BasicNutritionType} from 'app/shared/model/enum/basic-nutritions.enum';
import {MealPlanSenderComponent} from 'app/entities/meal-plan/meal-plan-sender/meal-plan-sender.component';

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
                mealProduct.householdMeasureDescription = prod ? prod.description : 'g';
            },
            (res: HttpErrorResponse) => mealProduct.product = null
        );
        this.productService.getBasicNutrtions([new BasicNutritionRequest(mealProduct.productId, mealProduct.amount, mealProduct.householdMeasureId)])
            .subscribe((res: HttpResponse<IBasicNutritionResponse>) => {
                mealProduct.basicNutritionData = res.body;
                this.updateDays();
            });
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
                        this.updateDays();
                    });
            },
            (res: HttpErrorResponse) => mealRecipe.recipe = null
        );
    }

    viewMeal(meal: IMeal) {
        const modalRef = this.modalService.open(MealDetailComponent, {windowClass: 'custom-modal'});

        modalRef.componentInstance.meal = meal;
        modalRef.componentInstance.expectedEnergy = this.mealPlan.mealDefinitions[meal.ordinalNumber - 1].percentOfEnergy * this.getExpectedDailyEnergy();

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

    updateDays(): void {
        for (const day of this.mealPlan.days) {
            this.getNutritionData(day);
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
            if (mealProduct.basicNutritionData) {
                result.addNutritions(mealProduct.basicNutritionData);
            }
        }
        for (const mealRecipe of meal.mealRecipes) {
            if (mealRecipe.basicNutritionData) {
                result.addNutritions(mealRecipe.basicNutritionData);
            }
        }
        result.floor();
        meal.nutritionData = result;
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
        return Math.floor(((currentValue / desiredValue) - 1) * 100);
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

    sendMealPlan() {
        const modalRef = this.modalService.open(MealPlanSenderComponent, {windowClass: 'custom-modal'});

        modalRef.componentInstance.mealPlan = this.mealPlan;

        modalRef.componentInstance.passEntry.subscribe(() => {
            modalRef.close();
        });
    }
}
