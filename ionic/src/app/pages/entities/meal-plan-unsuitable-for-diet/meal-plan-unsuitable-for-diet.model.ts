import { BaseEntity } from 'src/model/base-entity';
import { MealPlan } from '../meal-plan/meal-plan.model';

export class MealPlanUnsuitableForDiet implements BaseEntity {
    constructor(
        public id?: number,
        public dietTypeId?: number,
        public mealPlan?: MealPlan,
    ) {
    }
}
