export interface IBasicNutritionRequest {
    productId: number;
    amount: number;
    householdMeasureId?: number;
}

export class BasicNutritionRequest implements IBasicNutritionRequest {
    constructor(
        public productId: number,
        public amount: number,
        public householdMeasureId?: number,
    ) {
    }
}
