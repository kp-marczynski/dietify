import { BaseEntity } from 'src/model/base-entity';
import { Meal } from '../meal/meal.model';

export class MealProduct implements BaseEntity {
    constructor(
        public id?: number,
        public productId?: number,
        public householdMeasureId?: number,
        public amount?: number,
        public meal?: Meal,
    ) {
    }
}
