import { BaseEntity } from 'src/model/base-entity';
import { NutritionDefinition } from '../nutrition-definition/nutrition-definition.model';
import { Product } from '../product/product.model';

export class NutritionData implements BaseEntity {
    constructor(
        public id?: number,
        public nutritionValue?: number,
        public nutritionDefinition?: NutritionDefinition,
        public product?: Product,
    ) {
    }
}
