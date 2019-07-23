import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMealRecipe } from 'app/shared/model/mealplans/meal-recipe.model';

@Component({
  selector: 'jhi-meal-recipe-detail',
  templateUrl: './meal-recipe-detail.component.html'
})
export class MealRecipeDetailComponent implements OnInit {
  mealRecipe: IMealRecipe;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ mealRecipe }) => {
      this.mealRecipe = mealRecipe;
    });
  }

  previousState() {
    window.history.back();
  }
}
