import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IDietType } from 'app/shared/model/diet-type.model';
import { DietTypeService } from './diet-type.service';

@Component({
    selector: 'jhi-diet-type-update',
    templateUrl: './diet-type-update.component.html'
})
export class DietTypeUpdateComponent implements OnInit {
    dietType: IDietType;
    isSaving: boolean;

    constructor(protected dietTypeService: DietTypeService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ dietType }) => {
            this.dietType = dietType;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.dietType.id !== undefined) {
            this.subscribeToSaveResponse(this.dietTypeService.update(this.dietType));
        } else {
            this.subscribeToSaveResponse(this.dietTypeService.create(this.dietType));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDietType>>) {
        result.subscribe((res: HttpResponse<IDietType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
