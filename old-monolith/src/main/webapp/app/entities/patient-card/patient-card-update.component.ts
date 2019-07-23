import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IPatientCard } from 'app/shared/model/patient-card.model';
import { PatientCardService } from './patient-card.service';
import { IPatient } from 'app/shared/model/patient.model';
import { PatientService } from 'app/entities/patient';
import { IDietetician } from 'app/shared/model/dietetician.model';
import { DieteticianService } from 'app/entities/dietetician';

@Component({
    selector: 'jhi-patient-card-update',
    templateUrl: './patient-card-update.component.html'
})
export class PatientCardUpdateComponent implements OnInit {
    patientCard: IPatientCard;
    isSaving: boolean;

    patients: IPatient[];

    dieteticians: IDietetician[];
    creationDateDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected patientCardService: PatientCardService,
        protected patientService: PatientService,
        protected dieteticianService: DieteticianService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ patientCard }) => {
            this.patientCard = patientCard;
        });
        this.patientService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IPatient[]>) => mayBeOk.ok),
                map((response: HttpResponse<IPatient[]>) => response.body)
            )
            .subscribe((res: IPatient[]) => (this.patients = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.dieteticianService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IDietetician[]>) => mayBeOk.ok),
                map((response: HttpResponse<IDietetician[]>) => response.body)
            )
            .subscribe((res: IDietetician[]) => (this.dieteticians = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.patientCard.id !== undefined) {
            this.subscribeToSaveResponse(this.patientCardService.update(this.patientCard));
        } else {
            this.subscribeToSaveResponse(this.patientCardService.create(this.patientCard));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPatientCard>>) {
        result.subscribe((res: HttpResponse<IPatientCard>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPatientById(index: number, item: IPatient) {
        return item.id;
    }

    trackDieteticianById(index: number, item: IDietetician) {
        return item.id;
    }
}
