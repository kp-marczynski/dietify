import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  MealDefinitionComponent,
  MealDefinitionDetailComponent,
  MealDefinitionUpdateComponent,
  MealDefinitionDeletePopupComponent,
  MealDefinitionDeleteDialogComponent,
  mealDefinitionRoute,
  mealDefinitionPopupRoute
} from './';

const ENTITY_STATES = [...mealDefinitionRoute, ...mealDefinitionPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MealDefinitionComponent,
    MealDefinitionDetailComponent,
    MealDefinitionUpdateComponent,
    MealDefinitionDeleteDialogComponent,
    MealDefinitionDeletePopupComponent
  ],
  entryComponents: [
    MealDefinitionComponent,
    MealDefinitionUpdateComponent,
    MealDefinitionDeleteDialogComponent,
    MealDefinitionDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MealplansMealDefinitionModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
