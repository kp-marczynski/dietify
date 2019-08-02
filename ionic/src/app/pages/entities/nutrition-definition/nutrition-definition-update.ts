import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NutritionDefinition } from './nutrition-definition.model';
import { NutritionDefinitionService } from './nutrition-definition.service';

@Component({
    selector: 'page-nutrition-definition-update',
    templateUrl: 'nutrition-definition-update.html'
})
export class NutritionDefinitionUpdatePage implements OnInit {

    nutritionDefinition: NutritionDefinition;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        tag: [null, [Validators.required]],
        description: [null, [Validators.required]],
        units: [null, [Validators.required]],
        decimalPlaces: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private nutritionDefinitionService: NutritionDefinitionService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.nutritionDefinition = response.data;
            this.isNew = this.nutritionDefinition.id === null || this.nutritionDefinition.id === undefined;
        });
    }

    updateForm(nutritionDefinition: NutritionDefinition) {
        this.form.patchValue({
            id: nutritionDefinition.id,
            tag: nutritionDefinition.tag,
            description: nutritionDefinition.description,
            units: nutritionDefinition.units,
            decimalPlaces: nutritionDefinition.decimalPlaces,
        });
    }

    save() {
        this.isSaving = true;
        const nutritionDefinition = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.nutritionDefinitionService.update(nutritionDefinition));
        } else {
            this.subscribeToSaveResponse(this.nutritionDefinitionService.create(nutritionDefinition));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<NutritionDefinition>>) {
        result.subscribe((res: HttpResponse<NutritionDefinition>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `NutritionDefinition ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/nutrition-definition');
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

    private createFromForm(): NutritionDefinition {
        return {
            ...new NutritionDefinition(),
            id: this.form.get(['id']).value,
            tag: this.form.get(['tag']).value,
            description: this.form.get(['description']).value,
            units: this.form.get(['units']).value,
            decimalPlaces: this.form.get(['decimalPlaces']).value,
        };
    }

}
