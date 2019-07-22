import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IRecipeUnsuitableForDiet, RecipeUnsuitableForDiet } from 'app/shared/model/recipes/recipe-unsuitable-for-diet.model';
import { RecipeUnsuitableForDietService } from './recipe-unsuitable-for-diet.service';
import { IRecipe } from 'app/shared/model/recipes/recipe.model';
import { RecipeService } from 'app/entities/recipes/recipe';

@Component({
  selector: 'jhi-recipe-unsuitable-for-diet-update',
  templateUrl: './recipe-unsuitable-for-diet-update.component.html'
})
export class RecipeUnsuitableForDietUpdateComponent implements OnInit {
  isSaving: boolean;

  recipes: IRecipe[];

  editForm = this.fb.group({
    id: [],
    dietTypeId: [null, [Validators.required]],
    recipe: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected recipeUnsuitableForDietService: RecipeUnsuitableForDietService,
    protected recipeService: RecipeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ recipeUnsuitableForDiet }) => {
      this.updateForm(recipeUnsuitableForDiet);
    });
    this.recipeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IRecipe[]>) => mayBeOk.ok),
        map((response: HttpResponse<IRecipe[]>) => response.body)
      )
      .subscribe((res: IRecipe[]) => (this.recipes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(recipeUnsuitableForDiet: IRecipeUnsuitableForDiet) {
    this.editForm.patchValue({
      id: recipeUnsuitableForDiet.id,
      dietTypeId: recipeUnsuitableForDiet.dietTypeId,
      recipe: recipeUnsuitableForDiet.recipe
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const recipeUnsuitableForDiet = this.createFromForm();
    if (recipeUnsuitableForDiet.id !== undefined) {
      this.subscribeToSaveResponse(this.recipeUnsuitableForDietService.update(recipeUnsuitableForDiet));
    } else {
      this.subscribeToSaveResponse(this.recipeUnsuitableForDietService.create(recipeUnsuitableForDiet));
    }
  }

  private createFromForm(): IRecipeUnsuitableForDiet {
    return {
      ...new RecipeUnsuitableForDiet(),
      id: this.editForm.get(['id']).value,
      dietTypeId: this.editForm.get(['dietTypeId']).value,
      recipe: this.editForm.get(['recipe']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRecipeUnsuitableForDiet>>) {
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
