import {IProduct} from 'app/shared/model/product.model';
import {IBasicNutritionResponse} from 'app/shared/model/basic-nutrition-response.model';

export interface IMealProduct {
    id?: number;
    productId?: number;
    householdMeasureId?: number;
    householdMeasureDescription?: string;
    amount?: number;
    product?: IProduct;
    basicNutritionData?: IBasicNutritionResponse;
}

export class MealProduct implements IMealProduct {
    public product?: IProduct;
    public householdMeasureDescription?: string;

    constructor(
        public id?: number,
        public productId?: number,
        public householdMeasureId?: number,
        public amount?: number,
        public basicNutritionData?: IBasicNutritionResponse
    ) {
    }
}
