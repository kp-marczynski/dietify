import { IProductBasicNutritionData } from 'app/shared/model/products/product-basic-nutrition-data.model';
import { INutritionData } from 'app/shared/model/products/nutrition-data.model';
import { IHouseholdMeasure } from 'app/shared/model/products/household-measure.model';
import { IProductSubcategory } from 'app/shared/model/products/product-subcategory.model';
import { IDietType } from 'app/shared/model/products/diet-type.model';

export interface IProduct {
  id?: number;
  source?: string;
  authorId?: number;
  description?: string;
  isFinal?: boolean;
  isVerified?: boolean;
  language?: string;
  basicNutritionData?: IProductBasicNutritionData;
  nutritionData?: INutritionData[];
  householdMeasures?: IHouseholdMeasure[];
  subcategory?: IProductSubcategory;
  suitableDiets?: IDietType[];
  unsuitableDiets?: IDietType[];
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
    public basicNutritionData?: IProductBasicNutritionData,
    public nutritionData?: INutritionData[],
    public householdMeasures?: IHouseholdMeasure[],
    public subcategory?: IProductSubcategory,
    public suitableDiets?: IDietType[],
    public unsuitableDiets?: IDietType[]
  ) {
    this.isFinal = this.isFinal || false;
    this.isVerified = this.isVerified || false;
  }
}
