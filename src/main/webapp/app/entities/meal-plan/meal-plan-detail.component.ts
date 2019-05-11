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
import {MealDetailComponent, MealUpdateComponent} from 'app/entities/meal';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MealPlanTab} from 'app/shared/model/enum/meal-plan-tab.enum';

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
        protected modalService: NgbModal) {
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
                mealProduct.householdMeasureDescription = mealProduct.product.householdMeasures.find(measure => measure.id === mealProduct.householdMeasureId).description;
            },
            (res: HttpErrorResponse) => mealProduct.product = null
        );
    }

    findRecipe(mealRecipe: IMealRecipe): void {
        this.recipeService.find(mealRecipe.recipeId).subscribe(
            (res: HttpResponse<IRecipe>) => mealRecipe.recipe = res.body,
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
}
