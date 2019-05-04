import { IMealPlan } from 'app/shared/model/meal-plan.model';

export interface IMealPlanUnsuitableForDiet {
    id?: number;
    dietTypeId?: number;
    mealPlan?: IMealPlan;
}

export class MealPlanUnsuitableForDiet implements IMealPlanUnsuitableForDiet {
    constructor(public id?: number, public dietTypeId?: number, public mealPlan?: IMealPlan) {}
}
