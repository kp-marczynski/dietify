import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductPortion } from './product-portion.model';
import { ProductPortionService } from './product-portion.service';
import { RecipeSection, RecipeSectionService } from '../recipe-section';

@Component({
    selector: 'page-product-portion-update',
    templateUrl: 'product-portion-update.html'
})
export class ProductPortionUpdatePage implements OnInit {

    productPortion: ProductPortion;
    recipeSections: RecipeSection[];
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        amount: [null, [Validators.required]],
        productId: [null, [Validators.required]],
        householdMeasureId: [null, []],
        recipeSection: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private recipeSectionService: RecipeSectionService,
        private productPortionService: ProductPortionService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.recipeSectionService.query()
            .subscribe(data => { this.recipeSections = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.productPortion = response.data;
            this.isNew = this.productPortion.id === null || this.productPortion.id === undefined;
        });
    }

    updateForm(productPortion: ProductPortion) {
        this.form.patchValue({
            id: productPortion.id,
            amount: productPortion.amount,
            productId: productPortion.productId,
            householdMeasureId: productPortion.householdMeasureId,
            recipeSection: productPortion.recipeSection,
        });
    }

    save() {
        this.isSaving = true;
        const productPortion = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.productPortionService.update(productPortion));
        } else {
            this.subscribeToSaveResponse(this.productPortionService.create(productPortion));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ProductPortion>>) {
        result.subscribe((res: HttpResponse<ProductPortion>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `ProductPortion ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/product-portion');
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

    private createFromForm(): ProductPortion {
        return {
            ...new ProductPortion(),
            id: this.form.get(['id']).value,
            amount: this.form.get(['amount']).value,
            productId: this.form.get(['productId']).value,
            householdMeasureId: this.form.get(['householdMeasureId']).value,
            recipeSection: this.form.get(['recipeSection']).value,
        };
    }

    compareRecipeSection(first: RecipeSection, second: RecipeSection): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackRecipeSectionById(index: number, item: RecipeSection) {
        return item.id;
    }
}
