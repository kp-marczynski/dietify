import { IRecipeSection } from 'app/shared/model/recipe-section.model';

export interface IProductPortion {
    id?: number;
    amount?: number;
    productId?: number;
    householdMeasureId?: number;
    recipeSection?: IRecipeSection;
}

export class ProductPortion implements IProductPortion {
    constructor(
        public id?: number,
        public amount?: number,
        public productId?: number,
        public householdMeasureId?: number,
        public recipeSection?: IRecipeSection
    ) {}
}
