import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  ProductPortionComponent,
  ProductPortionDetailComponent,
  ProductPortionUpdateComponent,
  ProductPortionDeletePopupComponent,
  ProductPortionDeleteDialogComponent,
  productPortionRoute,
  productPortionPopupRoute
} from './';

const ENTITY_STATES = [...productPortionRoute, ...productPortionPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ProductPortionComponent,
    ProductPortionDetailComponent,
    ProductPortionUpdateComponent,
    ProductPortionDeleteDialogComponent,
    ProductPortionDeletePopupComponent
  ],
  entryComponents: [
    ProductPortionComponent,
    ProductPortionUpdateComponent,
    ProductPortionDeleteDialogComponent,
    ProductPortionDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecipesProductPortionModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
