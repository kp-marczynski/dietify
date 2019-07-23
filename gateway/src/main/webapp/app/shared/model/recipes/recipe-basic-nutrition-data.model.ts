export interface IRecipeBasicNutritionData {
  id?: number;
  energy?: number;
  protein?: number;
  fat?: number;
  carbohydrates?: number;
}

export class RecipeBasicNutritionData implements IRecipeBasicNutritionData {
  constructor(public id?: number, public energy?: number, public protein?: number, public fat?: number, public carbohydrates?: number) {}
}
