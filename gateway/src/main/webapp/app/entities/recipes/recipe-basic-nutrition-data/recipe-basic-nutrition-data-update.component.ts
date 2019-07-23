import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IRecipeBasicNutritionData, RecipeBasicNutritionData } from 'app/shared/model/recipes/recipe-basic-nutrition-data.model';
import { RecipeBasicNutritionDataService } from './recipe-basic-nutrition-data.service';

@Component({
  selector: 'jhi-recipe-basic-nutrition-data-update',
  templateUrl: './recipe-basic-nutrition-data-update.component.html'
})
export class RecipeBasicNutritionDataUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    energy: [null, [Validators.required, Validators.min(0)]],
    protein: [null, [Validators.required, Validators.min(0)]],
    fat: [null, [Validators.required, Validators.min(0)]],
    carbohydrates: [null, [Validators.required, Validators.min(0)]]
  });

  constructor(
    protected recipeBasicNutritionDataService: RecipeBasicNutritionDataService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ recipeBasicNutritionData }) => {
      this.updateForm(recipeBasicNutritionData);
    });
  }

  updateForm(recipeBasicNutritionData: IRecipeBasicNutritionData) {
    this.editForm.patchValue({
      id: recipeBasicNutritionData.id,
      energy: recipeBasicNutritionData.energy,
      protein: recipeBasicNutritionData.protein,
      fat: recipeBasicNutritionData.fat,
      carbohydrates: recipeBasicNutritionData.carbohydrates
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const recipeBasicNutritionData = this.createFromForm();
    if (recipeBasicNutritionData.id !== undefined) {
      this.subscribeToSaveResponse(this.recipeBasicNutritionDataService.update(recipeBasicNutritionData));
    } else {
      this.subscribeToSaveResponse(this.recipeBasicNutritionDataService.create(recipeBasicNutritionData));
    }
  }

  private createFromForm(): IRecipeBasicNutritionData {
    return {
      ...new RecipeBasicNutritionData(),
      id: this.editForm.get(['id']).value,
      energy: this.editForm.get(['energy']).value,
      protein: this.editForm.get(['protein']).value,
      fat: this.editForm.get(['fat']).value,
      carbohydrates: this.editForm.get(['carbohydrates']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRecipeBasicNutritionData>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
