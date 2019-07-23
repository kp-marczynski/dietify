import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  ProductSubcategoryComponent,
  ProductSubcategoryDetailComponent,
  ProductSubcategoryUpdateComponent,
  ProductSubcategoryDeletePopupComponent,
  ProductSubcategoryDeleteDialogComponent,
  productSubcategoryRoute,
  productSubcategoryPopupRoute
} from './';

const ENTITY_STATES = [...productSubcategoryRoute, ...productSubcategoryPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ProductSubcategoryComponent,
    ProductSubcategoryDetailComponent,
    ProductSubcategoryUpdateComponent,
    ProductSubcategoryDeleteDialogComponent,
    ProductSubcategoryDeletePopupComponent
  ],
  entryComponents: [
    ProductSubcategoryComponent,
    ProductSubcategoryUpdateComponent,
    ProductSubcategoryDeleteDialogComponent,
    ProductSubcategoryDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductsProductSubcategoryModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
