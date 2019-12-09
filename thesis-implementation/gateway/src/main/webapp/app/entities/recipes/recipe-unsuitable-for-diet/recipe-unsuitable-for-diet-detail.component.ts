import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRecipeUnsuitableForDiet } from 'app/shared/model/recipes/recipe-unsuitable-for-diet.model';

@Component({
  selector: 'jhi-recipe-unsuitable-for-diet-detail',
  templateUrl: './recipe-unsuitable-for-diet-detail.component.html'
})
export class RecipeUnsuitableForDietDetailComponent implements OnInit {
  recipeUnsuitableForDiet: IRecipeUnsuitableForDiet;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ recipeUnsuitableForDiet }) => {
      this.recipeUnsuitableForDiet = recipeUnsuitableForDiet;
    });
  }

  previousState() {
    window.history.back();
  }
}
