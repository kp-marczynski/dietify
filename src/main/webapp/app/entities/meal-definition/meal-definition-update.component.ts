import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMealDefinition } from 'app/shared/model/meal-definition.model';
import { MealDefinitionService } from './meal-definition.service';
import { IMealPlan } from 'app/shared/model/meal-plan.model';
import { MealPlanService } from 'app/entities/meal-plan';

@Component({
    selector: 'jhi-meal-definition-update',
    templateUrl: './meal-definition-update.component.html'
})
export class MealDefinitionUpdateComponent implements OnInit {
    mealDefinition: IMealDefinition;
    isSaving: boolean;

    mealplans: IMealPlan[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected mealDefinitionService: MealDefinitionService,
        protected mealPlanService: MealPlanService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ mealDefinition }) => {
            this.mealDefinition = mealDefinition;
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
        if (this.mealDefinition.id !== undefined) {
            this.subscribeToSaveResponse(this.mealDefinitionService.update(this.mealDefinition));
        } else {
            this.subscribeToSaveResponse(this.mealDefinitionService.create(this.mealDefinition));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMealDefinition>>) {
        result.subscribe((res: HttpResponse<IMealDefinition>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
