import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
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
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
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
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecipesRecipeUnsuitableForDietModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
