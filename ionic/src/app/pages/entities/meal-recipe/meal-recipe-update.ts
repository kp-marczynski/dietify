import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MealRecipe } from './meal-recipe.model';
import { MealRecipeService } from './meal-recipe.service';
import { Meal, MealService } from '../meal';

@Component({
    selector: 'page-meal-recipe-update',
    templateUrl: 'meal-recipe-update.html'
})
export class MealRecipeUpdatePage implements OnInit {

    mealRecipe: MealRecipe;
    meals: Meal[];
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        recipeId: [null, [Validators.required]],
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
        private mealRecipeService: MealRecipeService
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
            this.mealRecipe = response.data;
            this.isNew = this.mealRecipe.id === null || this.mealRecipe.id === undefined;
        });
    }

    updateForm(mealRecipe: MealRecipe) {
        this.form.patchValue({
            id: mealRecipe.id,
            recipeId: mealRecipe.recipeId,
            amount: mealRecipe.amount,
            meal: mealRecipe.meal,
        });
    }

    save() {
        this.isSaving = true;
        const mealRecipe = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.mealRecipeService.update(mealRecipe));
        } else {
            this.subscribeToSaveResponse(this.mealRecipeService.create(mealRecipe));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<MealRecipe>>) {
        result.subscribe((res: HttpResponse<MealRecipe>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `MealRecipe ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/meal-recipe');
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

    private createFromForm(): MealRecipe {
        return {
            ...new MealRecipe(),
            id: this.form.get(['id']).value,
            recipeId: this.form.get(['recipeId']).value,
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
