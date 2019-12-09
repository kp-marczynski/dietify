import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  KitchenApplianceComponent,
  KitchenApplianceDetailComponent,
  KitchenApplianceUpdateComponent,
  KitchenApplianceDeletePopupComponent,
  KitchenApplianceDeleteDialogComponent,
  kitchenApplianceRoute,
  kitchenAppliancePopupRoute
} from './';

const ENTITY_STATES = [...kitchenApplianceRoute, ...kitchenAppliancePopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    KitchenApplianceComponent,
    KitchenApplianceDetailComponent,
    KitchenApplianceUpdateComponent,
    KitchenApplianceDeleteDialogComponent,
    KitchenApplianceDeletePopupComponent
  ],
  entryComponents: [
    KitchenApplianceComponent,
    KitchenApplianceUpdateComponent,
    KitchenApplianceDeleteDialogComponent,
    KitchenApplianceDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecipesKitchenApplianceModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
