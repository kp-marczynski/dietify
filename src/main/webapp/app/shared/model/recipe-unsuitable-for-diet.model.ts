export interface IRecipeUnsuitableForDiet {
    id?: number;
    dietTypeId?: number;
}

export class RecipeUnsuitableForDiet implements IRecipeUnsuitableForDiet {
    constructor(public id?: number, public dietTypeId?: number) {
    }
}
