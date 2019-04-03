import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IRecipeSuitableForDiet } from 'app/shared/model/recipe-suitable-for-diet.model';
import { RecipeSuitableForDietService } from './recipe-suitable-for-diet.service';
import { IRecipe } from 'app/shared/model/recipe.model';
import { RecipeService } from 'app/entities/recipe';

@Component({
    selector: 'jhi-recipe-suitable-for-diet-update',
    templateUrl: './recipe-suitable-for-diet-update.component.html'
})
export class RecipeSuitableForDietUpdateComponent implements OnInit {
    recipeSuitableForDiet: IRecipeSuitableForDiet;
    isSaving: boolean;

    recipes: IRecipe[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected recipeSuitableForDietService: RecipeSuitableForDietService,
        protected recipeService: RecipeService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ recipeSuitableForDiet }) => {
            this.recipeSuitableForDiet = recipeSuitableForDiet;
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
        if (this.recipeSuitableForDiet.id !== undefined) {
            this.subscribeToSaveResponse(this.recipeSuitableForDietService.update(this.recipeSuitableForDiet));
        } else {
            this.subscribeToSaveResponse(this.recipeSuitableForDietService.create(this.recipeSuitableForDiet));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IRecipeSuitableForDiet>>) {
        result.subscribe(
            (res: HttpResponse<IRecipeSuitableForDiet>) => this.onSaveSuccess(),
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
