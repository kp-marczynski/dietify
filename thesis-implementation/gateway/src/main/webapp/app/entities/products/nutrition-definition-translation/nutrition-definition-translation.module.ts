import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  NutritionDefinitionTranslationComponent,
  NutritionDefinitionTranslationDetailComponent,
  NutritionDefinitionTranslationUpdateComponent,
  NutritionDefinitionTranslationDeletePopupComponent,
  NutritionDefinitionTranslationDeleteDialogComponent,
  nutritionDefinitionTranslationRoute,
  nutritionDefinitionTranslationPopupRoute
} from './';

const ENTITY_STATES = [...nutritionDefinitionTranslationRoute, ...nutritionDefinitionTranslationPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    NutritionDefinitionTranslationComponent,
    NutritionDefinitionTranslationDetailComponent,
    NutritionDefinitionTranslationUpdateComponent,
    NutritionDefinitionTranslationDeleteDialogComponent,
    NutritionDefinitionTranslationDeletePopupComponent
  ],
  entryComponents: [
    NutritionDefinitionTranslationComponent,
    NutritionDefinitionTranslationUpdateComponent,
    NutritionDefinitionTranslationDeleteDialogComponent,
    NutritionDefinitionTranslationDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductsNutritionDefinitionTranslationModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
