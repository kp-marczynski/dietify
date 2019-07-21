import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DietifySharedModule } from 'app/shared';
import {
    ProductSubcategoryComponent,
    ProductSubcategoryDetailComponent,
    ProductSubcategoryUpdateComponent,
    ProductSubcategoryDeletePopupComponent,
    ProductSubcategoryDeleteDialogComponent,
    productSubcategoryRoute,
    productSubcategoryPopupRoute
} from './';

const ENTITY_STATES = [...productSubcategoryRoute, ...productSubcategoryPopupRoute];

@NgModule({
    imports: [DietifySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProductSubcategoryComponent,
        ProductSubcategoryDetailComponent,
        ProductSubcategoryUpdateComponent,
        ProductSubcategoryDeleteDialogComponent,
        ProductSubcategoryDeletePopupComponent
    ],
    entryComponents: [
        ProductSubcategoryComponent,
        ProductSubcategoryUpdateComponent,
        ProductSubcategoryDeleteDialogComponent,
        ProductSubcategoryDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DietifyProductSubcategoryModule {}
