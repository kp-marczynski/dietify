import { IMealPlan } from 'app/shared/model/mealplans/meal-plan.model';

export interface IMealPlanSuitableForDiet {
  id?: number;
  dietTypeId?: number;
  mealPlan?: IMealPlan;
}

export class MealPlanSuitableForDiet implements IMealPlanSuitableForDiet {
  constructor(public id?: number, public dietTypeId?: number, public mealPlan?: IMealPlan) {}
}
