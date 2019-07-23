import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  MealPlanSuitableForDietComponent,
  MealPlanSuitableForDietDetailComponent,
  MealPlanSuitableForDietUpdateComponent,
  MealPlanSuitableForDietDeletePopupComponent,
  MealPlanSuitableForDietDeleteDialogComponent,
  mealPlanSuitableForDietRoute,
  mealPlanSuitableForDietPopupRoute
} from './';

const ENTITY_STATES = [...mealPlanSuitableForDietRoute, ...mealPlanSuitableForDietPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MealPlanSuitableForDietComponent,
    MealPlanSuitableForDietDetailComponent,
    MealPlanSuitableForDietUpdateComponent,
    MealPlanSuitableForDietDeleteDialogComponent,
    MealPlanSuitableForDietDeletePopupComponent
  ],
  entryComponents: [
    MealPlanSuitableForDietComponent,
    MealPlanSuitableForDietUpdateComponent,
    MealPlanSuitableForDietDeleteDialogComponent,
    MealPlanSuitableForDietDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MealplansMealPlanSuitableForDietModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
