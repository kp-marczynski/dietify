import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NutritionalInterview } from './nutritional-interview.model';
import { NutritionalInterviewService } from './nutritional-interview.service';
import { Appointment, AppointmentService } from '../appointment';

@Component({
    selector: 'page-nutritional-interview-update',
    templateUrl: 'nutritional-interview-update.html'
})
export class NutritionalInterviewUpdatePage implements OnInit {

    nutritionalInterview: NutritionalInterview;
    appointments: Appointment[];
    completionDateDp: any;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        completionDate: [null, [Validators.required]],
        targetWeight: [null, [Validators.required]],
        advicePurpose: [null, [Validators.required]],
        physicalActivity: [null, [Validators.required]],
        diseases: [null, []],
        medicines: [null, []],
        jobType: [null, []],
        likedProducts: [null, []],
        dislikedProducts: [null, []],
        foodAllergies: [null, []],
        foodIntolerances: [null, []],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private dataUtils: JhiDataUtils,
        private appointmentService: AppointmentService,
        private nutritionalInterviewService: NutritionalInterviewService
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
            this.nutritionalInterview = response.data;
            this.isNew = this.nutritionalInterview.id === null || this.nutritionalInterview.id === undefined;
        });
    }

    updateForm(nutritionalInterview: NutritionalInterview) {
        this.form.patchValue({
            id: nutritionalInterview.id,
            completionDate: nutritionalInterview.completionDate,
            targetWeight: nutritionalInterview.targetWeight,
            advicePurpose: nutritionalInterview.advicePurpose,
            physicalActivity: nutritionalInterview.physicalActivity,
            diseases: nutritionalInterview.diseases,
            medicines: nutritionalInterview.medicines,
            jobType: nutritionalInterview.jobType,
            likedProducts: nutritionalInterview.likedProducts,
            dislikedProducts: nutritionalInterview.dislikedProducts,
            foodAllergies: nutritionalInterview.foodAllergies,
            foodIntolerances: nutritionalInterview.foodIntolerances,
        });
    }

    save() {
        this.isSaving = true;
        const nutritionalInterview = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.nutritionalInterviewService.update(nutritionalInterview));
        } else {
            this.subscribeToSaveResponse(this.nutritionalInterviewService.create(nutritionalInterview));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<NutritionalInterview>>) {
        result.subscribe((res: HttpResponse<NutritionalInterview>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `NutritionalInterview ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/nutritional-interview');
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

    private createFromForm(): NutritionalInterview {
        return {
            ...new NutritionalInterview(),
            id: this.form.get(['id']).value,
            completionDate: this.form.get(['completionDate']).value,
            targetWeight: this.form.get(['targetWeight']).value,
            advicePurpose: this.form.get(['advicePurpose']).value,
            physicalActivity: this.form.get(['physicalActivity']).value,
            diseases: this.form.get(['diseases']).value,
            medicines: this.form.get(['medicines']).value,
            jobType: this.form.get(['jobType']).value,
            likedProducts: this.form.get(['likedProducts']).value,
            dislikedProducts: this.form.get(['dislikedProducts']).value,
            foodAllergies: this.form.get(['foodAllergies']).value,
            foodIntolerances: this.form.get(['foodIntolerances']).value,
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
