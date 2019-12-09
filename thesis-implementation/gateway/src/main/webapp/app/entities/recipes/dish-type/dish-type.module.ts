import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  DishTypeComponent,
  DishTypeDetailComponent,
  DishTypeUpdateComponent,
  DishTypeDeletePopupComponent,
  DishTypeDeleteDialogComponent,
  dishTypeRoute,
  dishTypePopupRoute
} from './';

const ENTITY_STATES = [...dishTypeRoute, ...dishTypePopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DishTypeComponent,
    DishTypeDetailComponent,
    DishTypeUpdateComponent,
    DishTypeDeleteDialogComponent,
    DishTypeDeletePopupComponent
  ],
  entryComponents: [DishTypeComponent, DishTypeUpdateComponent, DishTypeDeleteDialogComponent, DishTypeDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecipesDishTypeModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
