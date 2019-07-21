import { IDietType } from 'app/shared/model/products/diet-type.model';
import { INutritionData } from 'app/shared/model/products/nutrition-data.model';
import { IHouseholdMeasure } from 'app/shared/model/products/household-measure.model';

export interface IProduct {
  id?: number;
  source?: string;
  authorId?: number;
  description?: string;
  isFinal?: boolean;
  isVerified?: boolean;
  language?: string;
  subcategoryDescription?: string;
  subcategoryId?: number;
  suitableDiets?: IDietType[];
  unsuitableDiets?: IDietType[];
  basicNutritionDataId?: number;
  nutritionData?: INutritionData[];
  householdMeasures?: IHouseholdMeasure[];
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public source?: string,
    public authorId?: number,
    public description?: string,
    public isFinal?: boolean,
    public isVerified?: boolean,
    public language?: string,
    public subcategoryDescription?: string,
    public subcategoryId?: number,
    public suitableDiets?: IDietType[],
    public unsuitableDiets?: IDietType[],
    public basicNutritionDataId?: number,
    public nutritionData?: INutritionData[],
    public householdMeasures?: IHouseholdMeasure[]
  ) {
    this.isFinal = this.isFinal || false;
    this.isVerified = this.isVerified || false;
  }
}
