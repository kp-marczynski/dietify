import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { IProduct } from 'app/shared/model/products/product.model';
import { INutritionDefinition } from 'app/shared/model/products/nutrition-definition.model';
import { INutritionDefinitionTranslation } from 'app/shared/model/products/nutrition-definition-translation.model';
import { JhiLanguageHelper } from 'app/core';

@Component({
  selector: 'jhi-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  product: IProduct;
  lang = 'en';

  constructor(
    protected activatedRoute: ActivatedRoute,
    private languageService: JhiLanguageService,
    private languageHelper: JhiLanguageHelper
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ product }) => {
      this.product = product;

      this.languageService.getCurrent().then(res => this.changeLanguage(res));
      this.languageHelper.language.subscribe((languageKey: string) => this.changeLanguage(languageKey));
    });
  }

  changeLanguage(newLang: string) {
    if (newLang !== undefined && newLang !== this.lang) {
      this.lang = newLang;
      this.reloadTranslations();
    }
  }

  previousState() {
    window.history.back();
  }

  getNutritionDefinitionTranslation(nutritionDefinition: INutritionDefinition): string {
    const nutritionDefinitionTranslation: INutritionDefinitionTranslation = nutritionDefinition.translations.find(
      translation => translation.language === this.lang
    );
    return nutritionDefinitionTranslation ? nutritionDefinitionTranslation.translation : nutritionDefinition.description;
  }

  private reloadTranslations() {
    this.product.nutritionData = [...this.product.nutritionData];
  }
}
