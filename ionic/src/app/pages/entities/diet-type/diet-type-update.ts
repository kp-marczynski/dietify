import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DietType } from './diet-type.model';
import { DietTypeService } from './diet-type.service';

@Component({
    selector: 'page-diet-type-update',
    templateUrl: 'diet-type-update.html'
})
export class DietTypeUpdatePage implements OnInit {

    dietType: DietType;
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
        private dietTypeService: DietTypeService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.dietType = response.data;
            this.isNew = this.dietType.id === null || this.dietType.id === undefined;
        });
    }

    updateForm(dietType: DietType) {
        this.form.patchValue({
            id: dietType.id,
            name: dietType.name,
        });
    }

    save() {
        this.isSaving = true;
        const dietType = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.dietTypeService.update(dietType));
        } else {
            this.subscribeToSaveResponse(this.dietTypeService.create(dietType));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<DietType>>) {
        result.subscribe((res: HttpResponse<DietType>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `DietType ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/diet-type');
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

    private createFromForm(): DietType {
        return {
            ...new DietType(),
            id: this.form.get(['id']).value,
            name: this.form.get(['name']).value,
        };
    }

}
