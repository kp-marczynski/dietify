import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DietifySharedModule } from 'app/shared';
import {
    KitchenApplianceComponent,
    KitchenApplianceDetailComponent,
    KitchenApplianceUpdateComponent,
    KitchenApplianceDeletePopupComponent,
    KitchenApplianceDeleteDialogComponent,
    kitchenApplianceRoute,
    kitchenAppliancePopupRoute
} from './';

const ENTITY_STATES = [...kitchenApplianceRoute, ...kitchenAppliancePopupRoute];

@NgModule({
    imports: [DietifySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        KitchenApplianceComponent,
        KitchenApplianceDetailComponent,
        KitchenApplianceUpdateComponent,
        KitchenApplianceDeleteDialogComponent,
        KitchenApplianceDeletePopupComponent
    ],
    entryComponents: [
        KitchenApplianceComponent,
        KitchenApplianceUpdateComponent,
        KitchenApplianceDeleteDialogComponent,
        KitchenApplianceDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DietifyKitchenApplianceModule {}
