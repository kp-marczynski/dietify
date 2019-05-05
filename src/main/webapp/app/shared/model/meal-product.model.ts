import {IProduct} from 'app/shared/model/product.model';

export interface IMealProduct {
    id?: number;
    productId?: number;
    householdMeasureId?: number;
    amount?: number;
    product?: IProduct;
}

export class MealProduct implements IMealProduct {
    public product?: IProduct;

    constructor(
        public id?: number,
        public productId?: number,
        public householdMeasureId?: number,
        public amount?: number,
    ) {
    }
}
