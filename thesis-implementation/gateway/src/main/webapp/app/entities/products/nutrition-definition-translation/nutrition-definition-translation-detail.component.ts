import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INutritionDefinitionTranslation } from 'app/shared/model/products/nutrition-definition-translation.model';

@Component({
  selector: 'jhi-nutrition-definition-translation-detail',
  templateUrl: './nutrition-definition-translation-detail.component.html'
})
export class NutritionDefinitionTranslationDetailComponent implements OnInit {
  nutritionDefinitionTranslation: INutritionDefinitionTranslation;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ nutritionDefinitionTranslation }) => {
      this.nutritionDefinitionTranslation = nutritionDefinitionTranslation;
    });
  }

  previousState() {
    window.history.back();
  }
}
