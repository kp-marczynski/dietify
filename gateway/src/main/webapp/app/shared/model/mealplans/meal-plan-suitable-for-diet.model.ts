export interface IMealPlanSuitableForDiet {
  id?: number;
  dietTypeId?: number;
  mealPlanId?: number;
}

export class MealPlanSuitableForDiet implements IMealPlanSuitableForDiet {
  constructor(public id?: number, public dietTypeId?: number, public mealPlanId?: number) {}
}
