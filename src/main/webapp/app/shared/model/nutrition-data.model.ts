import {INutritionDefinition} from 'app/shared/model/nutrition-definition.model';

export interface INutritionData {
    id?: number;
    nutritionValue?: number;
    nutritionDefinition?: INutritionDefinition;
}

export class NutritionData implements INutritionData {
    constructor(
        public id?: number,
        public nutritionValue?: number,
        public nutritionDefinition?: INutritionDefinition
    ) {}
}
