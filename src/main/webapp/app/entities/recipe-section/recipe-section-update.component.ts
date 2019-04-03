import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IRecipeSection } from 'app/shared/model/recipe-section.model';
import { RecipeSectionService } from './recipe-section.service';
import { IRecipe } from 'app/shared/model/recipe.model';
import { RecipeService } from 'app/entities/recipe';

@Component({
    selector: 'jhi-recipe-section-update',
    templateUrl: './recipe-section-update.component.html'
})
export class RecipeSectionUpdateComponent implements OnInit {
    recipeSection: IRecipeSection;
    isSaving: boolean;

    recipes: IRecipe[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected recipeSectionService: RecipeSectionService,
        protected recipeService: RecipeService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ recipeSection }) => {
            this.recipeSection = recipeSection;
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
        if (this.recipeSection.id !== undefined) {
            this.subscribeToSaveResponse(this.recipeSectionService.update(this.recipeSection));
        } else {
            this.subscribeToSaveResponse(this.recipeSectionService.create(this.recipeSection));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IRecipeSection>>) {
        result.subscribe((res: HttpResponse<IRecipeSection>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
