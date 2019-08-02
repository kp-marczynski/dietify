import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { MealRecipe } from './meal-recipe.model';
import { MealRecipeService } from './meal-recipe.service';

@Component({
    selector: 'page-meal-recipe',
    templateUrl: 'meal-recipe.html'
})
export class MealRecipePage {
    mealRecipes: MealRecipe[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private mealRecipeService: MealRecipeService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.mealRecipes = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.mealRecipeService.query().pipe(
            filter((res: HttpResponse<MealRecipe[]>) => res.ok),
            map((res: HttpResponse<MealRecipe[]>) => res.body)
        )
        .subscribe(
            (response: MealRecipe[]) => {
                this.mealRecipes = response;
                if (typeof(refresher) !== 'undefined') {
                    setTimeout(() => {
                        refresher.target.complete();
                    }, 750);
                }
            },
            async (error) => {
                console.error(error);
                const toast = await this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
                toast.present();
            });
    }

    trackId(index: number, item: MealRecipe) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/meal-recipe/new');
    }

    edit(item: IonItemSliding, mealRecipe: MealRecipe) {
        this.navController.navigateForward('/tabs/entities/meal-recipe/' + mealRecipe.id + '/edit');
        item.close();
    }

    async delete(mealRecipe) {
        this.mealRecipeService.delete(mealRecipe.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'MealRecipe deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(mealRecipe: MealRecipe) {
        this.navController.navigateForward('/tabs/entities/meal-recipe/' + mealRecipe.id + '/view');
    }
}
