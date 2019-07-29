import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NutritionData } from './nutrition-data.model';
import { NutritionDataService } from './nutrition-data.service';
import { NutritionDefinition, NutritionDefinitionService } from '../nutrition-definition';
import { Product, ProductService } from '../product';

@Component({
    selector: 'page-nutrition-data-update',
    templateUrl: 'nutrition-data-update.html'
})
export class NutritionDataUpdatePage implements OnInit {

    nutritionData: NutritionData;
    nutritionDefinitions: NutritionDefinition[];
    products: Product[];
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        nutritionValue: [null, [Validators.required]],
        nutritionDefinition: [null, [Validators.required]],
        product: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private nutritionDefinitionService: NutritionDefinitionService,
        private productService: ProductService,
        private nutritionDataService: NutritionDataService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.nutritionDefinitionService.query()
            .subscribe(data => { this.nutritionDefinitions = data.body; }, (error) => this.onError(error));
        this.productService.query()
            .subscribe(data => { this.products = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.nutritionData = response.data;
            this.isNew = this.nutritionData.id === null || this.nutritionData.id === undefined;
        });
    }

    updateForm(nutritionData: NutritionData) {
        this.form.patchValue({
            id: nutritionData.id,
            nutritionValue: nutritionData.nutritionValue,
            nutritionDefinition: nutritionData.nutritionDefinition,
            product: nutritionData.product,
        });
    }

    save() {
        this.isSaving = true;
        const nutritionData = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.nutritionDataService.update(nutritionData));
        } else {
            this.subscribeToSaveResponse(this.nutritionDataService.create(nutritionData));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<NutritionData>>) {
        result.subscribe((res: HttpResponse<NutritionData>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `NutritionData ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/nutrition-data');
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

    private createFromForm(): NutritionData {
        return {
            ...new NutritionData(),
            id: this.form.get(['id']).value,
            nutritionValue: this.form.get(['nutritionValue']).value,
            nutritionDefinition: this.form.get(['nutritionDefinition']).value,
            product: this.form.get(['product']).value,
        };
    }

    compareNutritionDefinition(first: NutritionDefinition, second: NutritionDefinition): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackNutritionDefinitionById(index: number, item: NutritionDefinition) {
        return item.id;
    }
    compareProduct(first: Product, second: Product): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }
}
