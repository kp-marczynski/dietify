import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DietifySharedModule } from 'app/shared';
import {
    HouseholdMeasureComponent,
    HouseholdMeasureDetailComponent,
    HouseholdMeasureUpdateComponent,
    HouseholdMeasureDeletePopupComponent,
    HouseholdMeasureDeleteDialogComponent,
    householdMeasureRoute,
    householdMeasurePopupRoute
} from './';

const ENTITY_STATES = [...householdMeasureRoute, ...householdMeasurePopupRoute];

@NgModule({
    imports: [DietifySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        HouseholdMeasureComponent,
        HouseholdMeasureDetailComponent,
        HouseholdMeasureUpdateComponent,
        HouseholdMeasureDeleteDialogComponent,
        HouseholdMeasureDeletePopupComponent
    ],
    entryComponents: [
        HouseholdMeasureComponent,
        HouseholdMeasureUpdateComponent,
        HouseholdMeasureDeleteDialogComponent,
        HouseholdMeasureDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DietifyHouseholdMeasureModule {}
