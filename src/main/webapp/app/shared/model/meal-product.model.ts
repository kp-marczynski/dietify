import { IMeal } from 'app/shared/model/meal.model';

export interface IMealProduct {
    id?: number;
    productId?: number;
    householdMeasureId?: number;
    amount?: number;
    meal?: IMeal;
}

export class MealProduct implements IMealProduct {
    constructor(
        public id?: number,
        public productId?: number,
        public householdMeasureId?: number,
        public amount?: number,
        public meal?: IMeal
    ) {}
}
