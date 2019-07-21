export interface IMealRecipe {
  id?: number;
  recipeId?: number;
  amount?: number;
  mealId?: number;
}

export class MealRecipe implements IMealRecipe {
  constructor(public id?: number, public recipeId?: number, public amount?: number, public mealId?: number) {}
}
