import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {IMeal} from 'app/shared/model/meal.model';
import {IProduct, Product} from 'app/shared/model/product.model';
import {ProductComponent, ProductService} from 'app/entities/product';
import {IMealProduct, MealProduct} from 'app/shared/model/meal-product.model';
import {RecipeComponent, RecipeService} from 'app/entities/recipe';
import {IRecipe, Recipe} from 'app/shared/model/recipe.model';
import {IMealRecipe, MealRecipe} from 'app/shared/model/meal-recipe.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {IBasicNutritionResponse} from 'app/shared/model/basic-nutrition-response.model';
import {BasicNutritionType} from 'app/shared/model/enum/basic-nutritions.enum';

@Component({
    selector: 'jhi-meal-update',
    templateUrl: './meal-update.component.html'
})
export class MealUpdateComponent {
    @Input() meal: IMeal;
    @Input() expectedEnergy: number;

    @Output() passEntry: EventEmitter<IMeal> = new EventEmitter();
    @Output() mealChanged: EventEmitter<IMeal> = new EventEmitter();

    constructor(
        protected modalService: NgbModal,
        protected productService: ProductService,
        protected recipeService: RecipeService
    ) {
    }

    passBack(meal: IMeal): void {
        this.passEntry.emit(meal);
    }

    customTrackBy(index: number, obj: any): any {
        return index;
    }

    addIngredient(meal: IMeal) {
        const modalRef = this.modalService.open(ProductComponent, {windowClass: 'custom-modal'});

        modalRef.componentInstance.passEntry.subscribe((receivedEntry: Product) => {
            modalRef.close();

            const mealProduct = new MealProduct(null, receivedEntry.id, null, null);
            meal.mealProducts.push(mealProduct);
            this.findProduct(mealProduct);
        });
    }

    findProduct(mealProduct: IMealProduct): void {
        this.productService.find(mealProduct.productId).subscribe(
            (res: HttpResponse<IProduct>) => {
                mealProduct.product = res.body;
                this.emitMealChangedEvent();
            },
            (res: HttpErrorResponse) => mealProduct.product = null
        );
    }

    removeIngredientFromMeal(meal: IMeal, mealProduct: IMealProduct): void {
        meal.mealProducts = meal.mealProducts.filter(portion => portion !== mealProduct);
        this.emitMealChangedEvent();
    }

    addRecipe(meal: IMeal) {
        const modalRef = this.modalService.open(RecipeComponent, {windowClass: 'custom-modal'});

        modalRef.componentInstance.passEntry.subscribe((receivedEntry: Recipe) => {
            modalRef.close();

            const mealRecipe = new MealRecipe(null, receivedEntry.id, null);
            meal.mealRecipes.push(mealRecipe);
            this.findRecipe(mealRecipe);
        });
    }

    findRecipe(mealRecipe: IMealRecipe): void {
        this.recipeService.find(mealRecipe.recipeId).subscribe(
            (res: HttpResponse<IRecipe>) => mealRecipe.recipe = res.body,
            (res: HttpErrorResponse) => mealRecipe.recipe = null
        );
    }

    removeRecipeFromMeal(meal: IMeal, mealRecipe: IMealRecipe) {
        meal.mealRecipes = meal.mealRecipes.filter(portion => portion !== mealRecipe);
    }

    emitMealChangedEvent() {
        this.mealChanged.emit(this.meal);
    }

    calcPercent(currentValue: number, desiredValue: number): number {
        return Math.floor(((currentValue / desiredValue) - 1) * 100);
    }

    getSummaryIcon(nutritionData: IBasicNutritionResponse, nutritionKey: string): string {
        const percent = this.calcPercent(this.getNutritionValue(nutritionData, nutritionKey), this.expectedEnergy);
        if (Math.abs(percent) <= 3) {
            return 'check-circle';
        } else if (percent > 3) {
            return 'arrow-circle-up';
        } else {
            return 'arrow-circle-down';
        }
    }

    getSummaryButtonClass(nutritionData: IBasicNutritionResponse, nutritionKey: string): string {
        const percent = this.calcPercent(this.getNutritionValue(nutritionData, nutritionKey), this.expectedEnergy);
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
}
