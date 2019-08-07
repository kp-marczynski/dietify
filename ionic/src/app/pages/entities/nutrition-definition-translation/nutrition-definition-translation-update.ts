import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NutritionDefinitionTranslation } from './nutrition-definition-translation.model';
import { NutritionDefinitionTranslationService } from './nutrition-definition-translation.service';
import { NutritionDefinition, NutritionDefinitionService } from '../nutrition-definition';

@Component({
    selector: 'page-nutrition-definition-translation-update',
    templateUrl: 'nutrition-definition-translation-update.html'
})
export class NutritionDefinitionTranslationUpdatePage implements OnInit {

    nutritionDefinitionTranslation: NutritionDefinitionTranslation;
    nutritionDefinitions: NutritionDefinition[];
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        translation: [null, [Validators.required]],
        language: [null, [Validators.required]],
        nutritionDefinition: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private nutritionDefinitionService: NutritionDefinitionService,
        private nutritionDefinitionTranslationService: NutritionDefinitionTranslationService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.nutritionDefinitionService.query()
            .subscribe(data => { this.nutritionDefinitions = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.nutritionDefinitionTranslation = response.data;
            this.isNew = this.nutritionDefinitionTranslation.id === null || this.nutritionDefinitionTranslation.id === undefined;
        });
    }

    updateForm(nutritionDefinitionTranslation: NutritionDefinitionTranslation) {
        this.form.patchValue({
            id: nutritionDefinitionTranslation.id,
            translation: nutritionDefinitionTranslation.translation,
            language: nutritionDefinitionTranslation.language,
            nutritionDefinition: nutritionDefinitionTranslation.nutritionDefinition,
        });
    }

    save() {
        this.isSaving = true;
        const nutritionDefinitionTranslation = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.nutritionDefinitionTranslationService.update(nutritionDefinitionTranslation));
        } else {
            this.subscribeToSaveResponse(this.nutritionDefinitionTranslationService.create(nutritionDefinitionTranslation));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<NutritionDefinitionTranslation>>) {
        result.subscribe((res: HttpResponse<NutritionDefinitionTranslation>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `NutritionDefinitionTranslation ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/nutrition-definition-translation');
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

    private createFromForm(): NutritionDefinitionTranslation {
        return {
            ...new NutritionDefinitionTranslation(),
            id: this.form.get(['id']).value,
            translation: this.form.get(['translation']).value,
            language: this.form.get(['language']).value,
            nutritionDefinition: this.form.get(['nutritionDefinition']).value,
        };
    }

    compareNutritionDefinition(first: NutritionDefinition, second: NutritionDefinition): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackNutritionDefinitionById(index: number, item: NutritionDefinition) {
        return item.id;
    }
}
