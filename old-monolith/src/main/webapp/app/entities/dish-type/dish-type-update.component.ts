import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IDishType } from 'app/shared/model/dish-type.model';
import { DishTypeService } from './dish-type.service';

@Component({
    selector: 'jhi-dish-type-update',
    templateUrl: './dish-type-update.component.html'
})
export class DishTypeUpdateComponent implements OnInit {
    dishType: IDishType;
    isSaving: boolean;

    constructor(protected dishTypeService: DishTypeService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ dishType }) => {
            this.dishType = dishType;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.dishType.id !== undefined) {
            this.subscribeToSaveResponse(this.dishTypeService.update(this.dishType));
        } else {
            this.subscribeToSaveResponse(this.dishTypeService.create(this.dishType));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDishType>>) {
        result.subscribe((res: HttpResponse<IDishType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
