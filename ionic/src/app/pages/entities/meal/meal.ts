import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Meal } from './meal.model';
import { MealService } from './meal.service';

@Component({
    selector: 'page-meal',
    templateUrl: 'meal.html'
})
export class MealPage {
    meals: Meal[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private mealService: MealService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.meals = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.mealService.query().pipe(
            filter((res: HttpResponse<Meal[]>) => res.ok),
            map((res: HttpResponse<Meal[]>) => res.body)
        )
        .subscribe(
            (response: Meal[]) => {
                this.meals = response;
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

    trackId(index: number, item: Meal) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/meal/new');
    }

    edit(item: IonItemSliding, meal: Meal) {
        this.navController.navigateForward('/tabs/entities/meal/' + meal.id + '/edit');
        item.close();
    }

    async delete(meal) {
        this.mealService.delete(meal.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'Meal deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(meal: Meal) {
        this.navController.navigateForward('/tabs/entities/meal/' + meal.id + '/view');
    }
}
