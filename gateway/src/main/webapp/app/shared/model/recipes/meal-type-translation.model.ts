export interface IMealTypeTranslation {
  id?: number;
  translation?: string;
  language?: string;
  mealTypeName?: string;
  mealTypeId?: number;
}

export class MealTypeTranslation implements IMealTypeTranslation {
  constructor(
    public id?: number,
    public translation?: string,
    public language?: string,
    public mealTypeName?: string,
    public mealTypeId?: number
  ) {}
}
