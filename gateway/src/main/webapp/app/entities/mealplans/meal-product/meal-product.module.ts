import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  MealProductComponent,
  MealProductDetailComponent,
  MealProductUpdateComponent,
  MealProductDeletePopupComponent,
  MealProductDeleteDialogComponent,
  mealProductRoute,
  mealProductPopupRoute
} from './';

const ENTITY_STATES = [...mealProductRoute, ...mealProductPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MealProductComponent,
    MealProductDetailComponent,
    MealProductUpdateComponent,
    MealProductDeleteDialogComponent,
    MealProductDeletePopupComponent
  ],
  entryComponents: [MealProductComponent, MealProductUpdateComponent, MealProductDeleteDialogComponent, MealProductDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MealplansMealProductModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
