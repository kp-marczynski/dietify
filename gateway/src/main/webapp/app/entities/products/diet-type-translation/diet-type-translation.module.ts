import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  DietTypeTranslationComponent,
  DietTypeTranslationDetailComponent,
  DietTypeTranslationUpdateComponent,
  DietTypeTranslationDeletePopupComponent,
  DietTypeTranslationDeleteDialogComponent,
  dietTypeTranslationRoute,
  dietTypeTranslationPopupRoute
} from './';

const ENTITY_STATES = [...dietTypeTranslationRoute, ...dietTypeTranslationPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DietTypeTranslationComponent,
    DietTypeTranslationDetailComponent,
    DietTypeTranslationUpdateComponent,
    DietTypeTranslationDeleteDialogComponent,
    DietTypeTranslationDeletePopupComponent
  ],
  entryComponents: [
    DietTypeTranslationComponent,
    DietTypeTranslationUpdateComponent,
    DietTypeTranslationDeleteDialogComponent,
    DietTypeTranslationDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductsDietTypeTranslationModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
