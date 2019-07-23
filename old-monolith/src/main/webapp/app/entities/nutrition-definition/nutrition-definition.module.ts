import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DietifySharedModule } from 'app/shared';
import {
    NutritionDefinitionComponent,
    NutritionDefinitionDetailComponent,
    NutritionDefinitionUpdateComponent,
    NutritionDefinitionDeletePopupComponent,
    NutritionDefinitionDeleteDialogComponent,
    nutritionDefinitionRoute,
    nutritionDefinitionPopupRoute
} from './';

const ENTITY_STATES = [...nutritionDefinitionRoute, ...nutritionDefinitionPopupRoute];

@NgModule({
    imports: [DietifySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        NutritionDefinitionComponent,
        NutritionDefinitionDetailComponent,
        NutritionDefinitionUpdateComponent,
        NutritionDefinitionDeleteDialogComponent,
        NutritionDefinitionDeletePopupComponent
    ],
    entryComponents: [
        NutritionDefinitionComponent,
        NutritionDefinitionUpdateComponent,
        NutritionDefinitionDeleteDialogComponent,
        NutritionDefinitionDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DietifyNutritionDefinitionModule {}
