import { IProductPortion } from 'app/shared/model/recipes/product-portion.model';
import { IPreparationStep } from 'app/shared/model/recipes/preparation-step.model';
import { IRecipe } from 'app/shared/model/recipes/recipe.model';

export interface IRecipeSection {
  id?: number;
  sectionName?: string;
  productPortions?: IProductPortion[];
  preparationSteps?: IPreparationStep[];
  recipe?: IRecipe;
}

export class RecipeSection implements IRecipeSection {
  constructor(
    public id?: number,
    public sectionName?: string,
    public productPortions?: IProductPortion[],
    public preparationSteps?: IPreparationStep[],
    public recipe?: IRecipe
  ) {}
}
