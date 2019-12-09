import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INutritionDefinition } from 'app/shared/model/products/nutrition-definition.model';

@Component({
  selector: 'jhi-nutrition-definition-detail',
  templateUrl: './nutrition-definition-detail.component.html'
})
export class NutritionDefinitionDetailComponent implements OnInit {
  nutritionDefinition: INutritionDefinition;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ nutritionDefinition }) => {
      this.nutritionDefinition = nutritionDefinition;
    });
  }

  previousState() {
    window.history.back();
  }
}
