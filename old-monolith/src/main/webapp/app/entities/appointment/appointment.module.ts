import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DietifySharedModule } from 'app/shared';
import {
    AppointmentComponent,
    AppointmentDetailComponent,
    AppointmentUpdateComponent,
    AppointmentDeletePopupComponent,
    AppointmentDeleteDialogComponent,
    appointmentRoute,
    appointmentPopupRoute
} from './';

const ENTITY_STATES = [...appointmentRoute, ...appointmentPopupRoute];

@NgModule({
    imports: [DietifySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AppointmentComponent,
        AppointmentDetailComponent,
        AppointmentUpdateComponent,
        AppointmentDeleteDialogComponent,
        AppointmentDeletePopupComponent
    ],
    entryComponents: [AppointmentComponent, AppointmentUpdateComponent, AppointmentDeleteDialogComponent, AppointmentDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DietifyAppointmentModule {}
