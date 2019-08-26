import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  BodyMeasurementComponent,
  BodyMeasurementDetailComponent,
  BodyMeasurementUpdateComponent,
  BodyMeasurementDeletePopupComponent,
  BodyMeasurementDeleteDialogComponent,
} from './';

@NgModule({
  imports: [GatewaySharedModule, RouterModule],
  declarations: [
    BodyMeasurementComponent,
    BodyMeasurementDetailComponent,
    BodyMeasurementUpdateComponent,
    BodyMeasurementDeleteDialogComponent,
    BodyMeasurementDeletePopupComponent
  ],
  entryComponents: [
    BodyMeasurementComponent,
    BodyMeasurementUpdateComponent,
    BodyMeasurementDeleteDialogComponent,
    BodyMeasurementDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppointmentsBodyMeasurementModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
