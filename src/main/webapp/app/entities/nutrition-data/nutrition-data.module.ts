import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DietifySharedModule } from 'app/shared';
import {
    NutritionDataComponent,
    NutritionDataDetailComponent,
    NutritionDataUpdateComponent,
    NutritionDataDeletePopupComponent,
    NutritionDataDeleteDialogComponent,
    nutritionDataRoute,
    nutritionDataPopupRoute
} from './';

const ENTITY_STATES = [...nutritionDataRoute, ...nutritionDataPopupRoute];

@NgModule({
    imports: [DietifySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        NutritionDataComponent,
        NutritionDataDetailComponent,
        NutritionDataUpdateComponent,
        NutritionDataDeleteDialogComponent,
        NutritionDataDeletePopupComponent
    ],
    entryComponents: [
        NutritionDataComponent,
        NutritionDataUpdateComponent,
        NutritionDataDeleteDialogComponent,
        NutritionDataDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DietifyNutritionDataModule {}
