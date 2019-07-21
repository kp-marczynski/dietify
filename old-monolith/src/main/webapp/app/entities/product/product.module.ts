import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {DietifySharedModule} from 'app/shared';
import {
    ProductComponent,
    ProductDeleteDialogComponent,
    ProductDeletePopupComponent,
    ProductDetailComponent,
    productPopupRoute,
    productRoute,
    ProductUpdateComponent
} from './';
import {DietifyProductListModule} from 'app/entities/product/product-list.module';

const ENTITY_STATES = [...productRoute, ...productPopupRoute];

@NgModule({
    imports: [DietifySharedModule, RouterModule.forChild(ENTITY_STATES), DietifyProductListModule],
    declarations: [
        ProductDetailComponent,
        ProductUpdateComponent,
        ProductDeleteDialogComponent,
        ProductDeletePopupComponent
    ],
    entryComponents: [ProductComponent, ProductUpdateComponent, ProductDeleteDialogComponent, ProductDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DietifyProductModule {
}
