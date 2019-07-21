export interface IRecipeSuitableForDiet {
  id?: number;
  dietTypeId?: number;
  recipeName?: string;
  recipeId?: number;
}

export class RecipeSuitableForDiet implements IRecipeSuitableForDiet {
  constructor(public id?: number, public dietTypeId?: number, public recipeName?: string, public recipeId?: number) {}
}
