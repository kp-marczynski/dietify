import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DietifySharedModule } from 'app/shared';
import {
    BodyMeasurmentComponent,
    BodyMeasurmentDetailComponent,
    BodyMeasurmentUpdateComponent,
    BodyMeasurmentDeletePopupComponent,
    BodyMeasurmentDeleteDialogComponent,
    bodyMeasurmentRoute,
    bodyMeasurmentPopupRoute
} from './';

const ENTITY_STATES = [...bodyMeasurmentRoute, ...bodyMeasurmentPopupRoute];

@NgModule({
    imports: [DietifySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BodyMeasurmentComponent,
        BodyMeasurmentDetailComponent,
        BodyMeasurmentUpdateComponent,
        BodyMeasurmentDeleteDialogComponent,
        BodyMeasurmentDeletePopupComponent
    ],
    entryComponents: [
        BodyMeasurmentComponent,
        BodyMeasurmentUpdateComponent,
        BodyMeasurmentDeleteDialogComponent,
        BodyMeasurmentDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DietifyBodyMeasurmentModule {}
