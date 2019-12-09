import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  AppointmentEvaluationComponent,
  AppointmentEvaluationDetailComponent,
  AppointmentEvaluationUpdateComponent,
  AppointmentEvaluationDeletePopupComponent,
  AppointmentEvaluationDeleteDialogComponent,
  appointmentEvaluationRoute,
  appointmentEvaluationPopupRoute
} from './';

const ENTITY_STATES = [...appointmentEvaluationRoute, ...appointmentEvaluationPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AppointmentEvaluationComponent,
    AppointmentEvaluationDetailComponent,
    AppointmentEvaluationUpdateComponent,
    AppointmentEvaluationDeleteDialogComponent,
    AppointmentEvaluationDeletePopupComponent
  ],
  entryComponents: [
    AppointmentEvaluationComponent,
    AppointmentEvaluationUpdateComponent,
    AppointmentEvaluationDeleteDialogComponent,
    AppointmentEvaluationDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppointmentsAppointmentEvaluationModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
