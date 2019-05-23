import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IDietetician } from 'app/shared/model/dietetician.model';
import { DieteticianService } from './dietetician.service';

@Component({
    selector: 'jhi-dietetician-update',
    templateUrl: './dietetician-update.component.html'
})
export class DieteticianUpdateComponent implements OnInit {
    dietetician: IDietetician;
    isSaving: boolean;

    constructor(protected dieteticianService: DieteticianService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ dietetician }) => {
            this.dietetician = dietetician;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.dietetician.id !== undefined) {
            this.subscribeToSaveResponse(this.dieteticianService.update(this.dietetician));
        } else {
            this.subscribeToSaveResponse(this.dieteticianService.create(this.dietetician));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDietetician>>) {
        result.subscribe((res: HttpResponse<IDietetician>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
