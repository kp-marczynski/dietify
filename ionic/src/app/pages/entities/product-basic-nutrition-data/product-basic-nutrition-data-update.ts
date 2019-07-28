import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductBasicNutritionData } from './product-basic-nutrition-data.model';
import { ProductBasicNutritionDataService } from './product-basic-nutrition-data.service';

@Component({
    selector: 'page-product-basic-nutrition-data-update',
    templateUrl: 'product-basic-nutrition-data-update.html'
})
export class ProductBasicNutritionDataUpdatePage implements OnInit {

    productBasicNutritionData: ProductBasicNutritionData;
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
        private productBasicNutritionDataService: ProductBasicNutritionDataService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.productBasicNutritionData = response.data;
            this.isNew = this.productBasicNutritionData.id === null || this.productBasicNutritionData.id === undefined;
        });
    }

    updateForm(productBasicNutritionData: ProductBasicNutritionData) {
        this.form.patchValue({
            id: productBasicNutritionData.id,
            energy: productBasicNutritionData.energy,
            protein: productBasicNutritionData.protein,
            fat: productBasicNutritionData.fat,
            carbohydrates: productBasicNutritionData.carbohydrates,
        });
    }

    save() {
        this.isSaving = true;
        const productBasicNutritionData = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.productBasicNutritionDataService.update(productBasicNutritionData));
        } else {
            this.subscribeToSaveResponse(this.productBasicNutritionDataService.create(productBasicNutritionData));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ProductBasicNutritionData>>) {
        result.subscribe((res: HttpResponse<ProductBasicNutritionData>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `ProductBasicNutritionData ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/product-basic-nutrition-data');
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

    private createFromForm(): ProductBasicNutritionData {
        return {
            ...new ProductBasicNutritionData(),
            id: this.form.get(['id']).value,
            energy: this.form.get(['energy']).value,
            protein: this.form.get(['protein']).value,
            fat: this.form.get(['fat']).value,
            carbohydrates: this.form.get(['carbohydrates']).value,
        };
    }

}
