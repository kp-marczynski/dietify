import {IRecipe} from 'app/shared/model/recipe.model';

export interface IMealRecipe {
    id?: number;
    recipeId?: number;
    amount?: number;
    recipe?: IRecipe;
}

export class MealRecipe implements IMealRecipe {
    public recipe?: IRecipe;

    constructor(
        public id?: number,
        public recipeId?: number,
        public amount?: number
    ) {
    }
}
