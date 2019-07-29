import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipeUnsuitableForDiet } from './recipe-unsuitable-for-diet.model';
import { RecipeUnsuitableForDietService } from './recipe-unsuitable-for-diet.service';
import { Recipe, RecipeService } from '../recipe';

@Component({
    selector: 'page-recipe-unsuitable-for-diet-update',
    templateUrl: 'recipe-unsuitable-for-diet-update.html'
})
export class RecipeUnsuitableForDietUpdatePage implements OnInit {

    recipeUnsuitableForDiet: RecipeUnsuitableForDiet;
    recipes: Recipe[];
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        dietTypeId: [null, [Validators.required]],
        recipe: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private recipeService: RecipeService,
        private recipeUnsuitableForDietService: RecipeUnsuitableForDietService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.recipeService.query()
            .subscribe(data => { this.recipes = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.recipeUnsuitableForDiet = response.data;
            this.isNew = this.recipeUnsuitableForDiet.id === null || this.recipeUnsuitableForDiet.id === undefined;
        });
    }

    updateForm(recipeUnsuitableForDiet: RecipeUnsuitableForDiet) {
        this.form.patchValue({
            id: recipeUnsuitableForDiet.id,
            dietTypeId: recipeUnsuitableForDiet.dietTypeId,
            recipe: recipeUnsuitableForDiet.recipe,
        });
    }

    save() {
        this.isSaving = true;
        const recipeUnsuitableForDiet = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.recipeUnsuitableForDietService.update(recipeUnsuitableForDiet));
        } else {
            this.subscribeToSaveResponse(this.recipeUnsuitableForDietService.create(recipeUnsuitableForDiet));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<RecipeUnsuitableForDiet>>) {
        result.subscribe((res: HttpResponse<RecipeUnsuitableForDiet>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `RecipeUnsuitableForDiet ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/recipe-unsuitable-for-diet');
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

    private createFromForm(): RecipeUnsuitableForDiet {
        return {
            ...new RecipeUnsuitableForDiet(),
            id: this.form.get(['id']).value,
            dietTypeId: this.form.get(['dietTypeId']).value,
            recipe: this.form.get(['recipe']).value,
        };
    }

    compareRecipe(first: Recipe, second: Recipe): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackRecipeById(index: number, item: Recipe) {
        return item.id;
    }
}
