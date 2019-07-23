import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  RecipeBasicNutritionDataComponent,
  RecipeBasicNutritionDataDetailComponent,
  RecipeBasicNutritionDataUpdateComponent,
  RecipeBasicNutritionDataDeletePopupComponent,
  RecipeBasicNutritionDataDeleteDialogComponent,
  recipeBasicNutritionDataRoute,
  recipeBasicNutritionDataPopupRoute
} from './';

const ENTITY_STATES = [...recipeBasicNutritionDataRoute, ...recipeBasicNutritionDataPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    RecipeBasicNutritionDataComponent,
    RecipeBasicNutritionDataDetailComponent,
    RecipeBasicNutritionDataUpdateComponent,
    RecipeBasicNutritionDataDeleteDialogComponent,
    RecipeBasicNutritionDataDeletePopupComponent
  ],
  entryComponents: [
    RecipeBasicNutritionDataComponent,
    RecipeBasicNutritionDataUpdateComponent,
    RecipeBasicNutritionDataDeleteDialogComponent,
    RecipeBasicNutritionDataDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecipesRecipeBasicNutritionDataModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
