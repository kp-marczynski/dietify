import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DietifySharedModule } from 'app/shared';
import {
    MealPlanSuitableForDietComponent,
    MealPlanSuitableForDietDetailComponent,
    MealPlanSuitableForDietUpdateComponent,
    MealPlanSuitableForDietDeletePopupComponent,
    MealPlanSuitableForDietDeleteDialogComponent,
    mealPlanSuitableForDietRoute,
    mealPlanSuitableForDietPopupRoute
} from './';

const ENTITY_STATES = [...mealPlanSuitableForDietRoute, ...mealPlanSuitableForDietPopupRoute];

@NgModule({
    imports: [DietifySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MealPlanSuitableForDietComponent,
        MealPlanSuitableForDietDetailComponent,
        MealPlanSuitableForDietUpdateComponent,
        MealPlanSuitableForDietDeleteDialogComponent,
        MealPlanSuitableForDietDeletePopupComponent
    ],
    entryComponents: [
        MealPlanSuitableForDietComponent,
        MealPlanSuitableForDietUpdateComponent,
        MealPlanSuitableForDietDeleteDialogComponent,
        MealPlanSuitableForDietDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DietifyMealPlanSuitableForDietModule {}
