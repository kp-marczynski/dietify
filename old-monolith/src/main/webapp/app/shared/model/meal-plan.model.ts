import { Moment } from 'moment';
import { IMealPlanDay } from 'app/shared/model/meal-plan-day.model';
import { IMealDefinition } from 'app/shared/model/meal-definition.model';
import { IMealPlanSuitableForDiet } from 'app/shared/model/meal-plan-suitable-for-diet.model';
import { IMealPlanUnsuitableForDiet } from 'app/shared/model/meal-plan-unsuitable-for-diet.model';

export interface IMealPlan {
    id?: number;
    authorId?: number;
    creationDate?: Moment;
    name?: string;
    isVisible?: boolean;
    isLocked?: boolean;
    languageId?: number;
    numberOfDays?: number;
    numberOfMealsPerDay?: number;
    totalDailyEnergyKcal?: number;
    percentOfProtein?: number;
    percentOfFat?: number;
    percentOfCarbohydrates?: number;
    days?: IMealPlanDay[];
    mealDefinitions?: IMealDefinition[];
    tagsGoodFors?: IMealPlanSuitableForDiet[];
    tagsBadFors?: IMealPlanUnsuitableForDiet[];
}

export class MealPlan implements IMealPlan {
    constructor(
        public id?: number,
        public authorId?: number,
        public creationDate?: Moment,
        public name?: string,
        public isVisible?: boolean,
        public isLocked?: boolean,
        public languageId?: number,
        public numberOfDays?: number,
        public numberOfMealsPerDay?: number,
        public totalDailyEnergyKcal?: number,
        public percentOfProtein?: number,
        public percentOfFat?: number,
        public percentOfCarbohydrates?: number,
        public days?: IMealPlanDay[],
        public mealDefinitions?: IMealDefinition[],
        public tagsGoodFors?: IMealPlanSuitableForDiet[],
        public tagsBadFors?: IMealPlanUnsuitableForDiet[]
    ) {
        this.isVisible = this.isVisible || false;
        this.isLocked = this.isLocked || false;
    }
}
