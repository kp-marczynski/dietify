import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMealPlanSuitableForDiet } from 'app/shared/model/mealplans/meal-plan-suitable-for-diet.model';

@Component({
  selector: 'jhi-meal-plan-suitable-for-diet-detail',
  templateUrl: './meal-plan-suitable-for-diet-detail.component.html'
})
export class MealPlanSuitableForDietDetailComponent implements OnInit {
  mealPlanSuitableForDiet: IMealPlanSuitableForDiet;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ mealPlanSuitableForDiet }) => {
      this.mealPlanSuitableForDiet = mealPlanSuitableForDiet;
    });
  }

  previousState() {
    window.history.back();
  }
}
