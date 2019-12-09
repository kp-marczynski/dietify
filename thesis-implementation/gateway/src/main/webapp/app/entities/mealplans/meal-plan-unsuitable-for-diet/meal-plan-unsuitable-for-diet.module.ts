import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  MealPlanUnsuitableForDietComponent,
  MealPlanUnsuitableForDietDetailComponent,
  MealPlanUnsuitableForDietUpdateComponent,
  MealPlanUnsuitableForDietDeletePopupComponent,
  MealPlanUnsuitableForDietDeleteDialogComponent,
  mealPlanUnsuitableForDietRoute,
  mealPlanUnsuitableForDietPopupRoute
} from './';

const ENTITY_STATES = [...mealPlanUnsuitableForDietRoute, ...mealPlanUnsuitableForDietPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MealPlanUnsuitableForDietComponent,
    MealPlanUnsuitableForDietDetailComponent,
    MealPlanUnsuitableForDietUpdateComponent,
    MealPlanUnsuitableForDietDeleteDialogComponent,
    MealPlanUnsuitableForDietDeletePopupComponent
  ],
  entryComponents: [
    MealPlanUnsuitableForDietComponent,
    MealPlanUnsuitableForDietUpdateComponent,
    MealPlanUnsuitableForDietDeleteDialogComponent,
    MealPlanUnsuitableForDietDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MealplansMealPlanUnsuitableForDietModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
