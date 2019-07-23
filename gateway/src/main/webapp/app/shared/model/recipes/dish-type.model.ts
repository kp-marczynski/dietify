import { IDishTypeTranslation } from 'app/shared/model/recipes/dish-type-translation.model';

export interface IDishType {
  id?: number;
  description?: string;
  translations?: IDishTypeTranslation[];
}

export class DishType implements IDishType {
  constructor(public id?: number, public description?: string, public translations?: IDishTypeTranslation[]) {}
}
