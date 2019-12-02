import { Moment } from 'moment';
import { IMealPlanDay } from 'app/shared/model/mealplans/meal-plan-day.model';
import { IMealDefinition } from 'app/shared/model/mealplans/meal-definition.model';
import { IMealPlanSuitableForDiet } from 'app/shared/model/mealplans/meal-plan-suitable-for-diet.model';
import { IMealPlanUnsuitableForDiet } from 'app/shared/model/mealplans/meal-plan-unsuitable-for-diet.model';

export interface IMealPlan {
  id?: number;
  authorId?: number;
  // creationDate?: Moment;
  name?: string;
  // isVisible?: boolean;
  // isLocked?: boolean;
  isFinal?: boolean;
  creationTimestamp?: Moment;
  lastEditTimestamp?: Moment;
  language?: string;
  numberOfDays?: number;
  numberOfMealsPerDay?: number;
  totalDailyEnergy?: number;
  percentOfProtein?: number;
  percentOfFat?: number;
  percentOfCarbohydrates?: number;
  days?: IMealPlanDay[];
  mealDefinitions?: IMealDefinition[];
  suitableForDiets?: IMealPlanSuitableForDiet[];
  unsuitableForDiets?: IMealPlanUnsuitableForDiet[];
}

export class MealPlan implements IMealPlan {
  constructor(
    public id?: number,
    public authorId?: number,
    // public creationDate?: Moment,
    public name?: string,
    // public isVisible?: boolean,
    // public isLocked?: boolean,
    public isFinal?: boolean,
    public creationTimestamp?: Moment,
    public lastEditTimestamp?: Moment,
    public language?: string,
    public numberOfDays?: number,
    public numberOfMealsPerDay?: number,
    public totalDailyEnergy?: number,
    public percentOfProtein?: number,
    public percentOfFat?: number,
    public percentOfCarbohydrates?: number,
    public days?: IMealPlanDay[],
    public mealDefinitions?: IMealDefinition[],
    public suitableForDiets?: IMealPlanSuitableForDiet[],
    public unsuitableForDiets?: IMealPlanUnsuitableForDiet[]
  ) {
    // this.isVisible = this.isVisible || false;
    // this.isLocked = this.isLocked || false;
    this.isFinal = this.isFinal || false;
  }
}
