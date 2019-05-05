import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { IMealPlan } from 'app/shared/model/meal-plan.model';
import { MealPlanService } from './meal-plan.service';

@Component({
    selector: 'jhi-meal-plan-update',
    templateUrl: './meal-plan-update.component.html'
})
export class MealPlanUpdateComponent implements OnInit {
    mealPlan: IMealPlan;
    isSaving: boolean;
    creationDateDp: any;

    constructor(protected mealPlanService: MealPlanService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ mealPlan }) => {
            this.mealPlan = mealPlan;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.mealPlan.id !== undefined) {
            this.subscribeToSaveResponse(this.mealPlanService.update(this.mealPlan));
        } else {
            this.subscribeToSaveResponse(this.mealPlanService.create(this.mealPlan));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMealPlan>>) {
        result.subscribe((res: HttpResponse<IMealPlan>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
