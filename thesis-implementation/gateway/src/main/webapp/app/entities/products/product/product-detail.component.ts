import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'app/shared/model/products/product.model';
import { INutritionDefinition } from 'app/shared/model/products/nutrition-definition.model';
import { INutritionDefinitionTranslation } from 'app/shared/model/products/nutrition-definition-translation.model';
import { JhiLanguageHelper } from 'app/core';
import { Chart } from 'chart.js';
import { NutritionDefinitionService } from 'app/entities/products/nutrition-definition';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiLanguageService } from 'ng-jhipster';
import { MainLayoutCardService } from 'app/layouts/main/main-layout-card.service';

@Component({
  selector: 'jhi-product-detail',
  templateUrl: './product-detail.component.html',
  styles: ['.canvas-wrapper {max-width: 300px; max-height: 300px;}']
})
export class ProductDetailComponent implements OnInit, AfterViewInit {
  product: IProduct;
  lang = 'en';
  chart: Chart = null;
  basicNutritionDefinitions: INutritionDefinition[] = [];
  definitionsLoaded = false;
  viewInitiated = false;

  constructor(
    protected layoutCardService: MainLayoutCardService,
    protected activatedRoute: ActivatedRoute,
    protected jhiAlertService: JhiAlertService,
    private languageService: JhiLanguageService,
    private languageHelper: JhiLanguageHelper,
    private nutritionDefinitionService: NutritionDefinitionService
  ) {}

  ngOnInit() {
    this.layoutCardService.changeMainCardContainerVisibility(false);
    this.activatedRoute.data.subscribe(({ product }) => {
      this.product = product;

      this.languageService.getCurrent().then(res => this.changeLanguage(res));
      this.languageHelper.language.subscribe((languageKey: string) => this.changeLanguage(languageKey));
    });
    this.nutritionDefinitionService
      .getBasicDefinitions()
      .pipe(
        filter((res: HttpResponse<INutritionDefinition[]>) => res.ok),
        map((res: HttpResponse<INutritionDefinition[]>) => res.body)
      )
      .subscribe(
        (res: INutritionDefinition[]) => {
          this.basicNutritionDefinitions = res;
          this.definitionsLoaded = true;
          this.loadChart();
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngAfterViewInit() {
    this.viewInitiated = true;
    setTimeout(() => this.loadChart());
  }

  changeLanguage(newLang: string) {
    if (newLang !== undefined && newLang !== this.lang) {
      this.lang = newLang;
      this.reloadTranslations();
      this.loadChart();
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

  loadChart() {
    if (this.definitionsLoaded && this.viewInitiated) {
      const nutritionValues = [
        this.product.basicNutritionData.protein,
        this.product.basicNutritionData.fat,
        this.product.basicNutritionData.carbohydrates
      ];

      let otherNutritions = 100;
      for (const nutritionValue of nutritionValues) {
        otherNutritions -= nutritionValue;
      }
      otherNutritions = Math.round(otherNutritions);
      nutritionValues.push(otherNutritions);
      const ctxP = (document.getElementById('canvas') as HTMLCanvasElement).getContext('2d');
      this.chart = new Chart(ctxP, {
        type: 'pie',
        data: {
          labels: [
            this.getNutritionDefinitionTranslation(this.basicNutritionDefinitions.find(nutrDef => nutrDef.tag === 'PROCNT')),
            this.getNutritionDefinitionTranslation(this.basicNutritionDefinitions.find(nutrDef => nutrDef.tag === 'FAT')),
            this.getNutritionDefinitionTranslation(this.basicNutritionDefinitions.find(nutrDef => nutrDef.tag === 'CHOCDF')),
            this.getNutritionDefinitionTranslation(this.basicNutritionDefinitions.find(nutrDef => nutrDef.tag === 'OTHER'))
          ],
          datasets: [
            {
              data: nutritionValues,
              backgroundColor: ['#E74C3C', '#18BC9C', '#F39C12', '#949FB1', '#2C3E50'],
              hoverBackgroundColor: ['#e12e1c', '#149a80', '#d4860b', '#809395', '#1e2b37']
            }
          ]
        },
        options: {
          responsive: true
        }
      });
    }
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
