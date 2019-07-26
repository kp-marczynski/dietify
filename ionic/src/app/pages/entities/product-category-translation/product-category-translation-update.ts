import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductCategoryTranslation } from './product-category-translation.model';
import { ProductCategoryTranslationService } from './product-category-translation.service';
import { ProductCategory, ProductCategoryService } from '../product-category';

@Component({
    selector: 'page-product-category-translation-update',
    templateUrl: 'product-category-translation-update.html'
})
export class ProductCategoryTranslationUpdatePage implements OnInit {

    productCategoryTranslation: ProductCategoryTranslation;
    productCategories: ProductCategory[];
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        translation: [null, [Validators.required]],
        language: [null, [Validators.required]],
        productCategory: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private productCategoryService: ProductCategoryService,
        private productCategoryTranslationService: ProductCategoryTranslationService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.productCategoryService.query()
            .subscribe(data => { this.productCategories = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.productCategoryTranslation = response.data;
            this.isNew = this.productCategoryTranslation.id === null || this.productCategoryTranslation.id === undefined;
        });
    }

    updateForm(productCategoryTranslation: ProductCategoryTranslation) {
        this.form.patchValue({
            id: productCategoryTranslation.id,
            translation: productCategoryTranslation.translation,
            language: productCategoryTranslation.language,
            productCategory: productCategoryTranslation.productCategory,
        });
    }

    save() {
        this.isSaving = true;
        const productCategoryTranslation = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.productCategoryTranslationService.update(productCategoryTranslation));
        } else {
            this.subscribeToSaveResponse(this.productCategoryTranslationService.create(productCategoryTranslation));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ProductCategoryTranslation>>) {
        result.subscribe((res: HttpResponse<ProductCategoryTranslation>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `ProductCategoryTranslation ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/product-category-translation');
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

    private createFromForm(): ProductCategoryTranslation {
        return {
            ...new ProductCategoryTranslation(),
            id: this.form.get(['id']).value,
            translation: this.form.get(['translation']).value,
            language: this.form.get(['language']).value,
            productCategory: this.form.get(['productCategory']).value,
        };
    }

    compareProductCategory(first: ProductCategory, second: ProductCategory): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackProductCategoryById(index: number, item: ProductCategory) {
        return item.id;
    }
}
