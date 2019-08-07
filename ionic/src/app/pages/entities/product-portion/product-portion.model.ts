import { BaseEntity } from 'src/model/base-entity';
import { RecipeSection } from '../recipe-section/recipe-section.model';

export class ProductPortion implements BaseEntity {
    constructor(
        public id?: number,
        public amount?: number,
        public productId?: number,
        public householdMeasureId?: number,
        public recipeSection?: RecipeSection,
    ) {
    }
}
