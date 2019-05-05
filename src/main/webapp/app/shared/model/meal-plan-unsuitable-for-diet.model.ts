export interface IMealPlanUnsuitableForDiet {
    id?: number;
    dietTypeId?: number;
}

export class MealPlanUnsuitableForDiet implements IMealPlanUnsuitableForDiet {
    constructor(
        public id?: number,
        public dietTypeId?: number
    ) {
    }
}
