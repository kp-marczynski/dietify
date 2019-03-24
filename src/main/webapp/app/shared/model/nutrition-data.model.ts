import { INutritionDefinition } from 'app/shared/model/nutrition-definition.model';
import { IProduct } from 'app/shared/model/product.model';

export interface INutritionData {
    id?: number;
    nutritionValue?: number;
    nutritionDefinition?: INutritionDefinition;
    product?: IProduct;
}

export class NutritionData implements INutritionData {
    constructor(
        public id?: number,
        public nutritionValue?: number,
        public nutritionDefinition?: INutritionDefinition,
        public product?: IProduct
    ) {}
}
