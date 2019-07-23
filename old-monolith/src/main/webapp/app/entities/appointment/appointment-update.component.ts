import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IAppointment } from 'app/shared/model/appointment.model';
import { AppointmentService } from './appointment.service';
import { IBodyMeasurment } from 'app/shared/model/body-measurment.model';
import { BodyMeasurmentService } from 'app/entities/body-measurment';
import { IPatientCard } from 'app/shared/model/patient-card.model';
import { PatientCardService } from 'app/entities/patient-card';

@Component({
    selector: 'jhi-appointment-update',
    templateUrl: './appointment-update.component.html'
})
export class AppointmentUpdateComponent implements OnInit {
    appointment: IAppointment;
    isSaving: boolean;

    bodymeasurments: IBodyMeasurment[];

    patientcards: IPatientCard[];
    appointmentDateDp: any;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected appointmentService: AppointmentService,
        protected bodyMeasurmentService: BodyMeasurmentService,
        protected patientCardService: PatientCardService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ appointment }) => {
            this.appointment = appointment;
        });
        this.bodyMeasurmentService
            .query({ filter: 'appointment-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IBodyMeasurment[]>) => mayBeOk.ok),
                map((response: HttpResponse<IBodyMeasurment[]>) => response.body)
            )
            .subscribe(
                (res: IBodyMeasurment[]) => {
                    if (!this.appointment.bodyMeasurment || !this.appointment.bodyMeasurment.id) {
                        this.bodymeasurments = res;
                    } else {
                        this.bodyMeasurmentService
                            .find(this.appointment.bodyMeasurment.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IBodyMeasurment>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IBodyMeasurment>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IBodyMeasurment) => (this.bodymeasurments = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.patientCardService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IPatientCard[]>) => mayBeOk.ok),
                map((response: HttpResponse<IPatientCard[]>) => response.body)
            )
            .subscribe((res: IPatientCard[]) => (this.patientcards = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.appointment.id !== undefined) {
            this.subscribeToSaveResponse(this.appointmentService.update(this.appointment));
        } else {
            this.subscribeToSaveResponse(this.appointmentService.create(this.appointment));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAppointment>>) {
        result.subscribe((res: HttpResponse<IAppointment>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackBodyMeasurmentById(index: number, item: IBodyMeasurment) {
        return item.id;
    }

    trackPatientCardById(index: number, item: IPatientCard) {
        return item.id;
    }
}
