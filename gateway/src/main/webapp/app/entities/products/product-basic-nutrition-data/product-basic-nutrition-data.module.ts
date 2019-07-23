import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  ProductBasicNutritionDataComponent,
  ProductBasicNutritionDataDetailComponent,
  ProductBasicNutritionDataUpdateComponent,
  ProductBasicNutritionDataDeletePopupComponent,
  ProductBasicNutritionDataDeleteDialogComponent,
  productBasicNutritionDataRoute,
  productBasicNutritionDataPopupRoute
} from './';

const ENTITY_STATES = [...productBasicNutritionDataRoute, ...productBasicNutritionDataPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ProductBasicNutritionDataComponent,
    ProductBasicNutritionDataDetailComponent,
    ProductBasicNutritionDataUpdateComponent,
    ProductBasicNutritionDataDeleteDialogComponent,
    ProductBasicNutritionDataDeletePopupComponent
  ],
  entryComponents: [
    ProductBasicNutritionDataComponent,
    ProductBasicNutritionDataUpdateComponent,
    ProductBasicNutritionDataDeleteDialogComponent,
    ProductBasicNutritionDataDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductsProductBasicNutritionDataModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
