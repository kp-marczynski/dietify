export interface IMealPlanSuitableForDiet {
    id?: number;
    dietTypeId?: number;
}

export class MealPlanSuitableForDiet implements IMealPlanSuitableForDiet {
    constructor(
        public id?: number,
        public dietTypeId?: number
    ) {
    }
}
