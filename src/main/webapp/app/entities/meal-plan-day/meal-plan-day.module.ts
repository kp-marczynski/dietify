import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DietifySharedModule } from 'app/shared';
import {
    MealPlanDayComponent,
    MealPlanDayDetailComponent,
    MealPlanDayUpdateComponent,
    MealPlanDayDeletePopupComponent,
    MealPlanDayDeleteDialogComponent,
    mealPlanDayRoute,
    mealPlanDayPopupRoute
} from './';

const ENTITY_STATES = [...mealPlanDayRoute, ...mealPlanDayPopupRoute];

@NgModule({
    imports: [DietifySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MealPlanDayComponent,
        MealPlanDayDetailComponent,
        MealPlanDayUpdateComponent,
        MealPlanDayDeleteDialogComponent,
        MealPlanDayDeletePopupComponent
    ],
    entryComponents: [MealPlanDayComponent, MealPlanDayUpdateComponent, MealPlanDayDeleteDialogComponent, MealPlanDayDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DietifyMealPlanDayModule {}
