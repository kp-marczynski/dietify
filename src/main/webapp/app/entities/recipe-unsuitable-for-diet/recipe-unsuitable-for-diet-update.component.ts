import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IRecipeUnsuitableForDiet } from 'app/shared/model/recipe-unsuitable-for-diet.model';
import { RecipeUnsuitableForDietService } from './recipe-unsuitable-for-diet.service';
import { IRecipe } from 'app/shared/model/recipe.model';
import { RecipeService } from 'app/entities/recipe';

@Component({
    selector: 'jhi-recipe-unsuitable-for-diet-update',
    templateUrl: './recipe-unsuitable-for-diet-update.component.html'
})
export class RecipeUnsuitableForDietUpdateComponent implements OnInit {
    recipeUnsuitableForDiet: IRecipeUnsuitableForDiet;
    isSaving: boolean;

    recipes: IRecipe[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected recipeUnsuitableForDietService: RecipeUnsuitableForDietService,
        protected recipeService: RecipeService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ recipeUnsuitableForDiet }) => {
            this.recipeUnsuitableForDiet = recipeUnsuitableForDiet;
        });
        this.recipeService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IRecipe[]>) => mayBeOk.ok),
                map((response: HttpResponse<IRecipe[]>) => response.body)
            )
            .subscribe((res: IRecipe[]) => (this.recipes = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.recipeUnsuitableForDiet.id !== undefined) {
            this.subscribeToSaveResponse(this.recipeUnsuitableForDietService.update(this.recipeUnsuitableForDiet));
        } else {
            this.subscribeToSaveResponse(this.recipeUnsuitableForDietService.create(this.recipeUnsuitableForDiet));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IRecipeUnsuitableForDiet>>) {
        result.subscribe(
            (res: HttpResponse<IRecipeUnsuitableForDiet>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
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
