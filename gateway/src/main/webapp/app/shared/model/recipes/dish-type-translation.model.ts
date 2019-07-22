import { IDishType } from 'app/shared/model/recipes/dish-type.model';

export interface IDishTypeTranslation {
  id?: number;
  translation?: string;
  language?: string;
  dishType?: IDishType;
}

export class DishTypeTranslation implements IDishTypeTranslation {
  constructor(public id?: number, public translation?: string, public language?: string, public dishType?: IDishType) {}
}
