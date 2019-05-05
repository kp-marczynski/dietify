import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DietifySharedModule } from 'app/shared';
import {
    MealProductComponent,
    MealProductDetailComponent,
    MealProductUpdateComponent,
    MealProductDeletePopupComponent,
    MealProductDeleteDialogComponent,
    mealProductRoute,
    mealProductPopupRoute
} from './';

const ENTITY_STATES = [...mealProductRoute, ...mealProductPopupRoute];

@NgModule({
    imports: [DietifySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MealProductComponent,
        MealProductDetailComponent,
        MealProductUpdateComponent,
        MealProductDeleteDialogComponent,
        MealProductDeletePopupComponent
    ],
    entryComponents: [MealProductComponent, MealProductUpdateComponent, MealProductDeleteDialogComponent, MealProductDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DietifyMealProductModule {}
