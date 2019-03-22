export interface INutritionDefinition {
    id?: number;
    tagname?: string;
    descriptionPolish?: string;
    descriptionEnglish?: string;
    units?: string;
    decimalPlaces?: number;
}

export class NutritionDefinition implements INutritionDefinition {
    constructor(
        public id?: number,
        public tagname?: string,
        public descriptionPolish?: string,
        public descriptionEnglish?: string,
        public units?: string,
        public decimalPlaces?: number
    ) {}
}
