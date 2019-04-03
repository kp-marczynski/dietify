import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DietifySharedModule } from 'app/shared';
import {
    ProductPortionComponent,
    ProductPortionDetailComponent,
    ProductPortionUpdateComponent,
    ProductPortionDeletePopupComponent,
    ProductPortionDeleteDialogComponent,
    productPortionRoute,
    productPortionPopupRoute
} from './';

const ENTITY_STATES = [...productPortionRoute, ...productPortionPopupRoute];

@NgModule({
    imports: [DietifySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProductPortionComponent,
        ProductPortionDetailComponent,
        ProductPortionUpdateComponent,
        ProductPortionDeleteDialogComponent,
        ProductPortionDeletePopupComponent
    ],
    entryComponents: [
        ProductPortionComponent,
        ProductPortionUpdateComponent,
        ProductPortionDeleteDialogComponent,
        ProductPortionDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DietifyProductPortionModule {}
