import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IAppointmentEvaluation, AppointmentEvaluation } from 'app/shared/model/appointments/appointment-evaluation.model';
import { AppointmentEvaluationService } from './appointment-evaluation.service';
import { IAppointment } from 'app/shared/model/appointments/appointment.model';
import { AppointmentService } from 'app/entities/appointments/appointment';

@Component({
  selector: 'jhi-appointment-evaluation-update',
  templateUrl: './appointment-evaluation-update.component.html'
})
export class AppointmentEvaluationUpdateComponent implements OnInit {
  isSaving: boolean;

  appointments: IAppointment[];

  editForm = this.fb.group({
    id: [],
    overallSatisfaction: [null, [Validators.required]],
    dietitianServiceSatisfaction: [null, [Validators.required]],
    mealPlanOverallSatisfaction: [null, [Validators.required]],
    mealCostSatisfaction: [null, [Validators.required]],
    mealPreparationTimeSatisfaction: [null, [Validators.required]],
    mealComplexityLevelSatisfaction: [null, [Validators.required]],
    mealTastefulnessSatisfaction: [null, [Validators.required]],
    dietaryResultSatisfaction: [null, [Validators.required]],
    comment: [],
    appointment: [null, Validators.required]
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected appointmentEvaluationService: AppointmentEvaluationService,
    protected appointmentService: AppointmentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ appointmentEvaluation }) => {
      this.updateForm(appointmentEvaluation);
    });
    this.appointmentService
      .query({ filter: 'appointmentevaluation-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IAppointment[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAppointment[]>) => response.body)
      )
      .subscribe(
        (res: IAppointment[]) => {
          if (!this.editForm.get('appointment').value || !this.editForm.get('appointment').value.id) {
            this.appointments = res;
          } else {
            this.appointmentService
              .find(this.editForm.get('appointment').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IAppointment>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IAppointment>) => subResponse.body)
              )
              .subscribe(
                (subRes: IAppointment) => (this.appointments = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(appointmentEvaluation: IAppointmentEvaluation) {
    this.editForm.patchValue({
      id: appointmentEvaluation.id,
      overallSatisfaction: appointmentEvaluation.overallSatisfaction,
      dietitianServiceSatisfaction: appointmentEvaluation.dietitianServiceSatisfaction,
      mealPlanOverallSatisfaction: appointmentEvaluation.mealPlanOverallSatisfaction,
      mealCostSatisfaction: appointmentEvaluation.mealCostSatisfaction,
      mealPreparationTimeSatisfaction: appointmentEvaluation.mealPreparationTimeSatisfaction,
      mealComplexityLevelSatisfaction: appointmentEvaluation.mealComplexityLevelSatisfaction,
      mealTastefulnessSatisfaction: appointmentEvaluation.mealTastefulnessSatisfaction,
      dietaryResultSatisfaction: appointmentEvaluation.dietaryResultSatisfaction,
      comment: appointmentEvaluation.comment,
      appointment: appointmentEvaluation.appointment
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
    const appointmentEvaluation = this.createFromForm();
    if (appointmentEvaluation.id !== undefined) {
      this.subscribeToSaveResponse(this.appointmentEvaluationService.update(appointmentEvaluation));
    } else {
      this.subscribeToSaveResponse(this.appointmentEvaluationService.create(appointmentEvaluation));
    }
  }

  private createFromForm(): IAppointmentEvaluation {
    return {
      ...new AppointmentEvaluation(),
      id: this.editForm.get(['id']).value,
      overallSatisfaction: this.editForm.get(['overallSatisfaction']).value,
      dietitianServiceSatisfaction: this.editForm.get(['dietitianServiceSatisfaction']).value,
      mealPlanOverallSatisfaction: this.editForm.get(['mealPlanOverallSatisfaction']).value,
      mealCostSatisfaction: this.editForm.get(['mealCostSatisfaction']).value,
      mealPreparationTimeSatisfaction: this.editForm.get(['mealPreparationTimeSatisfaction']).value,
      mealComplexityLevelSatisfaction: this.editForm.get(['mealComplexityLevelSatisfaction']).value,
      mealTastefulnessSatisfaction: this.editForm.get(['mealTastefulnessSatisfaction']).value,
      dietaryResultSatisfaction: this.editForm.get(['dietaryResultSatisfaction']).value,
      comment: this.editForm.get(['comment']).value,
      appointment: this.editForm.get(['appointment']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAppointmentEvaluation>>) {
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

  trackAppointmentById(index: number, item: IAppointment) {
    return item.id;
  }
}
