import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DietifySharedModule } from 'app/shared';
import {
    DietTypeComponent,
    DietTypeDetailComponent,
    DietTypeUpdateComponent,
    DietTypeDeletePopupComponent,
    DietTypeDeleteDialogComponent,
    dietTypeRoute,
    dietTypePopupRoute
} from './';

const ENTITY_STATES = [...dietTypeRoute, ...dietTypePopupRoute];

@NgModule({
    imports: [DietifySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DietTypeComponent,
        DietTypeDetailComponent,
        DietTypeUpdateComponent,
        DietTypeDeleteDialogComponent,
        DietTypeDeletePopupComponent
    ],
    entryComponents: [DietTypeComponent, DietTypeUpdateComponent, DietTypeDeleteDialogComponent, DietTypeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DietifyDietTypeModule {}
