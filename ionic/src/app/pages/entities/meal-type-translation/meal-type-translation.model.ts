import { BaseEntity } from 'src/model/base-entity';
import { MealType } from '../meal-type/meal-type.model';

export class MealTypeTranslation implements BaseEntity {
    constructor(
        public id?: number,
        public translation?: string,
        public language?: string,
        public mealType?: MealType,
    ) {
    }
}
