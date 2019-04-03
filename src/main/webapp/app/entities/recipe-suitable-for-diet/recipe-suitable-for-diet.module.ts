import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DietifySharedModule } from 'app/shared';
import {
    RecipeSuitableForDietComponent,
    RecipeSuitableForDietDetailComponent,
    RecipeSuitableForDietUpdateComponent,
    RecipeSuitableForDietDeletePopupComponent,
    RecipeSuitableForDietDeleteDialogComponent,
    recipeSuitableForDietRoute,
    recipeSuitableForDietPopupRoute
} from './';

const ENTITY_STATES = [...recipeSuitableForDietRoute, ...recipeSuitableForDietPopupRoute];

@NgModule({
    imports: [DietifySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RecipeSuitableForDietComponent,
        RecipeSuitableForDietDetailComponent,
        RecipeSuitableForDietUpdateComponent,
        RecipeSuitableForDietDeleteDialogComponent,
        RecipeSuitableForDietDeletePopupComponent
    ],
    entryComponents: [
        RecipeSuitableForDietComponent,
        RecipeSuitableForDietUpdateComponent,
        RecipeSuitableForDietDeleteDialogComponent,
        RecipeSuitableForDietDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DietifyRecipeSuitableForDietModule {}
