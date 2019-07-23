import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  PreparationStepComponent,
  PreparationStepDetailComponent,
  PreparationStepUpdateComponent,
  PreparationStepDeletePopupComponent,
  PreparationStepDeleteDialogComponent,
  preparationStepRoute,
  preparationStepPopupRoute
} from './';

const ENTITY_STATES = [...preparationStepRoute, ...preparationStepPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PreparationStepComponent,
    PreparationStepDetailComponent,
    PreparationStepUpdateComponent,
    PreparationStepDeleteDialogComponent,
    PreparationStepDeletePopupComponent
  ],
  entryComponents: [
    PreparationStepComponent,
    PreparationStepUpdateComponent,
    PreparationStepDeleteDialogComponent,
    PreparationStepDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecipesPreparationStepModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
