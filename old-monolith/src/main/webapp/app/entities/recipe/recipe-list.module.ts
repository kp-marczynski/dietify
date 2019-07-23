import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {DietifySharedModule} from 'app/shared';
import {RecipeComponent} from './';

@NgModule({
    imports: [DietifySharedModule, RouterModule],
    declarations: [RecipeComponent],
    entryComponents: [RecipeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DietifyRecipeListModule {
}
