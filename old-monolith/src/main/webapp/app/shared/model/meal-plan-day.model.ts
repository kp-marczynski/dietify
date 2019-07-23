import {IMeal} from 'app/shared/model/meal.model';
import {IBasicNutritionResponse} from 'app/shared/model/basic-nutrition-response.model';

export interface IMealPlanDay {
    id?: number;
    ordinalNumber?: number;
    meals?: IMeal[];
    nutritionData?: IBasicNutritionResponse;
}

export class MealPlanDay implements IMealPlanDay {
    nutritionData?: IBasicNutritionResponse;

    constructor(
        public id?: number,
        public ordinalNumber?: number,
        public meals?: IMeal[]) {
    }
}
