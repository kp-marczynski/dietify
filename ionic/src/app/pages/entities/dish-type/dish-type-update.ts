import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DishType } from './dish-type.model';
import { DishTypeService } from './dish-type.service';

@Component({
    selector: 'page-dish-type-update',
    templateUrl: 'dish-type-update.html'
})
export class DishTypeUpdatePage implements OnInit {

    dishType: DishType;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        description: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private dishTypeService: DishTypeService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.dishType = response.data;
            this.isNew = this.dishType.id === null || this.dishType.id === undefined;
        });
    }

    updateForm(dishType: DishType) {
        this.form.patchValue({
            id: dishType.id,
            description: dishType.description,
        });
    }

    save() {
        this.isSaving = true;
        const dishType = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.dishTypeService.update(dishType));
        } else {
            this.subscribeToSaveResponse(this.dishTypeService.create(dishType));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<DishType>>) {
        result.subscribe((res: HttpResponse<DishType>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `DishType ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/dish-type');
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

    private createFromForm(): DishType {
        return {
            ...new DishType(),
            id: this.form.get(['id']).value,
            description: this.form.get(['description']).value,
        };
    }

}
