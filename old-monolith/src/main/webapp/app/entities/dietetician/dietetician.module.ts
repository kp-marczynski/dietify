import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DietifySharedModule } from 'app/shared';
import {
    DieteticianComponent,
    DieteticianDetailComponent,
    DieteticianUpdateComponent,
    DieteticianDeletePopupComponent,
    DieteticianDeleteDialogComponent,
    dieteticianRoute,
    dieteticianPopupRoute
} from './';

const ENTITY_STATES = [...dieteticianRoute, ...dieteticianPopupRoute];

@NgModule({
    imports: [DietifySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DieteticianComponent,
        DieteticianDetailComponent,
        DieteticianUpdateComponent,
        DieteticianDeleteDialogComponent,
        DieteticianDeletePopupComponent
    ],
    entryComponents: [DieteticianComponent, DieteticianUpdateComponent, DieteticianDeleteDialogComponent, DieteticianDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DietifyDieteticianModule {}
