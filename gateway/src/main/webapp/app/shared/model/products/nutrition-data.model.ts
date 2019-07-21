export interface INutritionData {
  id?: number;
  nutritionValue?: number;
  nutritionDefinitionTag?: string;
  nutritionDefinitionId?: number;
  productDescription?: string;
  productId?: number;
}

export class NutritionData implements INutritionData {
  constructor(
    public id?: number,
    public nutritionValue?: number,
    public nutritionDefinitionTag?: string,
    public nutritionDefinitionId?: number,
    public productDescription?: string,
    public productId?: number
  ) {}
}
