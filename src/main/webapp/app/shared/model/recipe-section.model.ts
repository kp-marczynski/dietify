import {IProductPortion} from 'app/shared/model/product-portion.model';
import {IPreparationStep} from 'app/shared/model/preparation-step.model';

export interface IRecipeSection {
    id?: number;
    sectionName?: string;
    productPortions?: IProductPortion[];
    preparationSteps?: IPreparationStep[];
}

export class RecipeSection implements IRecipeSection {
    constructor(
        public id?: number,
        public sectionName?: string,
        public productPortions?: IProductPortion[],
        public preparationSteps?: IPreparationStep[]
    ) {
    }
}
