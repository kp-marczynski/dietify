import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductCategory } from './product-category.model';
import { ProductCategoryService } from './product-category.service';

@Component({
    selector: 'page-product-category-update',
    templateUrl: 'product-category-update.html'
})
export class ProductCategoryUpdatePage implements OnInit {

    productCategory: ProductCategory;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        description: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private productCategoryService: ProductCategoryService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.productCategory = response.data;
            this.isNew = this.productCategory.id === null || this.productCategory.id === undefined;
        });
    }

    updateForm(productCategory: ProductCategory) {
        this.form.patchValue({
            id: productCategory.id,
            description: productCategory.description,
        });
    }

    save() {
        this.isSaving = true;
        const productCategory = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.productCategoryService.update(productCategory));
        } else {
            this.subscribeToSaveResponse(this.productCategoryService.create(productCategory));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ProductCategory>>) {
        result.subscribe((res: HttpResponse<ProductCategory>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `ProductCategory ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/product-category');
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

    private createFromForm(): ProductCategory {
        return {
            ...new ProductCategory(),
            id: this.form.get(['id']).value,
            description: this.form.get(['description']).value,
        };
    }

}
