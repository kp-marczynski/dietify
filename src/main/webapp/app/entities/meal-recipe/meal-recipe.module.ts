import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DietifySharedModule } from 'app/shared';
import {
    MealRecipeComponent,
    MealRecipeDetailComponent,
    MealRecipeUpdateComponent,
    MealRecipeDeletePopupComponent,
    MealRecipeDeleteDialogComponent,
    mealRecipeRoute,
    mealRecipePopupRoute
} from './';

const ENTITY_STATES = [...mealRecipeRoute, ...mealRecipePopupRoute];

@NgModule({
    imports: [DietifySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MealRecipeComponent,
        MealRecipeDetailComponent,
        MealRecipeUpdateComponent,
        MealRecipeDeleteDialogComponent,
        MealRecipeDeletePopupComponent
    ],
    entryComponents: [MealRecipeComponent, MealRecipeUpdateComponent, MealRecipeDeleteDialogComponent, MealRecipeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DietifyMealRecipeModule {}
