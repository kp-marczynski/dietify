import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipeBasicNutritionData } from './recipe-basic-nutrition-data.model';
import { RecipeBasicNutritionDataService } from './recipe-basic-nutrition-data.service';

@Component({
    selector: 'page-recipe-basic-nutrition-data-update',
    templateUrl: 'recipe-basic-nutrition-data-update.html'
})
export class RecipeBasicNutritionDataUpdatePage implements OnInit {

    recipeBasicNutritionData: RecipeBasicNutritionData;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        energy: [null, [Validators.required]],
        protein: [null, [Validators.required]],
        fat: [null, [Validators.required]],
        carbohydrates: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private recipeBasicNutritionDataService: RecipeBasicNutritionDataService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.recipeBasicNutritionData = response.data;
            this.isNew = this.recipeBasicNutritionData.id === null || this.recipeBasicNutritionData.id === undefined;
        });
    }

    updateForm(recipeBasicNutritionData: RecipeBasicNutritionData) {
        this.form.patchValue({
            id: recipeBasicNutritionData.id,
            energy: recipeBasicNutritionData.energy,
            protein: recipeBasicNutritionData.protein,
            fat: recipeBasicNutritionData.fat,
            carbohydrates: recipeBasicNutritionData.carbohydrates,
        });
    }

    save() {
        this.isSaving = true;
        const recipeBasicNutritionData = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.recipeBasicNutritionDataService.update(recipeBasicNutritionData));
        } else {
            this.subscribeToSaveResponse(this.recipeBasicNutritionDataService.create(recipeBasicNutritionData));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<RecipeBasicNutritionData>>) {
        result.subscribe((res: HttpResponse<RecipeBasicNutritionData>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `RecipeBasicNutritionData ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/recipe-basic-nutrition-data');
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

    private createFromForm(): RecipeBasicNutritionData {
        return {
            ...new RecipeBasicNutritionData(),
            id: this.form.get(['id']).value,
            energy: this.form.get(['energy']).value,
            protein: this.form.get(['protein']).value,
            fat: this.form.get(['fat']).value,
            carbohydrates: this.form.get(['carbohydrates']).value,
        };
    }

}
