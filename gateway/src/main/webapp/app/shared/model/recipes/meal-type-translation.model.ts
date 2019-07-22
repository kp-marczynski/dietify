import { IMealType } from 'app/shared/model/recipes/meal-type.model';

export interface IMealTypeTranslation {
  id?: number;
  translation?: string;
  language?: string;
  mealType?: IMealType;
}

export class MealTypeTranslation implements IMealTypeTranslation {
  constructor(public id?: number, public translation?: string, public language?: string, public mealType?: IMealType) {}
}
