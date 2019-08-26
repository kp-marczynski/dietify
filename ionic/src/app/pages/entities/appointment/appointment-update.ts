import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Appointment } from './appointment.model';
import { AppointmentService } from './appointment.service';
import { BodyMeasurement, BodyMeasurementService } from '../body-measurement';
import { NutritionalInterview, NutritionalInterviewService } from '../nutritional-interview';
import { PatientCard, PatientCardService } from '../patient-card';

@Component({
    selector: 'page-appointment-update',
    templateUrl: 'appointment-update.html'
})
export class AppointmentUpdatePage implements OnInit {

    appointment: Appointment;
    bodyMeasurements: BodyMeasurement[];
    nutritionalInterviews: NutritionalInterview[];
    patientCards: PatientCard[];
    appointmentDate: string;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        appointmentDate: [null, [Validators.required]],
        appointmentState: [null, [Validators.required]],
        generalAdvice: [null, []],
        bodyMeasurement: [null, []],
        nutritionalInterview: [null, []],
        patientCard: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private dataUtils: JhiDataUtils,
        private bodyMeasurementService: BodyMeasurementService,
        private nutritionalInterviewService: NutritionalInterviewService,
        private patientCardService: PatientCardService,
        private appointmentService: AppointmentService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.bodyMeasurementService
            .query({filter: 'appointment-is-null'})
            .subscribe(data => {
                if (!this.appointment.bodyMeasurement || !this.appointment.bodyMeasurement.id) {
                    this.bodyMeasurements = data;
                } else {
                    this.bodyMeasurementService
                        .find(this.appointment.bodyMeasurement.id)
                        .subscribe((subData: BodyMeasurement) => {
                            this.bodyMeasurements = [subData].concat(subData);
                        }, (error) => this.onError(error));
                }
            }, (error) => this.onError(error));
        this.nutritionalInterviewService
            .query({filter: 'appointment-is-null'})
            .subscribe(data => {
                if (!this.appointment.nutritionalInterview || !this.appointment.nutritionalInterview.id) {
                    this.nutritionalInterviews = data;
                } else {
                    this.nutritionalInterviewService
                        .find(this.appointment.nutritionalInterview.id)
                        .subscribe((subData: NutritionalInterview) => {
                            this.nutritionalInterviews = [subData].concat(subData);
                        }, (error) => this.onError(error));
                }
            }, (error) => this.onError(error));
        this.patientCardService.query()
            .subscribe(data => { this.patientCards = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.appointment = response.data;
            this.isNew = this.appointment.id === null || this.appointment.id === undefined;
        });
    }

    updateForm(appointment: Appointment) {
        this.form.patchValue({
            id: appointment.id,
            appointmentDate: (this.isNew) ? new Date().toISOString() : appointment.appointmentDate,
            appointmentState: appointment.appointmentState,
            generalAdvice: appointment.generalAdvice,
            bodyMeasurement: appointment.bodyMeasurement,
            nutritionalInterview: appointment.nutritionalInterview,
            patientCard: appointment.patientCard,
        });
    }

    save() {
        this.isSaving = true;
        const appointment = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.appointmentService.update(appointment));
        } else {
            this.subscribeToSaveResponse(this.appointmentService.create(appointment));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<Appointment>>) {
        result.subscribe((res: HttpResponse<Appointment>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `Appointment ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/appointment');
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

    private createFromForm(): Appointment {
        return {
            ...new Appointment(),
            id: this.form.get(['id']).value,
            appointmentDate: new Date(this.form.get(['appointmentDate']).value),
            appointmentState: this.form.get(['appointmentState']).value,
            generalAdvice: this.form.get(['generalAdvice']).value,
            bodyMeasurement: this.form.get(['bodyMeasurement']).value,
            nutritionalInterview: this.form.get(['nutritionalInterview']).value,
            patientCard: this.form.get(['patientCard']).value,
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

    compareBodyMeasurement(first: BodyMeasurement, second: BodyMeasurement): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackBodyMeasurementById(index: number, item: BodyMeasurement) {
        return item.id;
    }
    compareNutritionalInterview(first: NutritionalInterview, second: NutritionalInterview): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackNutritionalInterviewById(index: number, item: NutritionalInterview) {
        return item.id;
    }
    comparePatientCard(first: PatientCard, second: PatientCard): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackPatientCardById(index: number, item: PatientCard) {
        return item.id;
    }
}
