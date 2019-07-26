import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AssignedMealPlan } from './assigned-meal-plan.model';
import { AssignedMealPlanService } from './assigned-meal-plan.service';
import { Appointment, AppointmentService } from '../appointment';

@Component({
    selector: 'page-assigned-meal-plan-update',
    templateUrl: 'assigned-meal-plan-update.html'
})
export class AssignedMealPlanUpdatePage implements OnInit {

    assignedMealPlan: AssignedMealPlan;
    appointments: Appointment[];
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        mealPlanId: [null, [Validators.required]],
        appointment: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private appointmentService: AppointmentService,
        private assignedMealPlanService: AssignedMealPlanService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.appointmentService.query()
            .subscribe(data => { this.appointments = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.assignedMealPlan = response.data;
            this.isNew = this.assignedMealPlan.id === null || this.assignedMealPlan.id === undefined;
        });
    }

    updateForm(assignedMealPlan: AssignedMealPlan) {
        this.form.patchValue({
            id: assignedMealPlan.id,
            mealPlanId: assignedMealPlan.mealPlanId,
            appointment: assignedMealPlan.appointment,
        });
    }

    save() {
        this.isSaving = true;
        const assignedMealPlan = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.assignedMealPlanService.update(assignedMealPlan));
        } else {
            this.subscribeToSaveResponse(this.assignedMealPlanService.create(assignedMealPlan));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<AssignedMealPlan>>) {
        result.subscribe((res: HttpResponse<AssignedMealPlan>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `AssignedMealPlan ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/assigned-meal-plan');
    }

    previousState() {
        window.history.back();
    }

    async onError(error) {
        this.isSaving = false;
        console.error(error);
        const toast = await this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
        toast.present();
    }

    private createFromForm(): AssignedMealPlan {
        return {
            ...new AssignedMealPlan(),
            id: this.form.get(['id']).value,
            mealPlanId: this.form.get(['mealPlanId']).value,
            appointment: this.form.get(['appointment']).value,
        };
    }

    compareAppointment(first: Appointment, second: Appointment): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackAppointmentById(index: number, item: Appointment) {
        return item.id;
    }
}
