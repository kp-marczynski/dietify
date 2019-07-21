export interface IMealDefinition {
    id?: number;
    ordinalNumber?: number;
    mealTypeId?: number;
    timeOfMeal?: string;
    percentOfEnergy?: number;
}

export class MealDefinition implements IMealDefinition {
    constructor(
        public id?: number,
        public ordinalNumber?: number,
        public mealTypeId?: number,
        public timeOfMeal?: string,
        public percentOfEnergy?: number
    ) {
    }
}
