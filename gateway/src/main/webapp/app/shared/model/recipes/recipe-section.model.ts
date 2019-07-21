import { IProductPortion } from 'app/shared/model/recipes/product-portion.model';
import { IPreparationStep } from 'app/shared/model/recipes/preparation-step.model';

export interface IRecipeSection {
  id?: number;
  sectionName?: string;
  recipeName?: string;
  recipeId?: number;
  productPortions?: IProductPortion[];
  preparationSteps?: IPreparationStep[];
}

export class RecipeSection implements IRecipeSection {
  constructor(
    public id?: number,
    public sectionName?: string,
    public recipeName?: string,
    public recipeId?: number,
    public productPortions?: IProductPortion[],
    public preparationSteps?: IPreparationStep[]
  ) {}
}
