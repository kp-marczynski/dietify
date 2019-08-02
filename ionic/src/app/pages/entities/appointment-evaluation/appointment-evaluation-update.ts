import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AppointmentEvaluation } from './appointment-evaluation.model';
import { AppointmentEvaluationService } from './appointment-evaluation.service';
import { Appointment, AppointmentService } from '../appointment';

@Component({
    selector: 'page-appointment-evaluation-update',
    templateUrl: 'appointment-evaluation-update.html'
})
export class AppointmentEvaluationUpdatePage implements OnInit {

    appointmentEvaluation: AppointmentEvaluation;
    appointments: Appointment[];
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        overallSatisfaction: [null, [Validators.required]],
        dietitianServiceSatisfaction: [null, [Validators.required]],
        mealPlanOverallSatisfaction: [null, [Validators.required]],
        mealCostSatisfaction: [null, [Validators.required]],
        mealPreparationTimeSatisfaction: [null, [Validators.required]],
        mealComplexityLevelSatisfaction: [null, [Validators.required]],
        mealTastefulnessSatisfaction: [null, [Validators.required]],
        dietaryResultSatisfaction: [null, [Validators.required]],
        comment: [null, []],
        appointment: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private dataUtils: JhiDataUtils,
        private appointmentService: AppointmentService,
        private appointmentEvaluationService: AppointmentEvaluationService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.appointmentService
            .query({filter: 'appointmentevaluation-is-null'})
            .subscribe(data => {
                if (!this.appointmentEvaluation.appointment || !this.appointmentEvaluation.appointment.id) {
                    this.appointments = data;
                } else {
                    this.appointmentService
                        .find(this.appointmentEvaluation.appointment.id)
                        .subscribe((subData: Appointment) => {
                            this.appointments = [subData].concat(subData);
                        }, (error) => this.onError(error));
                }
            }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.appointmentEvaluation = response.data;
            this.isNew = this.appointmentEvaluation.id === null || this.appointmentEvaluation.id === undefined;
        });
    }

    updateForm(appointmentEvaluation: AppointmentEvaluation) {
        this.form.patchValue({
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
            appointment: appointmentEvaluation.appointment,
        });
    }

    save() {
        this.isSaving = true;
        const appointmentEvaluation = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.appointmentEvaluationService.update(appointmentEvaluation));
        } else {
            this.subscribeToSaveResponse(this.appointmentEvaluationService.create(appointmentEvaluation));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<AppointmentEvaluation>>) {
        result.subscribe((res: HttpResponse<AppointmentEvaluation>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `AppointmentEvaluation ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/appointment-evaluation');
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

    private createFromForm(): AppointmentEvaluation {
        return {
            ...new AppointmentEvaluation(),
            id: this.form.get(['id']).value,
            overallSatisfaction: this.form.get(['overallSatisfaction']).value,
            dietitianServiceSatisfaction: this.form.get(['dietitianServiceSatisfaction']).value,
            mealPlanOverallSatisfaction: this.form.get(['mealPlanOverallSatisfaction']).value,
            mealCostSatisfaction: this.form.get(['mealCostSatisfaction']).value,
            mealPreparationTimeSatisfaction: this.form.get(['mealPreparationTimeSatisfaction']).value,
            mealComplexityLevelSatisfaction: this.form.get(['mealComplexityLevelSatisfaction']).value,
            mealTastefulnessSatisfaction: this.form.get(['mealTastefulnessSatisfaction']).value,
            dietaryResultSatisfaction: this.form.get(['dietaryResultSatisfaction']).value,
            comment: this.form.get(['comment']).value,
            appointment: this.form.get(['appointment']).value,
        };
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

    compareAppointment(first: Appointment, second: Appointment): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackAppointmentById(index: number, item: Appointment) {
        return item.id;
    }
}
