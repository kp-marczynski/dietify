import { IRecipe } from 'app/shared/model/recipe.model';

export interface IRecipeSuitableForDiet {
    id?: number;
    dietTypeId?: number;
    recipe?: IRecipe;
}

export class RecipeSuitableForDiet implements IRecipeSuitableForDiet {
    constructor(public id?: number, public dietTypeId?: number, public recipe?: IRecipe) {}
}
