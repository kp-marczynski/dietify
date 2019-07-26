import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductSubcategory } from './product-subcategory.model';
import { ProductSubcategoryService } from './product-subcategory.service';
import { ProductCategory, ProductCategoryService } from '../product-category';

@Component({
    selector: 'page-product-subcategory-update',
    templateUrl: 'product-subcategory-update.html'
})
export class ProductSubcategoryUpdatePage implements OnInit {

    productSubcategory: ProductSubcategory;
    productCategories: ProductCategory[];
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        description: [null, [Validators.required]],
        category: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private productCategoryService: ProductCategoryService,
        private productSubcategoryService: ProductSubcategoryService
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
            this.productSubcategory = response.data;
            this.isNew = this.productSubcategory.id === null || this.productSubcategory.id === undefined;
        });
    }

    updateForm(productSubcategory: ProductSubcategory) {
        this.form.patchValue({
            id: productSubcategory.id,
            description: productSubcategory.description,
            category: productSubcategory.category,
        });
    }

    save() {
        this.isSaving = true;
        const productSubcategory = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.productSubcategoryService.update(productSubcategory));
        } else {
            this.subscribeToSaveResponse(this.productSubcategoryService.create(productSubcategory));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ProductSubcategory>>) {
        result.subscribe((res: HttpResponse<ProductSubcategory>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `ProductSubcategory ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/product-subcategory');
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

    private createFromForm(): ProductSubcategory {
        return {
            ...new ProductSubcategory(),
            id: this.form.get(['id']).value,
            description: this.form.get(['description']).value,
            category: this.form.get(['category']).value,
        };
    }

    compareProductCategory(first: ProductCategory, second: ProductCategory): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackProductCategoryById(index: number, item: ProductCategory) {
        return item.id;
    }
}
