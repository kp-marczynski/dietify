import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IRecipeSection, RecipeSection } from 'app/shared/model/recipes/recipe-section.model';
import { RecipeSectionService } from './recipe-section.service';
import { IRecipe } from 'app/shared/model/recipes/recipe.model';
import { RecipeService } from 'app/entities/recipes/recipe';

@Component({
  selector: 'jhi-recipe-section-update',
  templateUrl: './recipe-section-update.component.html'
})
export class RecipeSectionUpdateComponent implements OnInit {
  isSaving: boolean;

  recipes: IRecipe[];

  editForm = this.fb.group({
    id: [],
    sectionName: [null, [Validators.minLength(1), Validators.maxLength(255)]],
    recipe: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected recipeSectionService: RecipeSectionService,
    protected recipeService: RecipeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ recipeSection }) => {
      this.updateForm(recipeSection);
    });
    this.recipeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IRecipe[]>) => mayBeOk.ok),
        map((response: HttpResponse<IRecipe[]>) => response.body)
      )
      .subscribe((res: IRecipe[]) => (this.recipes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(recipeSection: IRecipeSection) {
    this.editForm.patchValue({
      id: recipeSection.id,
      sectionName: recipeSection.sectionName,
      recipe: recipeSection.recipe
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const recipeSection = this.createFromForm();
    if (recipeSection.id !== undefined) {
      this.subscribeToSaveResponse(this.recipeSectionService.update(recipeSection));
    } else {
      this.subscribeToSaveResponse(this.recipeSectionService.create(recipeSection));
    }
  }

  private createFromForm(): IRecipeSection {
    return {
      ...new RecipeSection(),
      id: this.editForm.get(['id']).value,
      sectionName: this.editForm.get(['sectionName']).value,
      recipe: this.editForm.get(['recipe']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRecipeSection>>) {
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
