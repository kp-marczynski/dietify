import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMealPlanDay } from 'app/shared/model/meal-plan-day.model';
import { MealPlanDayService } from './meal-plan-day.service';
import { IMealPlan } from 'app/shared/model/meal-plan.model';
import { MealPlanService } from 'app/entities/meal-plan';

@Component({
    selector: 'jhi-meal-plan-day-update',
    templateUrl: './meal-plan-day-update.component.html'
})
export class MealPlanDayUpdateComponent implements OnInit {
    mealPlanDay: IMealPlanDay;
    isSaving: boolean;

    mealplans: IMealPlan[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected mealPlanDayService: MealPlanDayService,
        protected mealPlanService: MealPlanService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ mealPlanDay }) => {
            this.mealPlanDay = mealPlanDay;
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
        if (this.mealPlanDay.id !== undefined) {
            this.subscribeToSaveResponse(this.mealPlanDayService.update(this.mealPlanDay));
        } else {
            this.subscribeToSaveResponse(this.mealPlanDayService.create(this.mealPlanDay));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMealPlanDay>>) {
        result.subscribe((res: HttpResponse<IMealPlanDay>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
