import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { ProductService } from './product.service';
import { ProductBasicNutritionData, ProductBasicNutritionDataService } from '../product-basic-nutrition-data';
import { ProductSubcategory, ProductSubcategoryService } from '../product-subcategory';
import { DietType, DietTypeService } from '../diet-type';

@Component({
    selector: 'page-product-update',
    templateUrl: 'product-update.html'
})
export class ProductUpdatePage implements OnInit {

    product: Product;
    productBasicNutritionData: ProductBasicNutritionData[];
    productSubcategories: ProductSubcategory[];
    dietTypes: DietType[];
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        source: [null, []],
        authorId: [null, []],
        description: [null, [Validators.required]],
        isFinal: ['false', [Validators.required]],
        isVerified: ['false', [Validators.required]],
        language: [null, [Validators.required]],
        basicNutritionData: [null, [Validators.required]],
        subcategory: [null, [Validators.required]],
          suitableDiets: [null, []],
          unsuitableDiets: [null, []],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private productBasicNutritionDataService: ProductBasicNutritionDataService,
        private productSubcategoryService: ProductSubcategoryService,
        private dietTypeService: DietTypeService,
        private productService: ProductService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.productBasicNutritionDataService
            .query({filter: 'product-is-null'})
            .subscribe(data => {
                if (!this.product.basicNutritionData || !this.product.basicNutritionData.id) {
                    this.productBasicNutritionData = data;
                } else {
                    this.productBasicNutritionDataService
                        .find(this.product.basicNutritionData.id)
                        .subscribe((subData: ProductBasicNutritionData) => {
                            this.productBasicNutritionData = [subData].concat(subData);
                        }, (error) => this.onError(error));
                }
            }, (error) => this.onError(error));
        this.productSubcategoryService.query()
            .subscribe(data => { this.productSubcategories = data.body; }, (error) => this.onError(error));
        this.dietTypeService.query()
            .subscribe(data => { this.dietTypes = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.product = response.data;
            this.isNew = this.product.id === null || this.product.id === undefined;
        });
    }

    updateForm(product: Product) {
        this.form.patchValue({
            id: product.id,
            source: product.source,
            authorId: product.authorId,
            description: product.description,
            isFinal: product.isFinal,
            isVerified: product.isVerified,
            language: product.language,
            basicNutritionData: product.basicNutritionData,
            subcategory: product.subcategory,
            suitableDiets: product.suitableDiets,
            unsuitableDiets: product.unsuitableDiets,
        });
    }

    save() {
        this.isSaving = true;
        const product = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.productService.update(product));
        } else {
            this.subscribeToSaveResponse(this.productService.create(product));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<Product>>) {
        result.subscribe((res: HttpResponse<Product>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `Product ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/product');
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

    private createFromForm(): Product {
        return {
            ...new Product(),
            id: this.form.get(['id']).value,
            source: this.form.get(['source']).value,
            authorId: this.form.get(['authorId']).value,
            description: this.form.get(['description']).value,
            isFinal: this.form.get(['isFinal']).value,
            isVerified: this.form.get(['isVerified']).value,
            language: this.form.get(['language']).value,
            basicNutritionData: this.form.get(['basicNutritionData']).value,
            subcategory: this.form.get(['subcategory']).value,
            suitableDiets: this.form.get(['suitableDiets']).value,
            unsuitableDiets: this.form.get(['unsuitableDiets']).value,
        };
    }

    compareProductBasicNutritionData(first: ProductBasicNutritionData, second: ProductBasicNutritionData): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackProductBasicNutritionDataById(index: number, item: ProductBasicNutritionData) {
        return item.id;
    }
    compareProductSubcategory(first: ProductSubcategory, second: ProductSubcategory): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackProductSubcategoryById(index: number, item: ProductSubcategory) {
        return item.id;
    }
    compareDietType(first: DietType, second: DietType): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackDietTypeById(index: number, item: DietType) {
        return item.id;
    }
}
