import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  DietTypeComponent,
  DietTypeDetailComponent,
  DietTypeUpdateComponent,
  DietTypeDeletePopupComponent,
  DietTypeDeleteDialogComponent,
  dietTypeRoute,
  dietTypePopupRoute
} from './';

const ENTITY_STATES = [...dietTypeRoute, ...dietTypePopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DietTypeComponent,
    DietTypeDetailComponent,
    DietTypeUpdateComponent,
    DietTypeDeleteDialogComponent,
    DietTypeDeletePopupComponent
  ],
  entryComponents: [DietTypeComponent, DietTypeUpdateComponent, DietTypeDeleteDialogComponent, DietTypeDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductsDietTypeModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
