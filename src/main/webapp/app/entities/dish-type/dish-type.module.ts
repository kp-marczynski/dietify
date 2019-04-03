import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DietifySharedModule } from 'app/shared';
import {
    DishTypeComponent,
    DishTypeDetailComponent,
    DishTypeUpdateComponent,
    DishTypeDeletePopupComponent,
    DishTypeDeleteDialogComponent,
    dishTypeRoute,
    dishTypePopupRoute
} from './';

const ENTITY_STATES = [...dishTypeRoute, ...dishTypePopupRoute];

@NgModule({
    imports: [DietifySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DishTypeComponent,
        DishTypeDetailComponent,
        DishTypeUpdateComponent,
        DishTypeDeleteDialogComponent,
        DishTypeDeletePopupComponent
    ],
    entryComponents: [DishTypeComponent, DishTypeUpdateComponent, DishTypeDeleteDialogComponent, DishTypeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DietifyDishTypeModule {}
