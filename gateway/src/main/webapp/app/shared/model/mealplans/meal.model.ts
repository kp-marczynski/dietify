import { IMealRecipe } from 'app/shared/model/mealplans/meal-recipe.model';
import { IMealProduct } from 'app/shared/model/mealplans/meal-product.model';
import { IMealPlanDay } from 'app/shared/model/mealplans/meal-plan-day.model';

export interface IMeal {
  id?: number;
  ordinalNumber?: number;
  mealRecipes?: IMealRecipe[];
  mealProducts?: IMealProduct[];
  mealPlanDay?: IMealPlanDay;
}

export class Meal implements IMeal {
  constructor(
    public id?: number,
    public ordinalNumber?: number,
    public mealRecipes?: IMealRecipe[],
    public mealProducts?: IMealProduct[],
    public mealPlanDay?: IMealPlanDay
  ) {}
}
