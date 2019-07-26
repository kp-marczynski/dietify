import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { MealPlanSuitableForDiet } from './meal-plan-suitable-for-diet.model';
import { MealPlanSuitableForDietService } from './meal-plan-suitable-for-diet.service';

@Component({
    selector: 'page-meal-plan-suitable-for-diet',
    templateUrl: 'meal-plan-suitable-for-diet.html'
})
export class MealPlanSuitableForDietPage {
    mealPlanSuitableForDiets: MealPlanSuitableForDiet[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private mealPlanSuitableForDietService: MealPlanSuitableForDietService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.mealPlanSuitableForDiets = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.mealPlanSuitableForDietService.query().pipe(
            filter((res: HttpResponse<MealPlanSuitableForDiet[]>) => res.ok),
            map((res: HttpResponse<MealPlanSuitableForDiet[]>) => res.body)
        )
        .subscribe(
            (response: MealPlanSuitableForDiet[]) => {
                this.mealPlanSuitableForDiets = response;
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

    trackId(index: number, item: MealPlanSuitableForDiet) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/meal-plan-suitable-for-diet/new');
    }

    edit(item: IonItemSliding, mealPlanSuitableForDiet: MealPlanSuitableForDiet) {
        this.navController.navigateForward('/tabs/entities/meal-plan-suitable-for-diet/' + mealPlanSuitableForDiet.id + '/edit');
        item.close();
    }

    async delete(mealPlanSuitableForDiet) {
        this.mealPlanSuitableForDietService.delete(mealPlanSuitableForDiet.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'MealPlanSuitableForDiet deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(mealPlanSuitableForDiet: MealPlanSuitableForDiet) {
        this.navController.navigateForward('/tabs/entities/meal-plan-suitable-for-diet/' + mealPlanSuitableForDiet.id + '/view');
    }
}
