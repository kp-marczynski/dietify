export interface INutritionDefinitionTranslation {
  id?: number;
  translation?: string;
  language?: string;
  nutritionDefinitionsTag?: string;
  nutritionDefinitionsId?: number;
}

export class NutritionDefinitionTranslation implements INutritionDefinitionTranslation {
  constructor(
    public id?: number,
    public translation?: string,
    public language?: string,
    public nutritionDefinitionsTag?: string,
    public nutritionDefinitionsId?: number
  ) {}
}
