import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMealPlan } from 'app/shared/model/mealplans/meal-plan.model';

@Component({
  selector: 'jhi-meal-plan-detail',
  templateUrl: './meal-plan-detail.component.html'
})
export class MealPlanDetailComponent implements OnInit {
  mealPlan: IMealPlan;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ mealPlan }) => {
      this.mealPlan = mealPlan;
    });
  }

  previousState() {
    window.history.back();
  }
}
