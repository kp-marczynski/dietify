import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  MealPlanDayComponent,
  MealPlanDayDetailComponent,
  MealPlanDayUpdateComponent,
  MealPlanDayDeletePopupComponent,
  MealPlanDayDeleteDialogComponent,
  mealPlanDayRoute,
  mealPlanDayPopupRoute
} from './';

const ENTITY_STATES = [...mealPlanDayRoute, ...mealPlanDayPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MealPlanDayComponent,
    MealPlanDayDetailComponent,
    MealPlanDayUpdateComponent,
    MealPlanDayDeleteDialogComponent,
    MealPlanDayDeletePopupComponent
  ],
  entryComponents: [MealPlanDayComponent, MealPlanDayUpdateComponent, MealPlanDayDeleteDialogComponent, MealPlanDayDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MealplansMealPlanDayModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
