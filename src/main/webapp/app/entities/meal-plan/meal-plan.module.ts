import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DietifySharedModule } from 'app/shared';
import {
    MealPlanComponent,
    MealPlanDetailComponent,
    MealPlanUpdateComponent,
    MealPlanDeletePopupComponent,
    MealPlanDeleteDialogComponent,
    mealPlanRoute,
    mealPlanPopupRoute
} from './';

const ENTITY_STATES = [...mealPlanRoute, ...mealPlanPopupRoute];

@NgModule({
    imports: [DietifySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MealPlanComponent,
        MealPlanDetailComponent,
        MealPlanUpdateComponent,
        MealPlanDeleteDialogComponent,
        MealPlanDeletePopupComponent
    ],
    entryComponents: [MealPlanComponent, MealPlanUpdateComponent, MealPlanDeleteDialogComponent, MealPlanDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DietifyMealPlanModule {}
