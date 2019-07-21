import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DietifySharedModule } from 'app/shared';
import {
    PatientCardComponent,
    PatientCardDetailComponent,
    PatientCardUpdateComponent,
    PatientCardDeletePopupComponent,
    PatientCardDeleteDialogComponent,
    patientCardRoute,
    patientCardPopupRoute
} from './';

const ENTITY_STATES = [...patientCardRoute, ...patientCardPopupRoute];

@NgModule({
    imports: [DietifySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PatientCardComponent,
        PatientCardDetailComponent,
        PatientCardUpdateComponent,
        PatientCardDeleteDialogComponent,
        PatientCardDeletePopupComponent
    ],
    entryComponents: [PatientCardComponent, PatientCardUpdateComponent, PatientCardDeleteDialogComponent, PatientCardDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DietifyPatientCardModule {}
