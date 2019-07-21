import {IProduct} from 'app/shared/model/product.model';

export interface IProductPortion {
    id?: number;
    amount?: number;
    productId?: number;
    product?: IProduct;
    householdMeasureId?: number;
}

export class ProductPortion implements IProductPortion {
    product: IProduct;

    constructor(
        public id?: number,
        public amount?: number,
        public productId?: number,
        public householdMeasureId?: number
    ) {
    }
}
