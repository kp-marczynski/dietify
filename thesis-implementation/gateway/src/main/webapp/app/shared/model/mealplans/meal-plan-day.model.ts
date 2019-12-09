import { IMeal } from 'app/shared/model/mealplans/meal.model';
import { IMealPlan } from 'app/shared/model/mealplans/meal-plan.model';
import { IBasicNutritionResponse } from 'app/shared/model/mealplans/basic-nutrition-response.model';

export interface IMealPlanDay {
  id?: number;
  ordinalNumber?: number;
  meals?: IMeal[];
  mealPlan?: IMealPlan;
  nutritionData?: IBasicNutritionResponse;
}

export class MealPlanDay implements IMealPlanDay {
  constructor(
    public id?: number,
    public ordinalNumber?: number,
    public meals?: IMeal[],
    public mealPlan?: IMealPlan,
    nutritionData?: IBasicNutritionResponse
  ) {}
}
