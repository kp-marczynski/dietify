import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipeSuitableForDiet } from './recipe-suitable-for-diet.model';
import { RecipeSuitableForDietService } from './recipe-suitable-for-diet.service';
import { Recipe, RecipeService } from '../recipe';

@Component({
    selector: 'page-recipe-suitable-for-diet-update',
    templateUrl: 'recipe-suitable-for-diet-update.html'
})
export class RecipeSuitableForDietUpdatePage implements OnInit {

    recipeSuitableForDiet: RecipeSuitableForDiet;
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
        private recipeSuitableForDietService: RecipeSuitableForDietService
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
            this.recipeSuitableForDiet = response.data;
            this.isNew = this.recipeSuitableForDiet.id === null || this.recipeSuitableForDiet.id === undefined;
        });
    }

    updateForm(recipeSuitableForDiet: RecipeSuitableForDiet) {
        this.form.patchValue({
            id: recipeSuitableForDiet.id,
            dietTypeId: recipeSuitableForDiet.dietTypeId,
            recipe: recipeSuitableForDiet.recipe,
        });
    }

    save() {
        this.isSaving = true;
        const recipeSuitableForDiet = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.recipeSuitableForDietService.update(recipeSuitableForDiet));
        } else {
            this.subscribeToSaveResponse(this.recipeSuitableForDietService.create(recipeSuitableForDiet));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<RecipeSuitableForDiet>>) {
        result.subscribe((res: HttpResponse<RecipeSuitableForDiet>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `RecipeSuitableForDiet ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/recipe-suitable-for-diet');
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

    private createFromForm(): RecipeSuitableForDiet {
        return {
            ...new RecipeSuitableForDiet(),
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
