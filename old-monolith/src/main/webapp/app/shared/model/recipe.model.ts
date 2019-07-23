import { Moment } from 'moment';
import { IRecipe } from 'app/shared/model/recipe.model';
import { IKitchenAppliance } from 'app/shared/model/kitchen-appliance.model';
import { IDishType } from 'app/shared/model/dish-type.model';
import { IMealType } from 'app/shared/model/meal-type.model';
import { IRecipeSection } from 'app/shared/model/recipe-section.model';
import { IRecipeSuitableForDiet } from 'app/shared/model/recipe-suitable-for-diet.model';
import { IRecipeUnsuitableForDiet } from 'app/shared/model/recipe-unsuitable-for-diet.model';

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
    isLocked?: boolean;
    languageId?: number;
    sourceRecipe?: IRecipe;
    kitchenAppliances?: IKitchenAppliance[];
    dishTypes?: IDishType[];
    mealTypes?: IMealType[];
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
        public isLocked?: boolean,
        public languageId?: number,
        public sourceRecipe?: IRecipe,
        public kitchenAppliances?: IKitchenAppliance[],
        public dishTypes?: IDishType[],
        public mealTypes?: IMealType[],
        public recipeSections?: IRecipeSection[],
        public suitableForDiets?: IRecipeSuitableForDiet[],
        public unsuitableForDiets?: IRecipeUnsuitableForDiet[]
    ) {
        this.isVisible = this.isVisible || false;
        this.isLocked = this.isLocked || false;
    }
}
