import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMealRecipe } from 'app/shared/model/meal-recipe.model';
import { MealRecipeService } from './meal-recipe.service';
import { IMeal } from 'app/shared/model/meal.model';
import { MealService } from 'app/entities/meal';

@Component({
    selector: 'jhi-meal-recipe-update',
    templateUrl: './meal-recipe-update.component.html'
})
export class MealRecipeUpdateComponent implements OnInit {
    mealRecipe: IMealRecipe;
    isSaving: boolean;

    meals: IMeal[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected mealRecipeService: MealRecipeService,
        protected mealService: MealService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ mealRecipe }) => {
            this.mealRecipe = mealRecipe;
        });
        this.mealService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IMeal[]>) => mayBeOk.ok),
                map((response: HttpResponse<IMeal[]>) => response.body)
            )
            .subscribe((res: IMeal[]) => (this.meals = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.mealRecipe.id !== undefined) {
            this.subscribeToSaveResponse(this.mealRecipeService.update(this.mealRecipe));
        } else {
            this.subscribeToSaveResponse(this.mealRecipeService.create(this.mealRecipe));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMealRecipe>>) {
        result.subscribe((res: HttpResponse<IMealRecipe>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
