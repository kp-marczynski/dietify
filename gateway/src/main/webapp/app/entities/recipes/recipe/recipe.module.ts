import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
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
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [RecipeComponent, RecipeDetailComponent, RecipeUpdateComponent, RecipeDeleteDialogComponent, RecipeDeletePopupComponent],
  entryComponents: [RecipeComponent, RecipeUpdateComponent, RecipeDeleteDialogComponent, RecipeDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecipesRecipeModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
