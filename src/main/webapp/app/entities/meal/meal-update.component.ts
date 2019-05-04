import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMeal } from 'app/shared/model/meal.model';
import { MealService } from './meal.service';
import { IMealPlanDay } from 'app/shared/model/meal-plan-day.model';
import { MealPlanDayService } from 'app/entities/meal-plan-day';

@Component({
    selector: 'jhi-meal-update',
    templateUrl: './meal-update.component.html'
})
export class MealUpdateComponent implements OnInit {
    meal: IMeal;
    isSaving: boolean;

    mealplandays: IMealPlanDay[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected mealService: MealService,
        protected mealPlanDayService: MealPlanDayService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ meal }) => {
            this.meal = meal;
        });
        this.mealPlanDayService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IMealPlanDay[]>) => mayBeOk.ok),
                map((response: HttpResponse<IMealPlanDay[]>) => response.body)
            )
            .subscribe((res: IMealPlanDay[]) => (this.mealplandays = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.meal.id !== undefined) {
            this.subscribeToSaveResponse(this.mealService.update(this.meal));
        } else {
            this.subscribeToSaveResponse(this.mealService.create(this.meal));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMeal>>) {
        result.subscribe((res: HttpResponse<IMeal>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackMealPlanDayById(index: number, item: IMealPlanDay) {
        return item.id;
    }
}
