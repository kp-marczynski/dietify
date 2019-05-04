import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DietifySharedModule } from 'app/shared';
import {
    MealDefinitionComponent,
    MealDefinitionDetailComponent,
    MealDefinitionUpdateComponent,
    MealDefinitionDeletePopupComponent,
    MealDefinitionDeleteDialogComponent,
    mealDefinitionRoute,
    mealDefinitionPopupRoute
} from './';

const ENTITY_STATES = [...mealDefinitionRoute, ...mealDefinitionPopupRoute];

@NgModule({
    imports: [DietifySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MealDefinitionComponent,
        MealDefinitionDetailComponent,
        MealDefinitionUpdateComponent,
        MealDefinitionDeleteDialogComponent,
        MealDefinitionDeletePopupComponent
    ],
    entryComponents: [
        MealDefinitionComponent,
        MealDefinitionUpdateComponent,
        MealDefinitionDeleteDialogComponent,
        MealDefinitionDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DietifyMealDefinitionModule {}
