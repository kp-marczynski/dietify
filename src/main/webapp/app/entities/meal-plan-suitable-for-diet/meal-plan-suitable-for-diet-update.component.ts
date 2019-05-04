import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMealPlanSuitableForDiet } from 'app/shared/model/meal-plan-suitable-for-diet.model';
import { MealPlanSuitableForDietService } from './meal-plan-suitable-for-diet.service';
import { IMealPlan } from 'app/shared/model/meal-plan.model';
import { MealPlanService } from 'app/entities/meal-plan';

@Component({
    selector: 'jhi-meal-plan-suitable-for-diet-update',
    templateUrl: './meal-plan-suitable-for-diet-update.component.html'
})
export class MealPlanSuitableForDietUpdateComponent implements OnInit {
    mealPlanSuitableForDiet: IMealPlanSuitableForDiet;
    isSaving: boolean;

    mealplans: IMealPlan[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected mealPlanSuitableForDietService: MealPlanSuitableForDietService,
        protected mealPlanService: MealPlanService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ mealPlanSuitableForDiet }) => {
            this.mealPlanSuitableForDiet = mealPlanSuitableForDiet;
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
        if (this.mealPlanSuitableForDiet.id !== undefined) {
            this.subscribeToSaveResponse(this.mealPlanSuitableForDietService.update(this.mealPlanSuitableForDiet));
        } else {
            this.subscribeToSaveResponse(this.mealPlanSuitableForDietService.create(this.mealPlanSuitableForDiet));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMealPlanSuitableForDiet>>) {
        result.subscribe(
            (res: HttpResponse<IMealPlanSuitableForDiet>) => this.onSaveSuccess(),
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
