import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipeSection } from './recipe-section.model';
import { RecipeSectionService } from './recipe-section.service';
import { Recipe, RecipeService } from '../recipe';

@Component({
    selector: 'page-recipe-section-update',
    templateUrl: 'recipe-section-update.html'
})
export class RecipeSectionUpdatePage implements OnInit {

    recipeSection: RecipeSection;
    recipes: Recipe[];
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        sectionName: [null, []],
        recipe: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private recipeService: RecipeService,
        private recipeSectionService: RecipeSectionService
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
            this.recipeSection = response.data;
            this.isNew = this.recipeSection.id === null || this.recipeSection.id === undefined;
        });
    }

    updateForm(recipeSection: RecipeSection) {
        this.form.patchValue({
            id: recipeSection.id,
            sectionName: recipeSection.sectionName,
            recipe: recipeSection.recipe,
        });
    }

    save() {
        this.isSaving = true;
        const recipeSection = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.recipeSectionService.update(recipeSection));
        } else {
            this.subscribeToSaveResponse(this.recipeSectionService.create(recipeSection));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<RecipeSection>>) {
        result.subscribe((res: HttpResponse<RecipeSection>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `RecipeSection ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/recipe-section');
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

    private createFromForm(): RecipeSection {
        return {
            ...new RecipeSection(),
            id: this.form.get(['id']).value,
            sectionName: this.form.get(['sectionName']).value,
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
