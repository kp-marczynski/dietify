import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  MealPlanComponent,
  MealPlanDetailComponent,
  MealPlanUpdateComponent,
  MealPlanDeletePopupComponent,
  MealPlanDeleteDialogComponent,
  mealPlanRoute,
  mealPlanPopupRoute
} from './';
import { NgbModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { MealDetailComponent, MealUpdateComponent} from 'app/entities/mealplans/meal';
import {MealplansMealModule} from 'app/entities/mealplans/meal/meal.module';

const ENTITY_STATES = [...mealPlanRoute, ...mealPlanPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES), NgbTabsetModule, NgbModule, MealplansMealModule],
  declarations: [
    MealPlanComponent,
    MealPlanDetailComponent,
    MealPlanUpdateComponent,
    MealPlanDeleteDialogComponent,
    MealPlanDeletePopupComponent
  ],
  entryComponents: [MealPlanComponent, MealPlanUpdateComponent, MealPlanDeleteDialogComponent, MealPlanDeletePopupComponent, MealUpdateComponent, MealDetailComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MealplansMealPlanModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
