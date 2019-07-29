import { BaseEntity } from 'src/model/base-entity';
import { DishTypeTranslation } from '../dish-type-translation/dish-type-translation.model';

export class DishType implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public translations?: DishTypeTranslation[],
    ) {
    }
}
