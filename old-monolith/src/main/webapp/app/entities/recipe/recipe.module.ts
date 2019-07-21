import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {DietifySharedModule} from 'app/shared';
import {
    RecipeComponent,
    RecipeDeleteDialogComponent,
    RecipeDeletePopupComponent,
    RecipeDetailComponent,
    recipePopupRoute,
    recipeRoute,
    RecipeUpdateComponent
} from './';
import {ProductComponent} from 'app/entities/product';
import {DietifyProductListModule} from 'app/entities/product/product-list.module';
import {DietifyRecipeListModule} from 'app/entities/recipe/recipe-list.module';

const ENTITY_STATES = [...recipeRoute, ...recipePopupRoute];

@NgModule({
    imports: [DietifySharedModule, RouterModule.forChild(ENTITY_STATES), DietifyProductListModule, DietifyRecipeListModule],
    declarations: [RecipeDetailComponent, RecipeUpdateComponent, RecipeDeleteDialogComponent, RecipeDeletePopupComponent],
    entryComponents: [RecipeComponent, RecipeUpdateComponent, RecipeDeleteDialogComponent, RecipeDeletePopupComponent, ProductComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DietifyRecipeModule {
}
