import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DietifySharedModule } from 'app/shared';
import {
    MealPlanUnsuitableForDietComponent,
    MealPlanUnsuitableForDietDetailComponent,
    MealPlanUnsuitableForDietUpdateComponent,
    MealPlanUnsuitableForDietDeletePopupComponent,
    MealPlanUnsuitableForDietDeleteDialogComponent,
    mealPlanUnsuitableForDietRoute,
    mealPlanUnsuitableForDietPopupRoute
} from './';

const ENTITY_STATES = [...mealPlanUnsuitableForDietRoute, ...mealPlanUnsuitableForDietPopupRoute];

@NgModule({
    imports: [DietifySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MealPlanUnsuitableForDietComponent,
        MealPlanUnsuitableForDietDetailComponent,
        MealPlanUnsuitableForDietUpdateComponent,
        MealPlanUnsuitableForDietDeleteDialogComponent,
        MealPlanUnsuitableForDietDeletePopupComponent
    ],
    entryComponents: [
        MealPlanUnsuitableForDietComponent,
        MealPlanUnsuitableForDietUpdateComponent,
        MealPlanUnsuitableForDietDeleteDialogComponent,
        MealPlanUnsuitableForDietDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DietifyMealPlanUnsuitableForDietModule {}
