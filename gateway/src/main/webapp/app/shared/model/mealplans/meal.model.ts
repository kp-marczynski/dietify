import { IMealRecipe } from 'app/shared/model/mealplans/meal-recipe.model';
import { IMealProduct } from 'app/shared/model/mealplans/meal-product.model';

export interface IMeal {
  id?: number;
  ordinalNumber?: number;
  mealPlanDayId?: number;
  mealRecipes?: IMealRecipe[];
  mealProducts?: IMealProduct[];
}

export class Meal implements IMeal {
  constructor(
    public id?: number,
    public ordinalNumber?: number,
    public mealPlanDayId?: number,
    public mealRecipes?: IMealRecipe[],
    public mealProducts?: IMealProduct[]
  ) {}
}
