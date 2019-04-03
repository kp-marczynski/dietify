import { IRecipe } from 'app/shared/model/recipe.model';
import { IProductPortion } from 'app/shared/model/product-portion.model';
import { IPreparationStep } from 'app/shared/model/preparation-step.model';

export interface IRecipeSection {
    id?: number;
    sectionName?: string;
    recipe?: IRecipe;
    productPortions?: IProductPortion[];
    preparationSteps?: IPreparationStep[];
}

export class RecipeSection implements IRecipeSection {
    constructor(
        public id?: number,
        public sectionName?: string,
        public recipe?: IRecipe,
        public productPortions?: IProductPortion[],
        public preparationSteps?: IPreparationStep[]
    ) {}
}
