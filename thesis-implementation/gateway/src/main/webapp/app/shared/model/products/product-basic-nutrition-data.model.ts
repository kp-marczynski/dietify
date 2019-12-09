export interface IProductBasicNutritionData {
  id?: number;
  energy?: number;
  protein?: number;
  fat?: number;
  carbohydrates?: number;
}

export class ProductBasicNutritionData implements IProductBasicNutritionData {
  constructor(public id?: number, public energy?: number, public protein?: number, public fat?: number, public carbohydrates?: number) {}
}
