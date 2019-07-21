import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IRecipeBasicNutritionData, RecipeBasicNutritionData } from 'app/shared/model/recipes/recipe-basic-nutrition-data.model';
import { RecipeBasicNutritionDataService } from './recipe-basic-nutrition-data.service';
import { IRecipe } from 'app/shared/model/recipes/recipe.model';
import { RecipeService } from 'app/entities/recipes/recipe';

@Component({
  selector: 'jhi-recipe-basic-nutrition-data-update',
  templateUrl: './recipe-basic-nutrition-data-update.component.html'
})
export class RecipeBasicNutritionDataUpdateComponent implements OnInit {
  isSaving: boolean;

  recipes: IRecipe[];

  editForm = this.fb.group({
    id: [],
    energy: [null, [Validators.required, Validators.min(0)]],
    protein: [null, [Validators.required, Validators.min(0)]],
    fat: [null, [Validators.required, Validators.min(0)]],
    carbohydrates: [null, [Validators.required, Validators.min(0)]],
    recipeId: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected recipeBasicNutritionDataService: RecipeBasicNutritionDataService,
    protected recipeService: RecipeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ recipeBasicNutritionData }) => {
      this.updateForm(recipeBasicNutritionData);
    });
    this.recipeService
      .query({ filter: 'basicnutritiondata-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IRecipe[]>) => mayBeOk.ok),
        map((response: HttpResponse<IRecipe[]>) => response.body)
      )
      .subscribe(
        (res: IRecipe[]) => {
          if (!!this.editForm.get('recipeId').value) {
            this.recipes = res;
          } else {
            this.recipeService
              .find(this.editForm.get('recipeId').value)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IRecipe>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IRecipe>) => subResponse.body)
              )
              .subscribe(
                (subRes: IRecipe) => (this.recipes = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(recipeBasicNutritionData: IRecipeBasicNutritionData) {
    this.editForm.patchValue({
      id: recipeBasicNutritionData.id,
      energy: recipeBasicNutritionData.energy,
      protein: recipeBasicNutritionData.protein,
      fat: recipeBasicNutritionData.fat,
      carbohydrates: recipeBasicNutritionData.carbohydrates,
      recipeId: recipeBasicNutritionData.recipeId
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
      carbohydrates: this.editForm.get(['carbohydrates']).value,
      recipeId: this.editForm.get(['recipeId']).value
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
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackRecipeById(index: number, item: IRecipe) {
    return item.id;
  }
}
