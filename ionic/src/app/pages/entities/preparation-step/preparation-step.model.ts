import { BaseEntity } from 'src/model/base-entity';
import { RecipeSection } from '../recipe-section/recipe-section.model';

export class PreparationStep implements BaseEntity {
    constructor(
        public id?: number,
        public ordinalNumber?: number,
        public stepDescription?: any,
        public recipeSection?: RecipeSection,
    ) {
    }
}
