import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {JhiDataUtils} from 'ng-jhipster';

import {IAppointment} from 'app/shared/model/appointments/appointment.model';
import {MainLayoutCardService} from 'app/layouts/main/main-layout-card.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MealPlan} from 'app/shared/model/mealplans/meal-plan.model';
import {AssignedMealPlan} from 'app/shared/model/appointments/assigned-meal-plan.model';
import {AppointmentService} from 'app/entities/appointments/appointment/appointment.service';
import {MealPlanComponent} from 'app/entities/mealplans/meal-plan';

@Component({
  selector: 'jhi-appointment-detail',
  templateUrl: './appointment-detail.component.html'
})
export class AppointmentDetailComponent implements OnInit {
  appointment: IAppointment;

  constructor(
    protected appointmentService: AppointmentService,
    protected dataUtils: JhiDataUtils,
    protected activatedRoute: ActivatedRoute,
    protected modalService: NgbModal,
    protected layoutCardService: MainLayoutCardService
  ) {
  }

  ngOnInit() {
    this.layoutCardService.changeMainCardContainerVisibility(false);
    this.activatedRoute.data.subscribe(({appointment}) => {
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
    const modalRef = this.modalService.open(MealPlanComponent, {windowClass: 'custom-modal'});

    modalRef.componentInstance.passEntry.subscribe((receivedEntry: MealPlan) => {
      modalRef.close();
      if (!this.appointment.mealPlans) {
        this.appointment.mealPlans = [];
      }
      this.appointment.mealPlans.push(new AssignedMealPlan(null, receivedEntry.id));
      this.appointmentService.update(this.appointment);
    });
  }
}
