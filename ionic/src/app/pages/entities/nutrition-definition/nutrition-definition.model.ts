import { BaseEntity } from 'src/model/base-entity';
import { NutritionDefinitionTranslation } from '../nutrition-definition-translation/nutrition-definition-translation.model';

export class NutritionDefinition implements BaseEntity {
    constructor(
        public id?: number,
        public tag?: string,
        public description?: string,
        public units?: string,
        public decimalPlaces?: number,
        public translations?: NutritionDefinitionTranslation[],
    ) {
    }
}
