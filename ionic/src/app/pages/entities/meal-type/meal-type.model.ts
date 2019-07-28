import { BaseEntity } from 'src/model/base-entity';
import { MealTypeTranslation } from '../meal-type-translation/meal-type-translation.model';

export class MealType implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public translations?: MealTypeTranslation[],
    ) {
    }
}
