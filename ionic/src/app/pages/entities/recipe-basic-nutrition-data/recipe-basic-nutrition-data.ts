import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { RecipeBasicNutritionData } from './recipe-basic-nutrition-data.model';
import { RecipeBasicNutritionDataService } from './recipe-basic-nutrition-data.service';

@Component({
    selector: 'page-recipe-basic-nutrition-data',
    templateUrl: 'recipe-basic-nutrition-data.html'
})
export class RecipeBasicNutritionDataPage {
    recipeBasicNutritionData: RecipeBasicNutritionData[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private recipeBasicNutritionDataService: RecipeBasicNutritionDataService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.recipeBasicNutritionData = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.recipeBasicNutritionDataService.query().pipe(
            filter((res: HttpResponse<RecipeBasicNutritionData[]>) => res.ok),
            map((res: HttpResponse<RecipeBasicNutritionData[]>) => res.body)
        )
        .subscribe(
            (response: RecipeBasicNutritionData[]) => {
                this.recipeBasicNutritionData = response;
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

    trackId(index: number, item: RecipeBasicNutritionData) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/recipe-basic-nutrition-data/new');
    }

    edit(item: IonItemSliding, recipeBasicNutritionData: RecipeBasicNutritionData) {
        this.navController.navigateForward('/tabs/entities/recipe-basic-nutrition-data/' + recipeBasicNutritionData.id + '/edit');
        item.close();
    }

    async delete(recipeBasicNutritionData) {
        this.recipeBasicNutritionDataService.delete(recipeBasicNutritionData.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'RecipeBasicNutritionData deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(recipeBasicNutritionData: RecipeBasicNutritionData) {
        this.navController.navigateForward('/tabs/entities/recipe-basic-nutrition-data/' + recipeBasicNutritionData.id + '/view');
    }
}
