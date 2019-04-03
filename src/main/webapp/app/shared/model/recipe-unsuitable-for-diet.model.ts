import { IRecipe } from 'app/shared/model/recipe.model';

export interface IRecipeUnsuitableForDiet {
    id?: number;
    dietTypeId?: number;
    recipe?: IRecipe;
}

export class RecipeUnsuitableForDiet implements IRecipeUnsuitableForDiet {
    constructor(public id?: number, public dietTypeId?: number, public recipe?: IRecipe) {}
}
