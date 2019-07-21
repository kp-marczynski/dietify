import { IMeal } from 'app/shared/model/mealplans/meal.model';

export interface IMealPlanDay {
  id?: number;
  ordinalNumber?: number;
  mealPlanId?: number;
  meals?: IMeal[];
}

export class MealPlanDay implements IMealPlanDay {
  constructor(public id?: number, public ordinalNumber?: number, public mealPlanId?: number, public meals?: IMeal[]) {}
}
