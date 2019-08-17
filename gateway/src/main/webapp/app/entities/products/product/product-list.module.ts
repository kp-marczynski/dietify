import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {ProductComponent} from './';

@NgModule({
    imports: [GatewaySharedModule, RouterModule],
    declarations: [ProductComponent],
    entryComponents: [ProductComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductsProductListModule {
}
