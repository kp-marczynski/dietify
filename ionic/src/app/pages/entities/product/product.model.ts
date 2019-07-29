import { BaseEntity } from 'src/model/base-entity';
import { ProductBasicNutritionData } from '../product-basic-nutrition-data/product-basic-nutrition-data.model';
import { NutritionData } from '../nutrition-data/nutrition-data.model';
import { HouseholdMeasure } from '../household-measure/household-measure.model';
import { ProductSubcategory } from '../product-subcategory/product-subcategory.model';
import { DietType } from '../diet-type/diet-type.model';

export class Product implements BaseEntity {
    constructor(
        public id?: number,
        public source?: string,
        public authorId?: number,
        public description?: string,
        public isFinal?: boolean,
        public isVerified?: boolean,
        public language?: string,
        public basicNutritionData?: ProductBasicNutritionData,
        public nutritionData?: NutritionData[],
        public householdMeasures?: HouseholdMeasure[],
        public subcategory?: ProductSubcategory,
        public suitableDiets?: DietType[],
        public unsuitableDiets?: DietType[],
    ) {
        this.isFinal = false;
        this.isVerified = false;
    }
}
