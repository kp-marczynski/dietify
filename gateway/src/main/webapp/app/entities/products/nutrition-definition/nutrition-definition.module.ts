import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  NutritionDefinitionComponent,
  NutritionDefinitionDetailComponent,
  NutritionDefinitionUpdateComponent,
  NutritionDefinitionDeletePopupComponent,
  NutritionDefinitionDeleteDialogComponent,
  nutritionDefinitionRoute,
  nutritionDefinitionPopupRoute
} from './';

const ENTITY_STATES = [...nutritionDefinitionRoute, ...nutritionDefinitionPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    NutritionDefinitionComponent,
    NutritionDefinitionDetailComponent,
    NutritionDefinitionUpdateComponent,
    NutritionDefinitionDeleteDialogComponent,
    NutritionDefinitionDeletePopupComponent
  ],
  entryComponents: [
    NutritionDefinitionComponent,
    NutritionDefinitionUpdateComponent,
    NutritionDefinitionDeleteDialogComponent,
    NutritionDefinitionDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductsNutritionDefinitionModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
