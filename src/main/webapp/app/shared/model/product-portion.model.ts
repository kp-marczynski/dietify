export interface IProductPortion {
    id?: number;
    amount?: number;
    productId?: number;
    householdMeasureId?: number;
}

export class ProductPortion implements IProductPortion {
    constructor(
        public id?: number,
        public amount?: number,
        public productId?: number,
        public householdMeasureId?: number
    ) {
    }
}
