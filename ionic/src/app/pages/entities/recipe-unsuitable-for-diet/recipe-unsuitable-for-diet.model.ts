import { BaseEntity } from 'src/model/base-entity';
import { Recipe } from '../recipe/recipe.model';

export class RecipeUnsuitableForDiet implements BaseEntity {
    constructor(
        public id?: number,
        public dietTypeId?: number,
        public recipe?: Recipe,
    ) {
    }
}
