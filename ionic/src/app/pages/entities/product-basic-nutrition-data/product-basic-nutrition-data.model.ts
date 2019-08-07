import { BaseEntity } from 'src/model/base-entity';

export class ProductBasicNutritionData implements BaseEntity {
    constructor(
        public id?: number,
        public energy?: number,
        public protein?: number,
        public fat?: number,
        public carbohydrates?: number,
    ) {
    }
}
