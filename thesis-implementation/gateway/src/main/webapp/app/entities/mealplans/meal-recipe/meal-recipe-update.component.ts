import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMealRecipe, MealRecipe } from 'app/shared/model/mealplans/meal-recipe.model';
import { MealRecipeService } from './meal-recipe.service';
import { IMeal } from 'app/shared/model/mealplans/meal.model';
import { MealService } from 'app/entities/mealplans/meal';

@Component({
  selector: 'jhi-meal-recipe-update',
  templateUrl: './meal-recipe-update.component.html'
})
export class MealRecipeUpdateComponent implements OnInit {
  isSaving: boolean;

  meals: IMeal[];

  editForm = this.fb.group({
    id: [],
    recipeId: [null, [Validators.required]],
    amount: [null, [Validators.required, Validators.min(0)]],
    meal: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected mealRecipeService: MealRecipeService,
    protected mealService: MealService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ mealRecipe }) => {
      this.updateForm(mealRecipe);
    });
    this.mealService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMeal[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMeal[]>) => response.body)
      )
      .subscribe((res: IMeal[]) => (this.meals = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(mealRecipe: IMealRecipe) {
    this.editForm.patchValue({
      id: mealRecipe.id,
      recipeId: mealRecipe.recipeId,
      amount: mealRecipe.amount,
      meal: mealRecipe.meal
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const mealRecipe = this.createFromForm();
    if (mealRecipe.id !== undefined) {
      this.subscribeToSaveResponse(this.mealRecipeService.update(mealRecipe));
    } else {
      this.subscribeToSaveResponse(this.mealRecipeService.create(mealRecipe));
    }
  }

  private createFromForm(): IMealRecipe {
    return {
      ...new MealRecipe(),
      id: this.editForm.get(['id']).value,
      recipeId: this.editForm.get(['recipeId']).value,
      amount: this.editForm.get(['amount']).value,
      meal: this.editForm.get(['meal']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMealRecipe>>) {
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

  trackMealById(index: number, item: IMeal) {
    return item.id;
  }
}
