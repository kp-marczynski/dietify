import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  RecipeSectionComponent,
  RecipeSectionDetailComponent,
  RecipeSectionUpdateComponent,
  RecipeSectionDeletePopupComponent,
  RecipeSectionDeleteDialogComponent,
  recipeSectionRoute,
  recipeSectionPopupRoute
} from './';

const ENTITY_STATES = [...recipeSectionRoute, ...recipeSectionPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    RecipeSectionComponent,
    RecipeSectionDetailComponent,
    RecipeSectionUpdateComponent,
    RecipeSectionDeleteDialogComponent,
    RecipeSectionDeletePopupComponent
  ],
  entryComponents: [
    RecipeSectionComponent,
    RecipeSectionUpdateComponent,
    RecipeSectionDeleteDialogComponent,
    RecipeSectionDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecipesRecipeSectionModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
