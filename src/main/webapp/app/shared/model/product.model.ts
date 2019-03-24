import { ILanguage } from 'app/shared/model/language.model';
import { IProductSubcategory } from 'app/shared/model/product-subcategory.model';
import { IUser } from 'app/core/user/user.model';
import { IDietType } from 'app/shared/model/diet-type.model';
import { INutritionData } from 'app/shared/model/nutrition-data.model';
import { IHouseholdMeasure } from 'app/shared/model/household-measure.model';

export interface IProduct {
    id?: number;
    source?: string;
    description?: string;
    isFinal?: boolean;
    isVerified?: boolean;
    language?: ILanguage;
    subcategory?: IProductSubcategory;
    author?: IUser;
    suitableDiets?: IDietType[];
    unsuitableDiets?: IDietType[];
    nutritionData?: INutritionData[];
    householdMeasures?: IHouseholdMeasure[];
}

export class Product implements IProduct {
    constructor(
        public id?: number,
        public source?: string,
        public description?: string,
        public isFinal?: boolean,
        public isVerified?: boolean,
        public language?: ILanguage,
        public subcategory?: IProductSubcategory,
        public author?: IUser,
        public suitableDiets?: IDietType[],
        public unsuitableDiets?: IDietType[],
        public nutritionData?: INutritionData[],
        public householdMeasures?: IHouseholdMeasure[]
    ) {
        this.isFinal = this.isFinal || false;
        this.isVerified = this.isVerified || false;
    }
}
