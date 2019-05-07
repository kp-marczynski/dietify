import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterModule} from '@angular/router';

import {DietifySharedModule} from 'app/shared';
import {
    MealDetailComponent,
    MealUpdateComponent,
} from './';
import {DietifyRecipeListModule} from 'app/entities/recipe/recipe-list.module';
import {DietifyProductListModule} from 'app/entities/product/product-list.module';
import {RecipeComponent} from 'app/entities/recipe';
import {ProductComponent} from 'app/entities/product';

@NgModule({
    imports: [DietifySharedModule, RouterModule, DietifyRecipeListModule, DietifyProductListModule],
    declarations: [MealDetailComponent, MealUpdateComponent],
    entryComponents: [MealUpdateComponent, RecipeComponent, ProductComponent],
    exports: [MealUpdateComponent, MealDetailComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DietifyMealModule {
}
