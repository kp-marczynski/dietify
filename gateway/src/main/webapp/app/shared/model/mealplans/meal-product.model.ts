export interface IMealProduct {
  id?: number;
  productId?: number;
  householdMeasureId?: number;
  amount?: number;
  mealId?: number;
}

export class MealProduct implements IMealProduct {
  constructor(
    public id?: number,
    public productId?: number,
    public householdMeasureId?: number,
    public amount?: number,
    public mealId?: number
  ) {}
}
