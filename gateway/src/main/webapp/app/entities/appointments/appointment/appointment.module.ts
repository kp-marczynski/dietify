import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  AppointmentComponent,
  AppointmentDetailComponent,
  AppointmentUpdateComponent,
  AppointmentDeletePopupComponent,
  AppointmentDeleteDialogComponent,
  appointmentRoute,
  appointmentPopupRoute
} from './';
import {AppointmentsAppointmentListModule} from 'app/entities/appointments/appointment/appointment-list.module';
import {MealPlansMealPlanListModule} from 'app/entities/mealplans/meal-plan/meal-plan-list.module';
import {MealPlanComponent} from 'app/entities/mealplans/meal-plan';

const ENTITY_STATES = [...appointmentRoute, ...appointmentPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES), AppointmentsAppointmentListModule, MealPlansMealPlanListModule],
  declarations: [
    AppointmentDetailComponent,
    AppointmentUpdateComponent,
    AppointmentDeleteDialogComponent,
    AppointmentDeletePopupComponent
  ],
  entryComponents: [AppointmentComponent, AppointmentUpdateComponent, AppointmentDeleteDialogComponent, AppointmentDeletePopupComponent, MealPlanComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppointmentsAppointmentModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
