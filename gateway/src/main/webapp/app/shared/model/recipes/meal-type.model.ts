import { IMealTypeTranslation } from 'app/shared/model/recipes/meal-type-translation.model';

export interface IMealType {
  id?: number;
  name?: string;
  translations?: IMealTypeTranslation[];
}

export class MealType implements IMealType {
  constructor(public id?: number, public name?: string, public translations?: IMealTypeTranslation[]) {}
}
