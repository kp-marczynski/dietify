import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { FormBuilder } from '@angular/forms';

import { AppointmentState, IAppointment } from 'app/shared/model/appointments/appointment.model';
import { MainLayoutCardService } from 'app/layouts/main/main-layout-card.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MealPlan } from 'app/shared/model/mealplans/meal-plan.model';
import { AssignedMealPlan } from 'app/shared/model/appointments/assigned-meal-plan.model';
import { AppointmentService } from 'app/entities/appointments/appointment/appointment.service';
import { MealPlanComponent } from 'app/entities/mealplans/meal-plan';
import { NutritionalInterviewDetailComponent, NutritionalInterviewUpdateComponent } from 'app/entities/appointments/nutritional-interview';
import { NutritionalInterview } from 'app/shared/model/appointments/nutritional-interview.model';
import { BodyMeasurementDetailComponent, BodyMeasurementUpdateComponent } from 'app/entities/appointments/body-measurement';
import { BodyMeasurement } from 'app/shared/model/appointments/body-measurement.model';

@Component({
  selector: 'jhi-appointment-detail',
  templateUrl: './appointment-detail.component.html'
})
export class AppointmentDetailComponent implements OnInit {
  appointment: IAppointment;
  isEditingAdvice = false;

  editForm = this.fb.group({
    generalAdvice: []
  });

  constructor(
    protected appointmentService: AppointmentService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected activatedRoute: ActivatedRoute,
    protected modalService: NgbModal,
    protected layoutCardService: MainLayoutCardService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.layoutCardService.changeMainCardContainerVisibility(false);
    this.activatedRoute.data.subscribe(({ appointment }) => {
      this.appointment = appointment;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  previousState() {
    window.history.back();
  }

  addMealPlan() {
    const modalRef = this.modalService.open(MealPlanComponent, { windowClass: 'custom-modal' });

    modalRef.componentInstance.passEntry.subscribe((receivedEntry: MealPlan) => {
      modalRef.close();
      if (!this.appointment.mealPlans) {
        this.appointment.mealPlans = [];
      }
      this.appointment.mealPlans.push(new AssignedMealPlan(null, receivedEntry.id));
      this.appointmentService
        .update(this.appointment)
        .subscribe(
          (res: HttpResponse<IAppointment>) => (this.appointment.mealPlans = res.body.mealPlans),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
    });
  }

  addNutritionalInterview() {
    const modalRef = this.modalService.open(NutritionalInterviewUpdateComponent, { windowClass: 'custom-modal' });
    modalRef.componentInstance.passEntry.subscribe((receivedEntry: NutritionalInterview) => {
      modalRef.close();
      this.appointment.nutritionalInterview = receivedEntry;
      this.appointmentService
        .update(this.appointment)
        .subscribe(
          (res: HttpResponse<IAppointment>) => (this.appointment.nutritionalInterview = res.body.nutritionalInterview),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
    });
    modalRef.componentInstance.cancel.subscribe(res => modalRef.close());
  }

  addBodyMeasurement() {
    const modalRef = this.modalService.open(BodyMeasurementUpdateComponent, { windowClass: 'custom-modal' });
    modalRef.componentInstance.passEntry.subscribe((receivedEntry: BodyMeasurement) => {
      modalRef.close();
      this.appointment.bodyMeasurement = receivedEntry;
      this.appointmentService
        .update(this.appointment)
        .subscribe(
          (res: HttpResponse<IAppointment>) => (this.appointment.bodyMeasurement = res.body.bodyMeasurement),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
    });
    modalRef.componentInstance.cancel.subscribe(res => modalRef.close());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  showNutritionalInterview() {
    const modalRef = this.modalService.open(NutritionalInterviewDetailComponent, { windowClass: 'custom-modal' });
    modalRef.componentInstance.nutritionalInterview = this.appointment.nutritionalInterview;
    modalRef.componentInstance.showHeader = true;
    modalRef.componentInstance.cancel.subscribe(res => modalRef.close());
  }

  showBodyMeasurement() {
    const modalRef = this.modalService.open(BodyMeasurementDetailComponent, { windowClass: 'custom-modal' });
    modalRef.componentInstance.bodyMeasurement = this.appointment.bodyMeasurement;
    modalRef.componentInstance.cancel.subscribe(res => modalRef.close());
  }

  removeMealPlanFromAppointment(id: number) {
    this.appointment.mealPlans = this.appointment.mealPlans.filter(mealPlan => mealPlan.id !== id);
    this.appointmentService
      .update(this.appointment)
      .subscribe(
        (res: HttpResponse<IAppointment>) => (this.appointment.mealPlans = res.body.mealPlans),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  saveAdvice() {
    this.isEditingAdvice = false;
    this.appointment.generalAdvice = this.editForm.get('generalAdvice').value;
    this.appointmentService
      .update(this.appointment)
      .subscribe((res: HttpResponse<IAppointment>) => {}, (res: HttpErrorResponse) => this.onError(res.message));
  }

  editAdvice() {
    this.editForm.patchValue({
      generalAdvice: this.appointment.generalAdvice
    });
    this.isEditingAdvice = true;
  }

  cancelAppointment() {
    this.appointment.appointmentState = AppointmentState.CANCELED;
    this.appointmentService
      .update(this.appointment)
      .subscribe((res: HttpResponse<IAppointment>) => {}, (res: HttpErrorResponse) => this.onError(res.message));
  }

  appointmentTookPlace() {
    this.appointment.appointmentState = AppointmentState.TOOK_PLACE;
    this.appointmentService
      .update(this.appointment)
      .subscribe((res: HttpResponse<IAppointment>) => {}, (res: HttpErrorResponse) => this.onError(res.message));
  }

  consultationCompleted() {
    this.appointment.appointmentState = AppointmentState.COMPLETED;
    this.appointmentService
      .update(this.appointment)
      .subscribe((res: HttpResponse<IAppointment>) => {}, (res: HttpErrorResponse) => this.onError(res.message));
  }
}
