import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INutritionData } from 'app/shared/model/products/nutrition-data.model';

@Component({
  selector: 'jhi-nutrition-data-detail',
  templateUrl: './nutrition-data-detail.component.html'
})
export class NutritionDataDetailComponent implements OnInit {
  nutritionData: INutritionData;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ nutritionData }) => {
      this.nutritionData = nutritionData;
    });
  }

  previousState() {
    window.history.back();
  }
}
