import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { RecipeSuitableForDiet } from './recipe-suitable-for-diet.model';
import { RecipeSuitableForDietService } from './recipe-suitable-for-diet.service';

@Component({
    selector: 'page-recipe-suitable-for-diet',
    templateUrl: 'recipe-suitable-for-diet.html'
})
export class RecipeSuitableForDietPage {
    recipeSuitableForDiets: RecipeSuitableForDiet[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private recipeSuitableForDietService: RecipeSuitableForDietService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.recipeSuitableForDiets = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.recipeSuitableForDietService.query().pipe(
            filter((res: HttpResponse<RecipeSuitableForDiet[]>) => res.ok),
            map((res: HttpResponse<RecipeSuitableForDiet[]>) => res.body)
        )
        .subscribe(
            (response: RecipeSuitableForDiet[]) => {
                this.recipeSuitableForDiets = response;
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

    trackId(index: number, item: RecipeSuitableForDiet) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/recipe-suitable-for-diet/new');
    }

    edit(item: IonItemSliding, recipeSuitableForDiet: RecipeSuitableForDiet) {
        this.navController.navigateForward('/tabs/entities/recipe-suitable-for-diet/' + recipeSuitableForDiet.id + '/edit');
        item.close();
    }

    async delete(recipeSuitableForDiet) {
        this.recipeSuitableForDietService.delete(recipeSuitableForDiet.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'RecipeSuitableForDiet deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(recipeSuitableForDiet: RecipeSuitableForDiet) {
        this.navController.navigateForward('/tabs/entities/recipe-suitable-for-diet/' + recipeSuitableForDiet.id + '/view');
    }
}
