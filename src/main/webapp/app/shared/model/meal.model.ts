import { IMealPlanDay } from 'app/shared/model/meal-plan-day.model';
import { IMealRecipe } from 'app/shared/model/meal-recipe.model';
import { IMealProduct } from 'app/shared/model/meal-product.model';

export interface IMeal {
    id?: number;
    ordinalNumber?: number;
    day?: IMealPlanDay;
    mealRecipes?: IMealRecipe[];
    mealProducts?: IMealProduct[];
}

export class Meal implements IMeal {
    constructor(
        public id?: number,
        public ordinalNumber?: number,
        public day?: IMealPlanDay,
        public mealRecipes?: IMealRecipe[],
        public mealProducts?: IMealProduct[]
    ) {}
}
