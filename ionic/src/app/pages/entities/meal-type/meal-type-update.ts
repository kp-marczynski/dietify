import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MealType } from './meal-type.model';
import { MealTypeService } from './meal-type.service';

@Component({
    selector: 'page-meal-type-update',
    templateUrl: 'meal-type-update.html'
})
export class MealTypeUpdatePage implements OnInit {

    mealType: MealType;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        name: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private mealTypeService: MealTypeService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.mealType = response.data;
            this.isNew = this.mealType.id === null || this.mealType.id === undefined;
        });
    }

    updateForm(mealType: MealType) {
        this.form.patchValue({
            id: mealType.id,
            name: mealType.name,
        });
    }

    save() {
        this.isSaving = true;
        const mealType = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.mealTypeService.update(mealType));
        } else {
            this.subscribeToSaveResponse(this.mealTypeService.create(mealType));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<MealType>>) {
        result.subscribe((res: HttpResponse<MealType>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `MealType ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/meal-type');
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

    private createFromForm(): MealType {
        return {
            ...new MealType(),
            id: this.form.get(['id']).value,
            name: this.form.get(['name']).value,
        };
    }

}
