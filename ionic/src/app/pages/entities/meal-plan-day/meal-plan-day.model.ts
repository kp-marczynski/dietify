import { BaseEntity } from 'src/model/base-entity';
import { Meal } from '../meal/meal.model';
import { MealPlan } from '../meal-plan/meal-plan.model';

export class MealPlanDay implements BaseEntity {
    constructor(
        public id?: number,
        public ordinalNumber?: number,
        public meals?: Meal[],
        public mealPlan?: MealPlan,
    ) {
    }
}
