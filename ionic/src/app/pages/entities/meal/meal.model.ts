import { BaseEntity } from 'src/model/base-entity';
import { MealRecipe } from '../meal-recipe/meal-recipe.model';
import { MealProduct } from '../meal-product/meal-product.model';
import { MealPlanDay } from '../meal-plan-day/meal-plan-day.model';

export class Meal implements BaseEntity {
    constructor(
        public id?: number,
        public ordinalNumber?: number,
        public mealRecipes?: MealRecipe[],
        public mealProducts?: MealProduct[],
        public mealPlanDay?: MealPlanDay,
    ) {
    }
}
