import { INutritionDefinitionTranslation } from 'app/shared/model/products/nutrition-definition-translation.model';

export interface INutritionDefinition {
  id?: number;
  tag?: string;
  description?: string;
  units?: string;
  decimalPlaces?: number;
  translations?: INutritionDefinitionTranslation[];
}

export class NutritionDefinition implements INutritionDefinition {
  constructor(
    public id?: number,
    public tag?: string,
    public description?: string,
    public units?: string,
    public decimalPlaces?: number,
    public translations?: INutritionDefinitionTranslation[]
  ) {}
}
