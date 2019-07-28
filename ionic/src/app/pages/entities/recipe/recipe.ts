import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { JhiDataUtils } from 'ng-jhipster';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
    selector: 'page-recipe',
    templateUrl: 'recipe.html'
})
export class RecipePage {
    recipes: Recipe[];

    // todo: add pagination

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private recipeService: RecipeService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.recipes = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.recipeService.query().pipe(
            filter((res: HttpResponse<Recipe[]>) => res.ok),
            map((res: HttpResponse<Recipe[]>) => res.body)
        )
        .subscribe(
            (response: Recipe[]) => {
                this.recipes = response;
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

    trackId(index: number, item: Recipe) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    new() {
        this.navController.navigateForward('/tabs/entities/recipe/new');
    }

    edit(item: IonItemSliding, recipe: Recipe) {
        this.navController.navigateForward('/tabs/entities/recipe/' + recipe.id + '/edit');
        item.close();
    }

    async delete(recipe) {
        this.recipeService.delete(recipe.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'Recipe deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(recipe: Recipe) {
        this.navController.navigateForward('/tabs/entities/recipe/' + recipe.id + '/view');
    }
}
