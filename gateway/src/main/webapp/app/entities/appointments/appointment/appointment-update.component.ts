import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IAppointment, Appointment } from 'app/shared/model/appointments/appointment.model';
import { AppointmentService } from './appointment.service';
import { IPatientCard } from 'app/shared/model/appointments/patient-card.model';
import { PatientCardService } from 'app/entities/appointments/patient-card';
import { IBodyMeasurement } from 'app/shared/model/appointments/body-measurement.model';
import { BodyMeasurementService } from 'app/entities/appointments/body-measurement';
import { INutritionalInterview } from 'app/shared/model/appointments/nutritional-interview.model';
import { NutritionalInterviewService } from 'app/entities/appointments/nutritional-interview';

@Component({
  selector: 'jhi-appointment-update',
  templateUrl: './appointment-update.component.html'
})
export class AppointmentUpdateComponent implements OnInit {
  isSaving: boolean;

  patientcards: IPatientCard[];

  bodymeasurements: IBodyMeasurement[];

  nutritionalinterviews: INutritionalInterview[];

  editForm = this.fb.group({
    id: [],
    appointmentDate: [null, [Validators.required]],
    appointmentState: [null, [Validators.required]],
    mealPlanId: [],
    generalAdvice: [],
    patientCardId: [null, Validators.required]
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected appointmentService: AppointmentService,
    protected patientCardService: PatientCardService,
    protected bodyMeasurementService: BodyMeasurementService,
    protected nutritionalInterviewService: NutritionalInterviewService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ appointment }) => {
      this.updateForm(appointment);
    });
    this.patientCardService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPatientCard[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPatientCard[]>) => response.body)
      )
      .subscribe((res: IPatientCard[]) => (this.patientcards = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.bodyMeasurementService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IBodyMeasurement[]>) => mayBeOk.ok),
        map((response: HttpResponse<IBodyMeasurement[]>) => response.body)
      )
      .subscribe((res: IBodyMeasurement[]) => (this.bodymeasurements = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.nutritionalInterviewService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<INutritionalInterview[]>) => mayBeOk.ok),
        map((response: HttpResponse<INutritionalInterview[]>) => response.body)
      )
      .subscribe(
        (res: INutritionalInterview[]) => (this.nutritionalinterviews = res),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(appointment: IAppointment) {
    this.editForm.patchValue({
      id: appointment.id,
      appointmentDate: appointment.appointmentDate != null ? appointment.appointmentDate.format(DATE_TIME_FORMAT) : null,
      appointmentState: appointment.appointmentState,
      mealPlanId: appointment.mealPlanId,
      generalAdvice: appointment.generalAdvice,
      patientCardId: appointment.patientCardId
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (isImage && !/^image\//.test(file.type)) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      () => console.log('blob added'), // sucess
      this.onError
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const appointment = this.createFromForm();
    if (appointment.id !== undefined) {
      this.subscribeToSaveResponse(this.appointmentService.update(appointment));
    } else {
      this.subscribeToSaveResponse(this.appointmentService.create(appointment));
    }
  }

  private createFromForm(): IAppointment {
    return {
      ...new Appointment(),
      id: this.editForm.get(['id']).value,
      appointmentDate:
        this.editForm.get(['appointmentDate']).value != null
          ? moment(this.editForm.get(['appointmentDate']).value, DATE_TIME_FORMAT)
          : undefined,
      appointmentState: this.editForm.get(['appointmentState']).value,
      mealPlanId: this.editForm.get(['mealPlanId']).value,
      generalAdvice: this.editForm.get(['generalAdvice']).value,
      patientCardId: this.editForm.get(['patientCardId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAppointment>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
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

  trackPatientCardById(index: number, item: IPatientCard) {
    return item.id;
  }

  trackBodyMeasurementById(index: number, item: IBodyMeasurement) {
    return item.id;
  }

  trackNutritionalInterviewById(index: number, item: INutritionalInterview) {
    return item.id;
  }
}
