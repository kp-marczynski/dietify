import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DietifySharedModule } from 'app/shared';
import {
    RecipeUnsuitableForDietComponent,
    RecipeUnsuitableForDietDetailComponent,
    RecipeUnsuitableForDietUpdateComponent,
    RecipeUnsuitableForDietDeletePopupComponent,
    RecipeUnsuitableForDietDeleteDialogComponent,
    recipeUnsuitableForDietRoute,
    recipeUnsuitableForDietPopupRoute
} from './';

const ENTITY_STATES = [...recipeUnsuitableForDietRoute, ...recipeUnsuitableForDietPopupRoute];

@NgModule({
    imports: [DietifySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RecipeUnsuitableForDietComponent,
        RecipeUnsuitableForDietDetailComponent,
        RecipeUnsuitableForDietUpdateComponent,
        RecipeUnsuitableForDietDeleteDialogComponent,
        RecipeUnsuitableForDietDeletePopupComponent
    ],
    entryComponents: [
        RecipeUnsuitableForDietComponent,
        RecipeUnsuitableForDietUpdateComponent,
        RecipeUnsuitableForDietDeleteDialogComponent,
        RecipeUnsuitableForDietDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DietifyRecipeUnsuitableForDietModule {}
