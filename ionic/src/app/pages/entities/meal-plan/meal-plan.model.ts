import { BaseEntity } from 'src/model/base-entity';
import { MealPlanDay } from '../meal-plan-day/meal-plan-day.model';
import { MealDefinition } from '../meal-definition/meal-definition.model';
import { MealPlanSuitableForDiet } from '../meal-plan-suitable-for-diet/meal-plan-suitable-for-diet.model';
import { MealPlanUnsuitableForDiet } from '../meal-plan-unsuitable-for-diet/meal-plan-unsuitable-for-diet.model';

export class MealPlan implements BaseEntity {
    constructor(
        public id?: number,
        public authorId?: number,
        public creationDate?: any,
        public name?: string,
        public isVisible?: boolean,
        public isLocked?: boolean,
        public language?: string,
        public numberOfDays?: number,
        public numberOfMealsPerDay?: number,
        public totalDailyEnergy?: number,
        public percentOfProtein?: number,
        public percentOfFat?: number,
        public percentOfCarbohydrates?: number,
        public days?: MealPlanDay[],
        public mealDefinitions?: MealDefinition[],
        public suitableForDiets?: MealPlanSuitableForDiet[],
        public unsuitableForDiets?: MealPlanUnsuitableForDiet[],
    ) {
        this.isVisible = false;
        this.isLocked = false;
    }
}
