import { INutritionDefinition } from 'app/shared/model/products/nutrition-definition.model';

export interface INutritionDefinitionTranslation {
  id?: number;
  translation?: string;
  language?: string;
  nutritionDefinition?: INutritionDefinition;
}

export class NutritionDefinitionTranslation implements INutritionDefinitionTranslation {
  constructor(
    public id?: number,
    public translation?: string,
    public language?: string,
    public nutritionDefinition?: INutritionDefinition
  ) {}
}
