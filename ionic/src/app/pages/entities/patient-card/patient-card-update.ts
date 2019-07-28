import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PatientCard } from './patient-card.model';
import { PatientCardService } from './patient-card.service';

@Component({
    selector: 'page-patient-card-update',
    templateUrl: 'patient-card-update.html'
})
export class PatientCardUpdatePage implements OnInit {

    patientCard: PatientCard;
    creationDateDp: any;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        creationDate: [null, [Validators.required]],
        dietitianId: [null, [Validators.required]],
        patientId: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private patientCardService: PatientCardService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.patientCard = response.data;
            this.isNew = this.patientCard.id === null || this.patientCard.id === undefined;
        });
    }

    updateForm(patientCard: PatientCard) {
        this.form.patchValue({
            id: patientCard.id,
            creationDate: patientCard.creationDate,
            dietitianId: patientCard.dietitianId,
            patientId: patientCard.patientId,
        });
    }

    save() {
        this.isSaving = true;
        const patientCard = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.patientCardService.update(patientCard));
        } else {
            this.subscribeToSaveResponse(this.patientCardService.create(patientCard));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<PatientCard>>) {
        result.subscribe((res: HttpResponse<PatientCard>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `PatientCard ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/patient-card');
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

    private createFromForm(): PatientCard {
        return {
            ...new PatientCard(),
            id: this.form.get(['id']).value,
            creationDate: this.form.get(['creationDate']).value,
            dietitianId: this.form.get(['dietitianId']).value,
            patientId: this.form.get(['patientId']).value,
        };
    }

}
