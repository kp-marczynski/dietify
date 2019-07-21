import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IMealType } from 'app/shared/model/meal-type.model';
import { MealTypeService } from './meal-type.service';

@Component({
    selector: 'jhi-meal-type-update',
    templateUrl: './meal-type-update.component.html'
})
export class MealTypeUpdateComponent implements OnInit {
    mealType: IMealType;
    isSaving: boolean;

    constructor(protected mealTypeService: MealTypeService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ mealType }) => {
            this.mealType = mealType;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.mealType.id !== undefined) {
            this.subscribeToSaveResponse(this.mealTypeService.update(this.mealType));
        } else {
            this.subscribeToSaveResponse(this.mealTypeService.create(this.mealType));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMealType>>) {
        result.subscribe((res: HttpResponse<IMealType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
