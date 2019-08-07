import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DishTypeTranslation } from './dish-type-translation.model';
import { DishTypeTranslationService } from './dish-type-translation.service';
import { DishType, DishTypeService } from '../dish-type';

@Component({
    selector: 'page-dish-type-translation-update',
    templateUrl: 'dish-type-translation-update.html'
})
export class DishTypeTranslationUpdatePage implements OnInit {

    dishTypeTranslation: DishTypeTranslation;
    dishTypes: DishType[];
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        translation: [null, [Validators.required]],
        language: [null, [Validators.required]],
        dishType: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private dishTypeService: DishTypeService,
        private dishTypeTranslationService: DishTypeTranslationService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.dishTypeService.query()
            .subscribe(data => { this.dishTypes = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.dishTypeTranslation = response.data;
            this.isNew = this.dishTypeTranslation.id === null || this.dishTypeTranslation.id === undefined;
        });
    }

    updateForm(dishTypeTranslation: DishTypeTranslation) {
        this.form.patchValue({
            id: dishTypeTranslation.id,
            translation: dishTypeTranslation.translation,
            language: dishTypeTranslation.language,
            dishType: dishTypeTranslation.dishType,
        });
    }

    save() {
        this.isSaving = true;
        const dishTypeTranslation = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.dishTypeTranslationService.update(dishTypeTranslation));
        } else {
            this.subscribeToSaveResponse(this.dishTypeTranslationService.create(dishTypeTranslation));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<DishTypeTranslation>>) {
        result.subscribe((res: HttpResponse<DishTypeTranslation>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `DishTypeTranslation ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/dish-type-translation');
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

    private createFromForm(): DishTypeTranslation {
        return {
            ...new DishTypeTranslation(),
            id: this.form.get(['id']).value,
            translation: this.form.get(['translation']).value,
            language: this.form.get(['language']).value,
            dishType: this.form.get(['dishType']).value,
        };
    }

    compareDishType(first: DishType, second: DishType): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackDishTypeById(index: number, item: DishType) {
        return item.id;
    }
}
