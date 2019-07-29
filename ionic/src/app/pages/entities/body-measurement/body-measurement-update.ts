import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BodyMeasurement } from './body-measurement.model';
import { BodyMeasurementService } from './body-measurement.service';
import { Appointment, AppointmentService } from '../appointment';

@Component({
    selector: 'page-body-measurement-update',
    templateUrl: 'body-measurement-update.html'
})
export class BodyMeasurementUpdatePage implements OnInit {

    bodyMeasurement: BodyMeasurement;
    appointments: Appointment[];
    completionDateDp: any;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        completionDate: [null, [Validators.required]],
        height: [null, [Validators.required]],
        weight: [null, [Validators.required]],
        waist: [null, [Validators.required]],
        percentOfFatTissue: [null, []],
        percentOfWater: [null, []],
        muscleMass: [null, []],
        physicalMark: [null, []],
        calciumInBones: [null, []],
        basicMetabolism: [null, []],
        metabolicAge: [null, []],
        visceralFatLevel: [null, []],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private appointmentService: AppointmentService,
        private bodyMeasurementService: BodyMeasurementService
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
            this.bodyMeasurement = response.data;
            this.isNew = this.bodyMeasurement.id === null || this.bodyMeasurement.id === undefined;
        });
    }

    updateForm(bodyMeasurement: BodyMeasurement) {
        this.form.patchValue({
            id: bodyMeasurement.id,
            completionDate: bodyMeasurement.completionDate,
            height: bodyMeasurement.height,
            weight: bodyMeasurement.weight,
            waist: bodyMeasurement.waist,
            percentOfFatTissue: bodyMeasurement.percentOfFatTissue,
            percentOfWater: bodyMeasurement.percentOfWater,
            muscleMass: bodyMeasurement.muscleMass,
            physicalMark: bodyMeasurement.physicalMark,
            calciumInBones: bodyMeasurement.calciumInBones,
            basicMetabolism: bodyMeasurement.basicMetabolism,
            metabolicAge: bodyMeasurement.metabolicAge,
            visceralFatLevel: bodyMeasurement.visceralFatLevel,
        });
    }

    save() {
        this.isSaving = true;
        const bodyMeasurement = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.bodyMeasurementService.update(bodyMeasurement));
        } else {
            this.subscribeToSaveResponse(this.bodyMeasurementService.create(bodyMeasurement));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<BodyMeasurement>>) {
        result.subscribe((res: HttpResponse<BodyMeasurement>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `BodyMeasurement ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/body-measurement');
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

    private createFromForm(): BodyMeasurement {
        return {
            ...new BodyMeasurement(),
            id: this.form.get(['id']).value,
            completionDate: this.form.get(['completionDate']).value,
            height: this.form.get(['height']).value,
            weight: this.form.get(['weight']).value,
            waist: this.form.get(['waist']).value,
            percentOfFatTissue: this.form.get(['percentOfFatTissue']).value,
            percentOfWater: this.form.get(['percentOfWater']).value,
            muscleMass: this.form.get(['muscleMass']).value,
            physicalMark: this.form.get(['physicalMark']).value,
            calciumInBones: this.form.get(['calciumInBones']).value,
            basicMetabolism: this.form.get(['basicMetabolism']).value,
            metabolicAge: this.form.get(['metabolicAge']).value,
            visceralFatLevel: this.form.get(['visceralFatLevel']).value,
        };
    }

    compareAppointment(first: Appointment, second: Appointment): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackAppointmentById(index: number, item: Appointment) {
        return item.id;
    }
}
