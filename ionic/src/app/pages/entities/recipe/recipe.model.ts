import { BaseEntity } from 'src/model/base-entity';
import { RecipeBasicNutritionData } from '../recipe-basic-nutrition-data/recipe-basic-nutrition-data.model';
import { RecipeSection } from '../recipe-section/recipe-section.model';
import { RecipeSuitableForDiet } from '../recipe-suitable-for-diet/recipe-suitable-for-diet.model';
import { RecipeUnsuitableForDiet } from '../recipe-unsuitable-for-diet/recipe-unsuitable-for-diet.model';
import { Recipe } from '../recipe/recipe.model';
import { KitchenAppliance } from '../kitchen-appliance/kitchen-appliance.model';
import { DishType } from '../dish-type/dish-type.model';
import { MealType } from '../meal-type/meal-type.model';

export class Recipe implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public preparationTimeMinutes?: number,
        public numberOfPortions?: number,
        public imageContentType?: string,
        public image?: any,
        public authorId?: number,
        public creationDate?: any,
        public lastEditDate?: any,
        public isVisible?: boolean,
        public language?: string,
        public totalGramsWeight?: number,
        public basicNutritionData?: RecipeBasicNutritionData,
        public recipeSections?: RecipeSection[],
        public suitableForDiets?: RecipeSuitableForDiet[],
        public unsuitableForDiets?: RecipeUnsuitableForDiet[],
        public sourceRecipe?: Recipe,
        public kitchenAppliances?: KitchenAppliance[],
        public dishTypes?: DishType[],
        public mealTypes?: MealType[],
    ) {
        this.isVisible = false;
    }
}
