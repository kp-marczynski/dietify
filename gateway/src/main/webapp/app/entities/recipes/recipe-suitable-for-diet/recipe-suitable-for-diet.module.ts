import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  RecipeSuitableForDietComponent,
  RecipeSuitableForDietDetailComponent,
  RecipeSuitableForDietUpdateComponent,
  RecipeSuitableForDietDeletePopupComponent,
  RecipeSuitableForDietDeleteDialogComponent,
  recipeSuitableForDietRoute,
  recipeSuitableForDietPopupRoute
} from './';

const ENTITY_STATES = [...recipeSuitableForDietRoute, ...recipeSuitableForDietPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    RecipeSuitableForDietComponent,
    RecipeSuitableForDietDetailComponent,
    RecipeSuitableForDietUpdateComponent,
    RecipeSuitableForDietDeleteDialogComponent,
    RecipeSuitableForDietDeletePopupComponent
  ],
  entryComponents: [
    RecipeSuitableForDietComponent,
    RecipeSuitableForDietUpdateComponent,
    RecipeSuitableForDietDeleteDialogComponent,
    RecipeSuitableForDietDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecipesRecipeSuitableForDietModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
