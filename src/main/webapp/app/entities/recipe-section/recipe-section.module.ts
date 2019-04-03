import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DietifySharedModule } from 'app/shared';
import {
    RecipeSectionComponent,
    RecipeSectionDetailComponent,
    RecipeSectionUpdateComponent,
    RecipeSectionDeletePopupComponent,
    RecipeSectionDeleteDialogComponent,
    recipeSectionRoute,
    recipeSectionPopupRoute
} from './';

const ENTITY_STATES = [...recipeSectionRoute, ...recipeSectionPopupRoute];

@NgModule({
    imports: [DietifySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RecipeSectionComponent,
        RecipeSectionDetailComponent,
        RecipeSectionUpdateComponent,
        RecipeSectionDeleteDialogComponent,
        RecipeSectionDeletePopupComponent
    ],
    entryComponents: [
        RecipeSectionComponent,
        RecipeSectionUpdateComponent,
        RecipeSectionDeleteDialogComponent,
        RecipeSectionDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DietifyRecipeSectionModule {}
