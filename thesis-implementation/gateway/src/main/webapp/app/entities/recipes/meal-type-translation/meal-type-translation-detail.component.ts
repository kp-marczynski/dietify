import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMealTypeTranslation } from 'app/shared/model/recipes/meal-type-translation.model';

@Component({
  selector: 'jhi-meal-type-translation-detail',
  templateUrl: './meal-type-translation-detail.component.html'
})
export class MealTypeTranslationDetailComponent implements OnInit {
  mealTypeTranslation: IMealTypeTranslation;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ mealTypeTranslation }) => {
      this.mealTypeTranslation = mealTypeTranslation;
    });
  }

  previousState() {
    window.history.back();
  }
}
