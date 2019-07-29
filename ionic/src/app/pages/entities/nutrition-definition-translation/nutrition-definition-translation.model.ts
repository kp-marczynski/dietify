import { BaseEntity } from 'src/model/base-entity';
import { NutritionDefinition } from '../nutrition-definition/nutrition-definition.model';

export class NutritionDefinitionTranslation implements BaseEntity {
    constructor(
        public id?: number,
        public translation?: string,
        public language?: string,
        public nutritionDefinition?: NutritionDefinition,
    ) {
    }
}
