import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MealProduct } from './meal-product.model';
import { MealProductService } from './meal-product.service';
import { Meal, MealService } from '../meal';

@Component({
    selector: 'page-meal-product-update',
    templateUrl: 'meal-product-update.html'
})
export class MealProductUpdatePage implements OnInit {

    mealProduct: MealProduct;
    meals: Meal[];
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        productId: [null, [Validators.required]],
        householdMeasureId: [null, []],
        amount: [null, [Validators.required]],
        meal: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private mealService: MealService,
        private mealProductService: MealProductService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.mealService.query()
            .subscribe(data => { this.meals = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.mealProduct = response.data;
            this.isNew = this.mealProduct.id === null || this.mealProduct.id === undefined;
        });
    }

    updateForm(mealProduct: MealProduct) {
        this.form.patchValue({
            id: mealProduct.id,
            productId: mealProduct.productId,
            householdMeasureId: mealProduct.householdMeasureId,
            amount: mealProduct.amount,
            meal: mealProduct.meal,
        });
    }

    save() {
        this.isSaving = true;
        const mealProduct = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.mealProductService.update(mealProduct));
        } else {
            this.subscribeToSaveResponse(this.mealProductService.create(mealProduct));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<MealProduct>>) {
        result.subscribe((res: HttpResponse<MealProduct>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `MealProduct ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/meal-product');
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

    private createFromForm(): MealProduct {
        return {
            ...new MealProduct(),
            id: this.form.get(['id']).value,
            productId: this.form.get(['productId']).value,
            householdMeasureId: this.form.get(['householdMeasureId']).value,
            amount: this.form.get(['amount']).value,
            meal: this.form.get(['meal']).value,
        };
    }

    compareMeal(first: Meal, second: Meal): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackMealById(index: number, item: Meal) {
        return item.id;
    }
}
