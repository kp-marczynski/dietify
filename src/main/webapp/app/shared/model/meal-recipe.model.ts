import {IRecipe} from 'app/shared/model/recipe.model';
import {IBasicNutritionResponse} from 'app/shared/model/basic-nutrition-response.model';

export interface IMealRecipe {
    id?: number;
    recipeId?: number;
    amount?: number;
    recipe?: IRecipe;
    basicNutritionData?: IBasicNutritionResponse;
}

export class MealRecipe implements IMealRecipe {
    public recipe?: IRecipe;

    constructor(
        public id?: number,
        public recipeId?: number,
        public amount?: number,
        public basicNutritionData?: IBasicNutritionResponse
    ) {
    }
}
