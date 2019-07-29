import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { RecipeUnsuitableForDiet } from './recipe-unsuitable-for-diet.model';
import { RecipeUnsuitableForDietService } from './recipe-unsuitable-for-diet.service';

@Component({
    selector: 'page-recipe-unsuitable-for-diet',
    templateUrl: 'recipe-unsuitable-for-diet.html'
})
export class RecipeUnsuitableForDietPage {
    recipeUnsuitableForDiets: RecipeUnsuitableForDiet[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private recipeUnsuitableForDietService: RecipeUnsuitableForDietService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.recipeUnsuitableForDiets = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.recipeUnsuitableForDietService.query().pipe(
            filter((res: HttpResponse<RecipeUnsuitableForDiet[]>) => res.ok),
            map((res: HttpResponse<RecipeUnsuitableForDiet[]>) => res.body)
        )
        .subscribe(
            (response: RecipeUnsuitableForDiet[]) => {
                this.recipeUnsuitableForDiets = response;
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

    trackId(index: number, item: RecipeUnsuitableForDiet) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/recipe-unsuitable-for-diet/new');
    }

    edit(item: IonItemSliding, recipeUnsuitableForDiet: RecipeUnsuitableForDiet) {
        this.navController.navigateForward('/tabs/entities/recipe-unsuitable-for-diet/' + recipeUnsuitableForDiet.id + '/edit');
        item.close();
    }

    async delete(recipeUnsuitableForDiet) {
        this.recipeUnsuitableForDietService.delete(recipeUnsuitableForDiet.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'RecipeUnsuitableForDiet deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(recipeUnsuitableForDiet: RecipeUnsuitableForDiet) {
        this.navController.navigateForward('/tabs/entities/recipe-unsuitable-for-diet/' + recipeUnsuitableForDiet.id + '/view');
    }
}
