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
import {ProductComponent} from 'app/entities/product';
import {DietifyProductListModule} from 'app/entities/product/product-list.module';

const ENTITY_STATES = [...mealPlanRoute, ...mealPlanPopupRoute];

@NgModule({
    imports: [DietifySharedModule, RouterModule.forChild(ENTITY_STATES), DietifyProductListModule],
    declarations: [
        MealPlanComponent,
        MealPlanDetailComponent,
        MealPlanUpdateComponent,
        MealPlanDeleteDialogComponent,
        MealPlanDeletePopupComponent
    ],
    entryComponents: [MealPlanComponent, MealPlanUpdateComponent, MealPlanDeleteDialogComponent, MealPlanDeletePopupComponent, ProductComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DietifyMealPlanModule {}
