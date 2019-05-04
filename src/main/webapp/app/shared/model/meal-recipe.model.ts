import { IMeal } from 'app/shared/model/meal.model';

export interface IMealRecipe {
    id?: number;
    recipeId?: number;
    amount?: number;
    meal?: IMeal;
}

export class MealRecipe implements IMealRecipe {
    constructor(public id?: number, public recipeId?: number, public amount?: number, public meal?: IMeal) {}
}
