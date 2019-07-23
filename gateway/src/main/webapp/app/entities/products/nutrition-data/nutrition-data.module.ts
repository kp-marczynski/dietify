import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  NutritionDataComponent,
  NutritionDataDetailComponent,
  NutritionDataUpdateComponent,
  NutritionDataDeletePopupComponent,
  NutritionDataDeleteDialogComponent,
  nutritionDataRoute,
  nutritionDataPopupRoute
} from './';

const ENTITY_STATES = [...nutritionDataRoute, ...nutritionDataPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    NutritionDataComponent,
    NutritionDataDetailComponent,
    NutritionDataUpdateComponent,
    NutritionDataDeleteDialogComponent,
    NutritionDataDeletePopupComponent
  ],
  entryComponents: [
    NutritionDataComponent,
    NutritionDataUpdateComponent,
    NutritionDataDeleteDialogComponent,
    NutritionDataDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductsNutritionDataModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
