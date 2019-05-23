import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { IBodyMeasurment } from 'app/shared/model/body-measurment.model';
import { BodyMeasurmentService } from './body-measurment.service';

@Component({
    selector: 'jhi-body-measurment-update',
    templateUrl: './body-measurment-update.component.html'
})
export class BodyMeasurmentUpdateComponent implements OnInit {
    bodyMeasurment: IBodyMeasurment;
    isSaving: boolean;
    completionDateDp: any;

    constructor(protected bodyMeasurmentService: BodyMeasurmentService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ bodyMeasurment }) => {
            this.bodyMeasurment = bodyMeasurment;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.bodyMeasurment.id !== undefined) {
            this.subscribeToSaveResponse(this.bodyMeasurmentService.update(this.bodyMeasurment));
        } else {
            this.subscribeToSaveResponse(this.bodyMeasurmentService.create(this.bodyMeasurment));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IBodyMeasurment>>) {
        result.subscribe((res: HttpResponse<IBodyMeasurment>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
