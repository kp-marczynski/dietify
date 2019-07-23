import { IRecipeSection } from 'app/shared/model/recipes/recipe-section.model';

export interface IPreparationStep {
  id?: number;
  ordinalNumber?: number;
  stepDescription?: any;
  recipeSection?: IRecipeSection;
}

export class PreparationStep implements IPreparationStep {
  constructor(public id?: number, public ordinalNumber?: number, public stepDescription?: any, public recipeSection?: IRecipeSection) {}
}
