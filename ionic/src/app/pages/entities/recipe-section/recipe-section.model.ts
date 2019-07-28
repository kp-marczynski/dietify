import { BaseEntity } from 'src/model/base-entity';
import { ProductPortion } from '../product-portion/product-portion.model';
import { PreparationStep } from '../preparation-step/preparation-step.model';
import { Recipe } from '../recipe/recipe.model';

export class RecipeSection implements BaseEntity {
    constructor(
        public id?: number,
        public sectionName?: string,
        public productPortions?: ProductPortion[],
        public preparationSteps?: PreparationStep[],
        public recipe?: Recipe,
    ) {
    }
}
