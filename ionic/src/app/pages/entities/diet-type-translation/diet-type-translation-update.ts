import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DietTypeTranslation } from './diet-type-translation.model';
import { DietTypeTranslationService } from './diet-type-translation.service';
import { DietType, DietTypeService } from '../diet-type';

@Component({
    selector: 'page-diet-type-translation-update',
    templateUrl: 'diet-type-translation-update.html'
})
export class DietTypeTranslationUpdatePage implements OnInit {

    dietTypeTranslation: DietTypeTranslation;
    dietTypes: DietType[];
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        translation: [null, [Validators.required]],
        language: [null, [Validators.required]],
        dietType: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private dietTypeService: DietTypeService,
        private dietTypeTranslationService: DietTypeTranslationService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.dietTypeService.query()
            .subscribe(data => { this.dietTypes = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.dietTypeTranslation = response.data;
            this.isNew = this.dietTypeTranslation.id === null || this.dietTypeTranslation.id === undefined;
        });
    }

    updateForm(dietTypeTranslation: DietTypeTranslation) {
        this.form.patchValue({
            id: dietTypeTranslation.id,
            translation: dietTypeTranslation.translation,
            language: dietTypeTranslation.language,
            dietType: dietTypeTranslation.dietType,
        });
    }

    save() {
        this.isSaving = true;
        const dietTypeTranslation = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.dietTypeTranslationService.update(dietTypeTranslation));
        } else {
            this.subscribeToSaveResponse(this.dietTypeTranslationService.create(dietTypeTranslation));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<DietTypeTranslation>>) {
        result.subscribe((res: HttpResponse<DietTypeTranslation>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `DietTypeTranslation ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/diet-type-translation');
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

    private createFromForm(): DietTypeTranslation {
        return {
            ...new DietTypeTranslation(),
            id: this.form.get(['id']).value,
            translation: this.form.get(['translation']).value,
            language: this.form.get(['language']).value,
            dietType: this.form.get(['dietType']).value,
        };
    }

    compareDietType(first: DietType, second: DietType): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackDietTypeById(index: number, item: DietType) {
        return item.id;
    }
}
