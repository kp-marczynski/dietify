import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  AssignedMealPlanComponent,
  AssignedMealPlanDetailComponent,
  AssignedMealPlanUpdateComponent,
  AssignedMealPlanDeletePopupComponent,
  AssignedMealPlanDeleteDialogComponent,
  assignedMealPlanRoute,
  assignedMealPlanPopupRoute
} from './';

const ENTITY_STATES = [...assignedMealPlanRoute, ...assignedMealPlanPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AssignedMealPlanComponent,
    AssignedMealPlanDetailComponent,
    AssignedMealPlanUpdateComponent,
    AssignedMealPlanDeleteDialogComponent,
    AssignedMealPlanDeletePopupComponent
  ],
  entryComponents: [
    AssignedMealPlanComponent,
    AssignedMealPlanUpdateComponent,
    AssignedMealPlanDeleteDialogComponent,
    AssignedMealPlanDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppointmentsAssignedMealPlanModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
