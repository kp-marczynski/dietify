import { BaseEntity } from 'src/model/base-entity';
import { MealPlan } from '../meal-plan/meal-plan.model';

export class MealDefinition implements BaseEntity {
    constructor(
        public id?: number,
        public ordinalNumber?: number,
        public mealTypeId?: number,
        public timeOfMeal?: string,
        public percentOfEnergy?: number,
        public mealPlan?: MealPlan,
    ) {
    }
}
