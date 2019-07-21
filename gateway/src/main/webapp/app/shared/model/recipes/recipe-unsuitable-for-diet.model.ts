export interface IRecipeUnsuitableForDiet {
  id?: number;
  dietTypeId?: number;
  recipeName?: string;
  recipeId?: number;
}

export class RecipeUnsuitableForDiet implements IRecipeUnsuitableForDiet {
  constructor(public id?: number, public dietTypeId?: number, public recipeName?: string, public recipeId?: number) {}
}
