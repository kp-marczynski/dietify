import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { INutritionDefinition } from 'app/shared/model/nutrition-definition.model';
import { NutritionDefinitionService } from './nutrition-definition.service';

@Component({
    selector: 'jhi-nutrition-definition-update',
    templateUrl: './nutrition-definition-update.component.html'
})
export class NutritionDefinitionUpdateComponent implements OnInit {
    nutritionDefinition: INutritionDefinition;
    isSaving: boolean;

    constructor(protected nutritionDefinitionService: NutritionDefinitionService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ nutritionDefinition }) => {
            this.nutritionDefinition = nutritionDefinition;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.nutritionDefinition.id !== undefined) {
            this.subscribeToSaveResponse(this.nutritionDefinitionService.update(this.nutritionDefinition));
        } else {
            this.subscribeToSaveResponse(this.nutritionDefinitionService.create(this.nutritionDefinition));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<INutritionDefinition>>) {
        result.subscribe((res: HttpResponse<INutritionDefinition>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
