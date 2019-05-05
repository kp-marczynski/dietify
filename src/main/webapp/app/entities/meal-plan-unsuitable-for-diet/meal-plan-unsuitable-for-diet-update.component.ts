import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMealPlanUnsuitableForDiet } from 'app/shared/model/meal-plan-unsuitable-for-diet.model';
import { MealPlanUnsuitableForDietService } from './meal-plan-unsuitable-for-diet.service';
import { IMealPlan } from 'app/shared/model/meal-plan.model';
import { MealPlanService } from 'app/entities/meal-plan';

@Component({
    selector: 'jhi-meal-plan-unsuitable-for-diet-update',
    templateUrl: './meal-plan-unsuitable-for-diet-update.component.html'
})
export class MealPlanUnsuitableForDietUpdateComponent implements OnInit {
    mealPlanUnsuitableForDiet: IMealPlanUnsuitableForDiet;
    isSaving: boolean;

    mealplans: IMealPlan[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected mealPlanUnsuitableForDietService: MealPlanUnsuitableForDietService,
        protected mealPlanService: MealPlanService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ mealPlanUnsuitableForDiet }) => {
            this.mealPlanUnsuitableForDiet = mealPlanUnsuitableForDiet;
        });
        this.mealPlanService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IMealPlan[]>) => mayBeOk.ok),
                map((response: HttpResponse<IMealPlan[]>) => response.body)
            )
            .subscribe((res: IMealPlan[]) => (this.mealplans = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.mealPlanUnsuitableForDiet.id !== undefined) {
            this.subscribeToSaveResponse(this.mealPlanUnsuitableForDietService.update(this.mealPlanUnsuitableForDiet));
        } else {
            this.subscribeToSaveResponse(this.mealPlanUnsuitableForDietService.create(this.mealPlanUnsuitableForDiet));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMealPlanUnsuitableForDiet>>) {
        result.subscribe(
            (res: HttpResponse<IMealPlanUnsuitableForDiet>) => this.onSaveSuccess(),
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

    trackMealPlanById(index: number, item: IMealPlan) {
        return item.id;
    }
}
