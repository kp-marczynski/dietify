import {IMealRecipe} from 'app/shared/model/meal-recipe.model';
import {IMealProduct} from 'app/shared/model/meal-product.model';
import {IBasicNutritionResponse} from 'app/shared/model/basic-nutrition-response.model';

export interface IMeal {
    id?: number;
    ordinalNumber?: number;
    mealRecipes?: IMealRecipe[];
    mealProducts?: IMealProduct[];
    nutritionData?: IBasicNutritionResponse;
}

export class Meal implements IMeal {
    nutritionData?: IBasicNutritionResponse;

    constructor(
        public id?: number,
        public ordinalNumber?: number,
        public mealRecipes?: IMealRecipe[],
        public mealProducts?: IMealProduct[]
    ) {
    }
}
