import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MealTypeTranslation } from './meal-type-translation.model';
import { MealTypeTranslationService } from './meal-type-translation.service';
import { MealType, MealTypeService } from '../meal-type';

@Component({
    selector: 'page-meal-type-translation-update',
    templateUrl: 'meal-type-translation-update.html'
})
export class MealTypeTranslationUpdatePage implements OnInit {

    mealTypeTranslation: MealTypeTranslation;
    mealTypes: MealType[];
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        translation: [null, [Validators.required]],
        language: [null, [Validators.required]],
        mealType: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private mealTypeService: MealTypeService,
        private mealTypeTranslationService: MealTypeTranslationService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.mealTypeService.query()
            .subscribe(data => { this.mealTypes = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.mealTypeTranslation = response.data;
            this.isNew = this.mealTypeTranslation.id === null || this.mealTypeTranslation.id === undefined;
        });
    }

    updateForm(mealTypeTranslation: MealTypeTranslation) {
        this.form.patchValue({
            id: mealTypeTranslation.id,
            translation: mealTypeTranslation.translation,
            language: mealTypeTranslation.language,
            mealType: mealTypeTranslation.mealType,
        });
    }

    save() {
        this.isSaving = true;
        const mealTypeTranslation = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.mealTypeTranslationService.update(mealTypeTranslation));
        } else {
            this.subscribeToSaveResponse(this.mealTypeTranslationService.create(mealTypeTranslation));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<MealTypeTranslation>>) {
        result.subscribe((res: HttpResponse<MealTypeTranslation>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `MealTypeTranslation ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/meal-type-translation');
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

    private createFromForm(): MealTypeTranslation {
        return {
            ...new MealTypeTranslation(),
            id: this.form.get(['id']).value,
            translation: this.form.get(['translation']).value,
            language: this.form.get(['language']).value,
            mealType: this.form.get(['mealType']).value,
        };
    }

    compareMealType(first: MealType, second: MealType): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackMealTypeById(index: number, item: MealType) {
        return item.id;
    }
}
