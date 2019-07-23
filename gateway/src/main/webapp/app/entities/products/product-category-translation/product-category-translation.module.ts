import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  ProductCategoryTranslationComponent,
  ProductCategoryTranslationDetailComponent,
  ProductCategoryTranslationUpdateComponent,
  ProductCategoryTranslationDeletePopupComponent,
  ProductCategoryTranslationDeleteDialogComponent,
  productCategoryTranslationRoute,
  productCategoryTranslationPopupRoute
} from './';

const ENTITY_STATES = [...productCategoryTranslationRoute, ...productCategoryTranslationPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ProductCategoryTranslationComponent,
    ProductCategoryTranslationDetailComponent,
    ProductCategoryTranslationUpdateComponent,
    ProductCategoryTranslationDeleteDialogComponent,
    ProductCategoryTranslationDeletePopupComponent
  ],
  entryComponents: [
    ProductCategoryTranslationComponent,
    ProductCategoryTranslationUpdateComponent,
    ProductCategoryTranslationDeleteDialogComponent,
    ProductCategoryTranslationDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductsProductCategoryTranslationModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
