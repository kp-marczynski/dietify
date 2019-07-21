import { Moment } from 'moment';
import { IKitchenAppliance } from 'app/shared/model/recipes/kitchen-appliance.model';
import { IDishType } from 'app/shared/model/recipes/dish-type.model';
import { IMealType } from 'app/shared/model/recipes/meal-type.model';
import { IRecipeSection } from 'app/shared/model/recipes/recipe-section.model';
import { IRecipeSuitableForDiet } from 'app/shared/model/recipes/recipe-suitable-for-diet.model';
import { IRecipeUnsuitableForDiet } from 'app/shared/model/recipes/recipe-unsuitable-for-diet.model';

export interface IRecipe {
  id?: number;
  name?: string;
  preparationTimeMinutes?: number;
  numberOfPortions?: number;
  imageContentType?: string;
  image?: any;
  authorId?: number;
  creationDate?: Moment;
  lastEditDate?: Moment;
  isVisible?: boolean;
  language?: string;
  totalGramsWeight?: number;
  sourceRecipeName?: string;
  sourceRecipeId?: number;
  kitchenAppliances?: IKitchenAppliance[];
  dishTypes?: IDishType[];
  mealTypes?: IMealType[];
  basicNutritionDataId?: number;
  recipeSections?: IRecipeSection[];
  suitableForDiets?: IRecipeSuitableForDiet[];
  unsuitableForDiets?: IRecipeUnsuitableForDiet[];
}

export class Recipe implements IRecipe {
  constructor(
    public id?: number,
    public name?: string,
    public preparationTimeMinutes?: number,
    public numberOfPortions?: number,
    public imageContentType?: string,
    public image?: any,
    public authorId?: number,
    public creationDate?: Moment,
    public lastEditDate?: Moment,
    public isVisible?: boolean,
    public language?: string,
    public totalGramsWeight?: number,
    public sourceRecipeName?: string,
    public sourceRecipeId?: number,
    public kitchenAppliances?: IKitchenAppliance[],
    public dishTypes?: IDishType[],
    public mealTypes?: IMealType[],
    public basicNutritionDataId?: number,
    public recipeSections?: IRecipeSection[],
    public suitableForDiets?: IRecipeSuitableForDiet[],
    public unsuitableForDiets?: IRecipeUnsuitableForDiet[]
  ) {
    this.isVisible = this.isVisible || false;
  }
}
