import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import { MealDetailComponent, MealUpdateComponent } from './';
import { ProductsProductListModule } from 'app/entities/products/product/product-list.module';
import { RecipesRecipeListModule } from 'app/entities/recipes/recipe/recipe-list.module';
import { ProductComponent } from 'app/entities/products/product';
import { RecipeComponent } from 'app/entities/recipes/recipe';

@NgModule({
  imports: [GatewaySharedModule, RouterModule, ProductsProductListModule, RecipesRecipeListModule],
  declarations: [MealDetailComponent, MealUpdateComponent],
  entryComponents: [MealUpdateComponent, ProductComponent, RecipeComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  exports: [MealUpdateComponent, MealDetailComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MealplansMealModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
