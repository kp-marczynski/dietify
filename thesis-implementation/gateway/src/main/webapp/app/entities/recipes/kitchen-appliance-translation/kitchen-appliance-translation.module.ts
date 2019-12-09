import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  KitchenApplianceTranslationComponent,
  KitchenApplianceTranslationDetailComponent,
  KitchenApplianceTranslationUpdateComponent,
  KitchenApplianceTranslationDeletePopupComponent,
  KitchenApplianceTranslationDeleteDialogComponent,
  kitchenApplianceTranslationRoute,
  kitchenApplianceTranslationPopupRoute
} from './';

const ENTITY_STATES = [...kitchenApplianceTranslationRoute, ...kitchenApplianceTranslationPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    KitchenApplianceTranslationComponent,
    KitchenApplianceTranslationDetailComponent,
    KitchenApplianceTranslationUpdateComponent,
    KitchenApplianceTranslationDeleteDialogComponent,
    KitchenApplianceTranslationDeletePopupComponent
  ],
  entryComponents: [
    KitchenApplianceTranslationComponent,
    KitchenApplianceTranslationUpdateComponent,
    KitchenApplianceTranslationDeleteDialogComponent,
    KitchenApplianceTranslationDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecipesKitchenApplianceTranslationModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
