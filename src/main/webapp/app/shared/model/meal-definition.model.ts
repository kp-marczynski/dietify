import { IMealPlan } from 'app/shared/model/meal-plan.model';

export interface IMealDefinition {
    id?: number;
    ordinalNumber?: number;
    mealTypeId?: number;
    timeOfMeal?: string;
    percentOfEnergy?: number;
    mealPlan?: IMealPlan;
}

export class MealDefinition implements IMealDefinition {
    constructor(
        public id?: number,
        public ordinalNumber?: number,
        public mealTypeId?: number,
        public timeOfMeal?: string,
        public percentOfEnergy?: number,
        public mealPlan?: IMealPlan
    ) {}
}
