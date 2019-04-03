import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DietifySharedModule } from 'app/shared';
import {
    PreparationStepComponent,
    PreparationStepDetailComponent,
    PreparationStepUpdateComponent,
    PreparationStepDeletePopupComponent,
    PreparationStepDeleteDialogComponent,
    preparationStepRoute,
    preparationStepPopupRoute
} from './';

const ENTITY_STATES = [...preparationStepRoute, ...preparationStepPopupRoute];

@NgModule({
    imports: [DietifySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PreparationStepComponent,
        PreparationStepDetailComponent,
        PreparationStepUpdateComponent,
        PreparationStepDeleteDialogComponent,
        PreparationStepDeletePopupComponent
    ],
    entryComponents: [
        PreparationStepComponent,
        PreparationStepUpdateComponent,
        PreparationStepDeleteDialogComponent,
        PreparationStepDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DietifyPreparationStepModule {}
