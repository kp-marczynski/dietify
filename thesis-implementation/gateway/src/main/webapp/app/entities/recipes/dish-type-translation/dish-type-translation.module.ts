import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  DishTypeTranslationComponent,
  DishTypeTranslationDetailComponent,
  DishTypeTranslationUpdateComponent,
  DishTypeTranslationDeletePopupComponent,
  DishTypeTranslationDeleteDialogComponent,
  dishTypeTranslationRoute,
  dishTypeTranslationPopupRoute
} from './';

const ENTITY_STATES = [...dishTypeTranslationRoute, ...dishTypeTranslationPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DishTypeTranslationComponent,
    DishTypeTranslationDetailComponent,
    DishTypeTranslationUpdateComponent,
    DishTypeTranslationDeleteDialogComponent,
    DishTypeTranslationDeletePopupComponent
  ],
  entryComponents: [
    DishTypeTranslationComponent,
    DishTypeTranslationUpdateComponent,
    DishTypeTranslationDeleteDialogComponent,
    DishTypeTranslationDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecipesDishTypeTranslationModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
