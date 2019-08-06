import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import { RecipeComponent } from './';

@NgModule({
  imports: [GatewaySharedModule, RouterModule],
  declarations: [RecipeComponent],
  entryComponents: [RecipeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecipesRecipeListModule {}
