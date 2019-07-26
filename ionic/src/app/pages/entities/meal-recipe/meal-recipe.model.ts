import { BaseEntity } from 'src/model/base-entity';
import { Meal } from '../meal/meal.model';

export class MealRecipe implements BaseEntity {
    constructor(
        public id?: number,
        public recipeId?: number,
        public amount?: number,
        public meal?: Meal,
    ) {
    }
}
