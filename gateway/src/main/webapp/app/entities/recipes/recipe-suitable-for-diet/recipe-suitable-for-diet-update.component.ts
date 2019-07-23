import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IRecipeSuitableForDiet, RecipeSuitableForDiet } from 'app/shared/model/recipes/recipe-suitable-for-diet.model';
import { RecipeSuitableForDietService } from './recipe-suitable-for-diet.service';
import { IRecipe } from 'app/shared/model/recipes/recipe.model';
import { RecipeService } from 'app/entities/recipes/recipe';

@Component({
  selector: 'jhi-recipe-suitable-for-diet-update',
  templateUrl: './recipe-suitable-for-diet-update.component.html'
})
export class RecipeSuitableForDietUpdateComponent implements OnInit {
  isSaving: boolean;

  recipes: IRecipe[];

  editForm = this.fb.group({
    id: [],
    dietTypeId: [null, [Validators.required]],
    recipe: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected recipeSuitableForDietService: RecipeSuitableForDietService,
    protected recipeService: RecipeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ recipeSuitableForDiet }) => {
      this.updateForm(recipeSuitableForDiet);
    });
    this.recipeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IRecipe[]>) => mayBeOk.ok),
        map((response: HttpResponse<IRecipe[]>) => response.body)
      )
      .subscribe((res: IRecipe[]) => (this.recipes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(recipeSuitableForDiet: IRecipeSuitableForDiet) {
    this.editForm.patchValue({
      id: recipeSuitableForDiet.id,
      dietTypeId: recipeSuitableForDiet.dietTypeId,
      recipe: recipeSuitableForDiet.recipe
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const recipeSuitableForDiet = this.createFromForm();
    if (recipeSuitableForDiet.id !== undefined) {
      this.subscribeToSaveResponse(this.recipeSuitableForDietService.update(recipeSuitableForDiet));
    } else {
      this.subscribeToSaveResponse(this.recipeSuitableForDietService.create(recipeSuitableForDiet));
    }
  }

  private createFromForm(): IRecipeSuitableForDiet {
    return {
      ...new RecipeSuitableForDiet(),
      id: this.editForm.get(['id']).value,
      dietTypeId: this.editForm.get(['dietTypeId']).value,
      recipe: this.editForm.get(['recipe']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRecipeSuitableForDiet>>) {
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
