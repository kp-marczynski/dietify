import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRecipeBasicNutritionData } from 'app/shared/model/recipes/recipe-basic-nutrition-data.model';

@Component({
  selector: 'jhi-recipe-basic-nutrition-data-detail',
  templateUrl: './recipe-basic-nutrition-data-detail.component.html'
})
export class RecipeBasicNutritionDataDetailComponent implements OnInit {
  recipeBasicNutritionData: IRecipeBasicNutritionData;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ recipeBasicNutritionData }) => {
      this.recipeBasicNutritionData = recipeBasicNutritionData;
    });
  }

  previousState() {
    window.history.back();
  }
}
