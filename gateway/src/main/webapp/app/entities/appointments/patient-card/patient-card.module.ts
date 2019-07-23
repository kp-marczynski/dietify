import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  PatientCardComponent,
  PatientCardDetailComponent,
  PatientCardUpdateComponent,
  PatientCardDeletePopupComponent,
  PatientCardDeleteDialogComponent,
  patientCardRoute,
  patientCardPopupRoute
} from './';

const ENTITY_STATES = [...patientCardRoute, ...patientCardPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PatientCardComponent,
    PatientCardDetailComponent,
    PatientCardUpdateComponent,
    PatientCardDeleteDialogComponent,
    PatientCardDeletePopupComponent
  ],
  entryComponents: [PatientCardComponent, PatientCardUpdateComponent, PatientCardDeleteDialogComponent, PatientCardDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppointmentsPatientCardModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
