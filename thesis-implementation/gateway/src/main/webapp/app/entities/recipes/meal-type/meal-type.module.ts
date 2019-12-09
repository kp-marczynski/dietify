import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  MealTypeComponent,
  MealTypeDetailComponent,
  MealTypeUpdateComponent,
  MealTypeDeletePopupComponent,
  MealTypeDeleteDialogComponent,
  mealTypeRoute,
  mealTypePopupRoute
} from './';

const ENTITY_STATES = [...mealTypeRoute, ...mealTypePopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MealTypeComponent,
    MealTypeDetailComponent,
    MealTypeUpdateComponent,
    MealTypeDeleteDialogComponent,
    MealTypeDeletePopupComponent
  ],
  entryComponents: [MealTypeComponent, MealTypeUpdateComponent, MealTypeDeleteDialogComponent, MealTypeDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecipesMealTypeModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
