import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IAssignedMealPlan, AssignedMealPlan } from 'app/shared/model/appointments/assigned-meal-plan.model';
import { AssignedMealPlanService } from './assigned-meal-plan.service';
import { IAppointment } from 'app/shared/model/appointments/appointment.model';
import { AppointmentService } from 'app/entities/appointments/appointment';

@Component({
  selector: 'jhi-assigned-meal-plan-update',
  templateUrl: './assigned-meal-plan-update.component.html'
})
export class AssignedMealPlanUpdateComponent implements OnInit {
  isSaving: boolean;

  appointments: IAppointment[];

  editForm = this.fb.group({
    id: [],
    mealPlanId: [null, [Validators.required]],
    appointment: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected assignedMealPlanService: AssignedMealPlanService,
    protected appointmentService: AppointmentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ assignedMealPlan }) => {
      this.updateForm(assignedMealPlan);
    });
    this.appointmentService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAppointment[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAppointment[]>) => response.body)
      )
      .subscribe((res: IAppointment[]) => (this.appointments = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(assignedMealPlan: IAssignedMealPlan) {
    this.editForm.patchValue({
      id: assignedMealPlan.id,
      mealPlanId: assignedMealPlan.mealPlanId,
      appointment: assignedMealPlan.appointment
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const assignedMealPlan = this.createFromForm();
    if (assignedMealPlan.id !== undefined) {
      this.subscribeToSaveResponse(this.assignedMealPlanService.update(assignedMealPlan));
    } else {
      this.subscribeToSaveResponse(this.assignedMealPlanService.create(assignedMealPlan));
    }
  }

  private createFromForm(): IAssignedMealPlan {
    return {
      ...new AssignedMealPlan(),
      id: this.editForm.get(['id']).value,
      mealPlanId: this.editForm.get(['mealPlanId']).value,
      appointment: this.editForm.get(['appointment']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAssignedMealPlan>>) {
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
