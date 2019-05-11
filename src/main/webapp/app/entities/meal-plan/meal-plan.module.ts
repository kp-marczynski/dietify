import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {DietifySharedModule} from 'app/shared';
import {
    MealPlanComponent,
    MealPlanDeleteDialogComponent,
    MealPlanDeletePopupComponent,
    MealPlanDetailComponent,
    mealPlanPopupRoute,
    mealPlanRoute,
    MealPlanUpdateComponent
} from './';
import {MealDetailComponent, MealUpdateComponent} from 'app/entities/meal';
import {DietifyMealModule} from 'app/entities/meal/meal.module';

const ENTITY_STATES = [...mealPlanRoute, ...mealPlanPopupRoute];

@NgModule({
    imports: [
        DietifySharedModule,
        RouterModule.forChild(ENTITY_STATES),
        DietifyMealModule
    ],
    declarations: [
        MealPlanComponent,
        MealPlanDetailComponent,
        MealPlanUpdateComponent,
        MealPlanDeleteDialogComponent,
        MealPlanDeletePopupComponent
    ],
    entryComponents: [
        MealPlanComponent,
        MealPlanUpdateComponent,
        MealPlanDeleteDialogComponent,
        MealPlanDeletePopupComponent,
        MealUpdateComponent,
        MealDetailComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DietifyMealPlanModule {
}
