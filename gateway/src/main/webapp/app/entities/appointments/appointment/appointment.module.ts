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
import { AppointmentsAppointmentListModule } from 'app/entities/appointments/appointment/appointment-list.module';
import { MealPlansMealPlanListModule } from 'app/entities/mealplans/meal-plan/meal-plan-list.module';
import { MealPlanComponent } from 'app/entities/mealplans/meal-plan';
import { AppointmentsNutritionalInterviewModule } from 'app/entities/appointments/nutritional-interview/nutritional-interview.module';
import { NutritionalInterviewDetailComponent, NutritionalInterviewUpdateComponent } from 'app/entities/appointments/nutritional-interview';
import { AppointmentsBodyMeasurementModule } from 'app/entities/appointments/body-measurement/body-measurement.module';
import { BodyMeasurementDetailComponent, BodyMeasurementUpdateComponent } from 'app/entities/appointments/body-measurement';
import { MealPlanSenderComponent } from 'app/entities/appointments/appointment/meal-plan-sender/meal-plan-sender.component';
import { ShoplistComponent } from 'app/entities/appointments/appointment/shoplist/shoplist.component';

const ENTITY_STATES = [...appointmentRoute, ...appointmentPopupRoute];

@NgModule({
  imports: [
    GatewaySharedModule,
    RouterModule.forChild(ENTITY_STATES),
    AppointmentsAppointmentListModule,
    MealPlansMealPlanListModule,
    AppointmentsNutritionalInterviewModule,
    AppointmentsBodyMeasurementModule
  ],
  declarations: [
    AppointmentDetailComponent,
    AppointmentUpdateComponent,
    AppointmentDeleteDialogComponent,
    AppointmentDeletePopupComponent,
    MealPlanSenderComponent,
    ShoplistComponent
  ],
  entryComponents: [
    AppointmentComponent,
    AppointmentUpdateComponent,
    AppointmentDeleteDialogComponent,
    AppointmentDeletePopupComponent,
    MealPlanComponent,
    NutritionalInterviewUpdateComponent,
    BodyMeasurementUpdateComponent,
    NutritionalInterviewDetailComponent,
    BodyMeasurementDetailComponent
  ],
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
