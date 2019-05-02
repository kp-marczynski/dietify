import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {DietifySharedModule} from 'app/shared';
import {ProductComponent} from './';

@NgModule({
    imports: [DietifySharedModule, RouterModule],
    declarations: [ProductComponent],
    entryComponents: [ProductComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DietifyProductListModule {
}
