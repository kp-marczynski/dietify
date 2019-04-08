import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DietifySharedModule } from 'app/shared';
import {
    RecipeComponent,
    RecipeDetailComponent,
    RecipeUpdateComponent,
    RecipeDeletePopupComponent,
    RecipeDeleteDialogComponent,
    recipeRoute,
    recipePopupRoute
} from './';

const ENTITY_STATES = [...recipeRoute, ...recipePopupRoute];

@NgModule({
    imports: [DietifySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [RecipeComponent, RecipeDetailComponent, RecipeUpdateComponent, RecipeDeleteDialogComponent, RecipeDeletePopupComponent],
    entryComponents: [RecipeComponent, RecipeUpdateComponent, RecipeDeleteDialogComponent, RecipeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DietifyRecipeModule {}
