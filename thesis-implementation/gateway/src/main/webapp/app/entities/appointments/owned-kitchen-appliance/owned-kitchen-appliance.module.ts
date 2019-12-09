import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  OwnedKitchenApplianceComponent,
  OwnedKitchenApplianceDetailComponent,
  OwnedKitchenApplianceUpdateComponent,
  OwnedKitchenApplianceDeletePopupComponent,
  OwnedKitchenApplianceDeleteDialogComponent,
  ownedKitchenApplianceRoute,
  ownedKitchenAppliancePopupRoute
} from './';

const ENTITY_STATES = [...ownedKitchenApplianceRoute, ...ownedKitchenAppliancePopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    OwnedKitchenApplianceComponent,
    OwnedKitchenApplianceDetailComponent,
    OwnedKitchenApplianceUpdateComponent,
    OwnedKitchenApplianceDeleteDialogComponent,
    OwnedKitchenApplianceDeletePopupComponent
  ],
  entryComponents: [
    OwnedKitchenApplianceComponent,
    OwnedKitchenApplianceUpdateComponent,
    OwnedKitchenApplianceDeleteDialogComponent,
    OwnedKitchenApplianceDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppointmentsOwnedKitchenApplianceModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
