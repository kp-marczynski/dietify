import { BaseEntity } from 'src/model/base-entity';
import { DishType } from '../dish-type/dish-type.model';

export class DishTypeTranslation implements BaseEntity {
    constructor(
        public id?: number,
        public translation?: string,
        public language?: string,
        public dishType?: DishType,
    ) {
    }
}
