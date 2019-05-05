import {IMeal} from 'app/shared/model/meal.model';

export interface IMealPlanDay {
    id?: number;
    ordinalNumber?: number;
    meals?: IMeal[];
}

export class MealPlanDay implements IMealPlanDay {
    constructor(
        public id?: number,
        public ordinalNumber?: number,
        public meals?: IMeal[]) {
    }
}
