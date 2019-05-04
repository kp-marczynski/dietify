import { IMealPlan } from 'app/shared/model/meal-plan.model';
import { IMeal } from 'app/shared/model/meal.model';

export interface IMealPlanDay {
    id?: number;
    ordinalNumber?: number;
    mealPlan?: IMealPlan;
    meals?: IMeal[];
}

export class MealPlanDay implements IMealPlanDay {
    constructor(public id?: number, public ordinalNumber?: number, public mealPlan?: IMealPlan, public meals?: IMeal[]) {}
}
