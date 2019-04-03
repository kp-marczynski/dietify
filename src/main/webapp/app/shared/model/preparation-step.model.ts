import { IRecipeSection } from 'app/shared/model/recipe-section.model';

export interface IPreparationStep {
    id?: number;
    ordinalNumber?: number;
    stepDescription?: string;
    recipeSection?: IRecipeSection;
}

export class PreparationStep implements IPreparationStep {
    constructor(
        public id?: number,
        public ordinalNumber?: number,
        public stepDescription?: string,
        public recipeSection?: IRecipeSection
    ) {}
}
