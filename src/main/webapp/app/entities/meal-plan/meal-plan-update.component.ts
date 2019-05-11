import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IMealPlan} from 'app/shared/model/meal-plan.model';
import {MealPlanService} from './meal-plan.service';
import {IMealPlanDay, MealPlanDay} from 'app/shared/model/meal-plan-day.model';
import {IMeal, Meal} from 'app/shared/model/meal.model';
import {ProductService} from 'app/entities/product';
import {IProduct} from 'app/shared/model/product.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {IMealProduct} from 'app/shared/model/meal-product.model';
import {RecipeService} from 'app/entities/recipe';
import {IRecipe} from 'app/shared/model/recipe.model';
import {IMealRecipe} from 'app/shared/model/meal-recipe.model';
import {IMealDefinition, MealDefinition} from 'app/shared/model/meal-definition.model';
import {MealUpdateComponent} from 'app/entities/meal';
import {MealPlanTab} from 'app/shared/model/enum/meal-plan-tab.enum';

@Component({
    selector: 'jhi-meal-plan-update',
    templateUrl: './meal-plan-update.component.html'
})
export class MealPlanUpdateComponent implements OnInit {
    mealPlan: IMealPlan;
    isSaving: boolean;
    creationDateDp: any;
    currentTab: MealPlanTab = MealPlanTab.SETTINGS;

    constructor(
        protected mealPlanService: MealPlanService,
        protected activatedRoute: ActivatedRoute,
        protected modalService: NgbModal,
        protected productService: ProductService,
        protected recipeService: RecipeService
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({mealPlan}) => {
            this.mealPlan = mealPlan;
            this.findProductsAndRecipes();
            this.numberOfDaysChanged();
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.mealPlan.id !== undefined) {
            this.subscribeToSaveResponse(this.mealPlanService.update(this.mealPlan));
        } else {
            this.subscribeToSaveResponse(this.mealPlanService.create(this.mealPlan));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMealPlan>>) {
        result.subscribe((res: HttpResponse<IMealPlan>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    numberOfDaysChanged() {
        if (this.mealPlan.numberOfDays && this.mealPlan.numberOfDays > 0) {
            if (!this.mealPlan.days) {
                this.mealPlan.days = [];
            }
            if (this.mealPlan.numberOfDays !== this.mealPlan.days.length) {
                const temp: IMealPlanDay[] = [];
                for (let i = 0; i < this.mealPlan.numberOfDays; ++i) {
                    if (i < this.mealPlan.days.length) {
                        temp.push(this.mealPlan.days[i]);
                    } else {
                        temp.push(new MealPlanDay(null, i + 1, []));
                    }
                }
                this.mealPlan.days = temp;
                this.numberOfMealsPerDayChanged();
            }
        }
    }

    numberOfMealsPerDayChanged() {
        if (this.mealPlan.numberOfMealsPerDay && this.mealPlan.numberOfMealsPerDay > 0) {
            if (this.mealPlan.numberOfDays) {
                if (!this.mealPlan.days || this.mealPlan.days.length !== this.mealPlan.numberOfDays) {
                    this.numberOfDaysChanged();
                } else {
                    for (const day of this.mealPlan.days) {
                        if (!day.meals) {
                            day.meals = [];
                        }
                        if (day.meals.length !== this.mealPlan.numberOfMealsPerDay) {
                            const temp: IMeal[] = [];
                            for (let i = 0; i < this.mealPlan.numberOfMealsPerDay; ++i) {
                                if (i < day.meals.length) {
                                    temp.push(day.meals[i]);
                                } else {
                                    temp.push(new Meal(null, i + 1, [], []));
                                }
                            }
                            day.meals = temp;
                        }
                    }
                    if (!this.mealPlan.mealDefinitions) {
                        this.mealPlan.mealDefinitions = [];
                    }
                    if (this.mealPlan.mealDefinitions.length !== this.mealPlan.numberOfMealsPerDay) {
                        const temp: IMealDefinition[] = [];
                        for (let i = 0; i < this.mealPlan.numberOfMealsPerDay; ++i) {
                            if (i < this.mealPlan.mealDefinitions.length) {
                                temp.push(this.mealPlan.mealDefinitions[i]);
                            } else {
                                temp.push(new MealDefinition(null, i + 1, 1, '12:00', 10));
                            }
                        }
                        this.mealPlan.mealDefinitions = temp;
                    }
                }
            }
        }
    }

    editMeal(meal: IMeal) {
        const modalRef = this.modalService.open(MealUpdateComponent, {windowClass: 'custom-modal'});

        modalRef.componentInstance.meal = meal;
        modalRef.componentInstance.passEntry.subscribe((receivedEntry: Meal) => {
            modalRef.close();

            meal.mealRecipes = receivedEntry.mealRecipes;
            meal.mealProducts = receivedEntry.mealProducts;
        });
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
            (res: HttpResponse<IProduct>) => mealProduct.product = res.body,
            (res: HttpErrorResponse) => mealProduct.product = null
        );
    }

    findRecipe(mealRecipe: IMealRecipe): void {
        this.recipeService.find(mealRecipe.recipeId).subscribe(
            (res: HttpResponse<IRecipe>) => mealRecipe.recipe = res.body,
            (res: HttpErrorResponse) => mealRecipe.recipe = null
        );
    }

    getTabs() {
        return Object.values(MealPlanTab);
    }
}
