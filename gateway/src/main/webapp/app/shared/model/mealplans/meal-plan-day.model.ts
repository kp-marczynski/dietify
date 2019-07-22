import { IMeal } from 'app/shared/model/mealplans/meal.model';
import { IMealPlan } from 'app/shared/model/mealplans/meal-plan.model';

export interface IMealPlanDay {
  id?: number;
  ordinalNumber?: number;
  meals?: IMeal[];
  mealPlan?: IMealPlan;
}

export class MealPlanDay implements IMealPlanDay {
  constructor(public id?: number, public ordinalNumber?: number, public meals?: IMeal[], public mealPlan?: IMealPlan) {}
}
